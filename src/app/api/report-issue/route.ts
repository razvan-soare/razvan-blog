import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiUrl = process.env.PAPERCLIP_API_URL;
  const apiKey = process.env.PAPERCLIP_API_KEY;
  const companyId = process.env.PAPERCLIP_COMPANY_ID;
  const projectId = process.env.PAPERCLIP_PROJECT_ID;
  const assigneeAgentId = process.env.PAPERCLIP_ASSIGNEE_AGENT_ID;

  if (!apiUrl || !companyId || !projectId) {
    return NextResponse.json(
      { error: 'Paperclip integration not configured' },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { title, description, images } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: 'Title and description are required' },
      { status: 400 }
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

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${apiUrl}/api/companies/${companyId}/issues`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title,
      description: issueDescription,
      projectId,
      status: assigneeAgentId ? 'todo' : 'backlog',
      priority: 'medium',
      ...(assigneeAgentId && { assigneeAgentId }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Paperclip API error:', errorText);
    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 502 }
    );
  }

  const issue = await response.json();

  return NextResponse.json({
    success: true,
    identifier: issue.identifier,
  });
}
