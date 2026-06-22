type RequestLike = {
  url?: string
  nextUrl?: URL
}

export function getRequestUrl(req: RequestLike): URL {
  if (req.nextUrl instanceof URL) {
    return req.nextUrl
  }

  if (typeof req.url === 'string' && req.url.length > 0) {
    return new URL(req.url, 'http://localhost')
  }

  throw new Error('Request URL is unavailable.')
}
