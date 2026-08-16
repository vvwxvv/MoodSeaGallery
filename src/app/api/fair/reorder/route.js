import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { fairApiConfig } from '@/app/api/_config/fair_api_config';

const uri = process.env.MONGODB_URL || '';
const dbName = process.env.MONGODB_DB || '';
const collectionName = fairApiConfig.collectionName;

let cachedClient = null;
let cachedDb = null;

async function connectDB() {
  if (cachedDb) return cachedDb;
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  cachedDb = cachedClient.db(dbName);
  return cachedDb;
}

export async function POST(request) {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const { orderedIds } = await request.json();
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ error: 'orderedIds must be a non-empty array' }, { status: 400 });
    }

    // Update each fair's order field as string (matches Prisma Fair model)
    await Promise.all(
      orderedIds.map((id, idx) =>
        collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { order: String(idx + 1) } }
        )
      )
    );

    return NextResponse.json({ success: true, updated: orderedIds.length }, { status: 200 });
  } catch (error) {
    console.error('Error updating fair order:', error, error?.message || '');
    return NextResponse.json({ error: 'Failed to update fair order.', details: error?.message || error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    // Fetch all fairs sorted by 'order' (ascending, as string)
    const fairs = await collection.find().sort({ order: 1 }).toArray();
    return NextResponse.json(fairs, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch fairs for reorder:', error);
    return NextResponse.json({ message: 'Failed to fetch fairs', error: error.message }, { status: 500 });
  }
}