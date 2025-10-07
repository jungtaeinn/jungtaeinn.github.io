import { getSortedPostsData } from '@/lib/posts';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const posts = getSortedPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
