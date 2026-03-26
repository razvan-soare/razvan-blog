import { NextRequest, NextResponse } from 'next/server';

let cachedSessionCookie: string | null = null;

async function loginToPaperclip(
  apiUrl: string,
  publicUrl: string,
): Promise<string | null> {
  const email = process.env.PAPERCLIP_EMAIL;
  const password = process.env.PAPERCLIP_PASSWORD;

  if (!email || !password) {
    console.error(
      'PAPERCLIP_EMAIL and PAPERCLIP_PASSWORD are required for authentication',
    );
    return null;
  }

  const publicHost = new URL(publicUrl).host;
  const response = await fetch(`${apiUrl}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Host: publicHost,
      Origin: publicUrl,
      Referer: publicUrl,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    console.error('Paperclip login failed:', response.status, await response.text());
    return null;
  }

  console.log('Paperclip login success, status:', response.status);
  const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
  console.log('Set-Cookie headers received:', setCookieHeaders.length, setCookieHeaders);
  const cookies = setCookieHeaders.map((c) => c.split(';')[0]).join('; ');

  if (cookies) {
    cachedSessionCookie = cookies;
  }

  return cachedSessionCookie;
}

async function createIssue(
  apiUrl: string,
  publicUrl: string,
  companyId: string,
  issueBody: Record<string, unknown>,
  cookie: string | null,
) {
  const publicHost = new URL(publicUrl).host;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Host: publicHost,
    Origin: publicUrl,
    Referer: publicUrl,
  };

  if (cookie) {
    headers['Cookie'] = cookie;
  }

  return fetch(`${apiUrl}/api/companies/${companyId}/issues`, {
    method: 'POST',
    headers,
    body: JSON.stringify(issueBody),
  });
}

export async function POST(request: NextRequest) {
  const apiUrl = process.env.PAPERCLIP_API_URL;
  const publicUrl = process.env.PAPERCLIP_PUBLIC_URL || apiUrl;
  const companyId = process.env.PAPERCLIP_COMPANY_ID;
  const projectId = process.env.PAPERCLIP_PROJECT_ID;
  if (!apiUrl || !companyId || !projectId) {
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
    projectId,
    status: 'backlog',
    priority: 'medium',
  };

  // Try with cached session
  let response = await createIssue(
    apiUrl,
    publicUrl!,
    companyId,
    issueBody,
    cachedSessionCookie,
  );

  console.log('Create issue attempt response:', response.status);
  // If unauthorized, login and retry
  if (response.status === 401 || response.status === 403) {
    const cookie = await loginToPaperclip(apiUrl, publicUrl!);
    if (!cookie) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Paperclip' },
        { status: 502 },
      );
    }
    response = await createIssue(apiUrl, publicUrl!, companyId, issueBody, cookie);
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Paperclip API error:', errorText);
    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 502 },
    );
  }

  const issue = await response.json();

  return NextResponse.json({
    success: true,
    identifier: issue.identifier,
  });
}
