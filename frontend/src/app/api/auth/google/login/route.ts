import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET(_req: NextRequest, { params }: { params: { provider: string } }) {
    const provider = (params.provider ?? 'google').toLowerCase();

    // 백엔드에 "인증 URL 생성" 요청
    const res = await fetch(`${BACKEND}/api/user/oauth/${provider}/url`, { method: 'GET' });
    if (!res.ok) {
        const text = await res.text();
        return new NextResponse(text || 'OAuth URL 요청 실패', { status: res.status });
    }

    const { url } = await res.json();
    return NextResponse.redirect(url, { status: 302 });
}
