import app from '../server';

export default function handler(req: any, res: any) {
  // Vercel rewrites requests starting with /api/ to /api/index.
  // This changes req.url to /api/index, which prevents Express routing from working.
  // We restore the original URL from Vercel's headers so Express can route it correctly.
  const originalUrl = req.headers['x-original-url'] || 
                      req.headers['x-vercel-matched-path'] || 
                      req.headers['x-matched-path'] || 
                      req.url;
  
  if (originalUrl) {
    req.url = originalUrl;
  }
  
  return app(req, res);
}
