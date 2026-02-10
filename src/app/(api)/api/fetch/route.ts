import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const url = request.nextUrl.searchParams.get('url') as never;
  const res = await fetch(url, { cache: 'force-cache' });
  return new NextResponse(await res.blob());
};
