import { NextResponse } from 'next/server';

export async function GET() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    // 슬래시 안전하게
    const fetchUrl = new URL('/api/user/oauth/google/url', BASE_URL).toString();

    const res = await fetch(fetchUrl, { cache: 'no-store' });
    if (!res.ok) {
        return new NextResponse('Google OAuth 시작 중 오류 발생', { status: 500 });
    }
    const json = await res.json();
    const googleUrl: string = json?.data;

    // 서버에서 바로 리다이렉트
    return NextResponse.redirect(googleUrl, { status: 302 });
}
