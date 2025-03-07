import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: {
    params:Promise<{path: string[]}>
}) {
  try {
    const pathSegments =  (await params)?.path || []; 
    const decodedPath = pathSegments.join('/');
    const targetUrl = new URL(`https://${decodedPath}`);

    if (!isValidUrl(targetUrl)) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(targetUrl.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    });

    clearTimeout(timeout);

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      return location
        ? NextResponse.redirect(new URL(location, targetUrl))
        : NextResponse.json({ error: 'Invalid redirect' }, { status: 500 });
    }

    const body = await response.arrayBuffer();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600'
      }
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Proxy failed' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400'
    }
  });
}

function isValidUrl(url: URL) {
  return url.protocol === 'https:' &&
         !!url.hostname &&
         !url.hostname.includes('localhost') &&
         !url.hostname.includes('127.0.0.1');
}
