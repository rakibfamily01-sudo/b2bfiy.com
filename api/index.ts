import app from '../server';

export default function handler(req: any, res: any) {
  // Try to extract original path from rewrite query parameter '_url'
  let originalUrl = '';
  
  if (req.url) {
    const urlParts = req.url.split('?');
    const queryPart = urlParts[1] || '';
    
    if (queryPart.includes('_url=')) {
      const params = new URLSearchParams(queryPart);
      const urlParam = params.get('_url');
      if (urlParam) {
        params.delete('_url');
        const remainingQuery = params.toString();
        originalUrl = urlParam + (remainingQuery ? '?' + remainingQuery : '');
      }
    }
  }
  
  // If we didn't find it via query param, try headers
  if (!originalUrl) {
    originalUrl = req.headers['x-forwarded-url'] || 
                  req.headers['x-original-url'] || 
                  req.headers['x-matched-path'] || 
                  req.url;
  }
  
  // Only override if the result is valid and not /api/index
  if (originalUrl && originalUrl !== '/api/index') {
    req.url = originalUrl;
  }
  
  return app(req, res);
}
