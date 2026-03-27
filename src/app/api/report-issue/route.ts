import { NextRequest, NextResponse } from 'next/server';
import http from 'node:http';

let cachedSessionCookie: string | null = null;

function paperclipRequest(
  method: string,
  path: string,
  internalUrl: string,
  publicHost: string,
  body?: string,
  cookie?: string | null,
): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: string }> {
  const url = new URL(internalUrl);

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          Host: publicHost,
          Origin: `https://${publicHost}`,
          Referer: `https://${publicHost}/`,
          ...(cookie ? { Cookie: cookie } : {}),
          ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {}),
        },
        timeout: 10000,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () =>
          resolve({ status: res.statusCode ?? 500, headers: res.headers, body: data }),
        );
      },
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (body) req.write(body);
    req.end();
  });
}

async function loginToPaperclip(
  internalUrl: string,
  publicHost: string,
): Promise<string | null> {
  const email = process.env.PAPERCLIP_EMAIL;
  const password = process.env.PAPERCLIP_PASSWORD;

  if (!email || !password) {
    console.error(
      'PAPERCLIP_EMAIL and PAPERCLIP_PASSWORD are required for authentication',
    );
    return null;
  }

  const res = await paperclipRequest(
    'POST',
    '/api/auth/sign-in/email',
    internalUrl,
    publicHost,
    JSON.stringify({ email, password }),
  );

  if (res.status !== 200) {
    console.error('Paperclip login failed:', res.status, res.body);
    return null;
  }

  const setCookieHeaders = Array.isArray(res.headers['set-cookie'])
    ? res.headers['set-cookie']
    : res.headers['set-cookie']
      ? [res.headers['set-cookie']]
      : [];

  const cookies = setCookieHeaders.map((c) => c.split(';')[0]).join('; ');

  if (cookies) {
    cachedSessionCookie = cookies;
  }

  return cachedSessionCookie;
}

async function createIssue(
  internalUrl: string,
  publicHost: string,
  companyId: string,
  issueBody: Record<string, unknown>,
  cookie: string | null,
) {
  return paperclipRequest(
    'POST',
    `/api/companies/${companyId}/issues`,
    internalUrl,
    publicHost,
    JSON.stringify(issueBody),
    cookie,
  );
}

export async function POST(request: NextRequest) {
  const internalUrl = process.env.PAPERCLIP_API_URL;
  const publicHost = process.env.PAPERCLIP_PUBLIC_HOST;
  const companyId = process.env.PAPERCLIP_COMPANY_ID;

  if (!internalUrl || !publicHost || !companyId) {
    return NextResponse.json(
      { error: 'Paperclip integration not configured' },
      { status: 503 },
    );
  }

  const reportPassword = process.env.REPORT_PASSWORD;
  const body = await request.json();
  const { title, description, images, password } = body;

  if (reportPassword && password !== reportPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  if (!title || !description) {
    return NextResponse.json(
      { error: 'Title and description are required' },
      { status: 400 },
    );
  }

  const currentPage = body.page || 'Unknown page';

  let issueDescription = `**Reported from:** ${currentPage}\n\n${description}`;

  if (Array.isArray(images) && images.length > 0) {
    issueDescription += '\n\n**Screenshots:**\n';
    images.forEach((img: string, i: number) => {
      issueDescription += `\n![Screenshot ${i + 1}](${img})\n`;
    });
  }

  const issueBody = {
    title,
    description: issueDescription,
    status: 'backlog',
    priority: 'medium',
  };

  // Try with cached session
  let res = await createIssue(internalUrl, publicHost, companyId, issueBody, cachedSessionCookie);

  // If unauthorized, login and retry
  if (res.status === 401 || res.status === 403) {
    const cookie = await loginToPaperclip(internalUrl, publicHost);
    if (!cookie) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Paperclip' },
        { status: 502 },
      );
    }
    res = await createIssue(internalUrl, publicHost, companyId, issueBody, cookie);
  }

  if (res.status < 200 || res.status >= 300) {
    console.error('Paperclip API error:', res.body);
    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 502 },
    );
  }

  const issue = JSON.parse(res.body);

  return NextResponse.json({
    success: true,
    identifier: issue.identifier,
  });
}
