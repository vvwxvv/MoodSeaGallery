import {NextResponse} from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { imageApiConfig } from '@/app/api/_config/image_api_config';

const uri = process.env.MONGODB_URL || '';
const dbName = process.env.MONGODB_DB || '';
const collectionName = imageApiConfig.collectionName;

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

// POST /api/image/reorder
export async function POST(request) {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const body = await request.json();
    // Support both new and old payloads for compatibility
    const { reorderedImages, orderedIds } = body;

    if (Array.isArray(reorderedImages) && reorderedImages.length > 0) {
      // New: update each image's order field as provided
      await Promise.all(
        reorderedImages.map(img =>
          collection.updateOne(
            { _id: new ObjectId(img._id) },
            { $set: { order: img.order } }
          )
        )
      );
      return NextResponse.json({ success: true }, { status: 200 });
    } else if (Array.isArray(orderedIds) && orderedIds.length > 0) {
      // Old: update order by index in array
      await Promise.all(
        orderedIds.map((id, idx) =>
          collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { order: idx } }
          )
        )
      );
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'reorderedImages or orderedIds must be a non-empty array' }, { status: 400 });
    }
  } catch (error) {
    console.error('Reorder Error:', error);
    return NextResponse.json({ message: 'Failed to reorder images', error: error.message }, { status: 500 });
  }
}

// GET /api/image/reorder
export async function GET() {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    // Fetch all images sorted by 'order' (ascending)
    const images = await collection.find().sort({ order: 1 }).toArray();
    // Remove all timestamp fields from each image in the response
    const cleanedImages = images.map(item => {
      const { createdAt, updatedAt, ...rest } = item;
      Object.keys(rest).forEach(key => {
        if (key.toLowerCase().includes('timestamp')) {
          delete rest[key];
        }
      });
      return rest;
    });
    return NextResponse.json(cleanedImages, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch images for reorder:', error);
    return NextResponse.json({ message: 'Failed to fetch images', error: error.message }, { status: 500 });
  }
}
