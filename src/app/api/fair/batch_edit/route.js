import { PrismaClient } from '@prisma/client';
import { getCurrentFormattedDate } from '@/utils/dateFormatter';
import { fairApiConfig } from '@/app/api/_config/fair_api_config';
import { createBatchApiHandler } from '@/app/api/_lib/batch_api_shell';

const prisma = new PrismaClient();

// Override handlers to remove cache
const noCacheResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
};

// Configuration
const CONF = {
  collectionName: fairApiConfig.collectionName || '',
  requiredFields: fairApiConfig.requiredFields || [],
  uniqueFields: fairApiConfig.uniqueFields || [],
  validFields: fairApiConfig.validFields || [],
  arrayFields: fairApiConfig.arrayFields || [],
  enableSoftDelete: false,
  beforeBatchUpdate: null,
  afterBatchUpdate: null,
  customValidation: null,
  transformResponse: null,
  ...fairApiConfig
};

const { GET: shellGET, PUT: shellPUT } = createBatchApiHandler(fairApiConfig);

export async function PUT(request) {
  const response = await shellPUT(request);
  const data = await response.json();
  return noCacheResponse(data, response.status);
}

export async function GET() {
  const response = await shellGET();
  const data = await response.json();
  return noCacheResponse(data, response.status);
}