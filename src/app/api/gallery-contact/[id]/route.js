import { createApiIdHandler } from '@/app/api/_lib/api_id_shell';
import { galleryContactApiConfig } from '@/app/api/_config/gallery_contact_api_config';

// Create handlers using the factory with about configuration
const handlers = createApiIdHandler(galleryContactApiConfig);

// Export the generated handlers
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
