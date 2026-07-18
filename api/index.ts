import app from '../server';

export default function handler(req: any, res: any) {
  try {
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
  } catch (err: any) {
    console.error("[Vercel API Handler Exception]:", err);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Vercel API Handler Exception",
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

