import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function GET(req: NextRequest, { params }: { params: { provider: string } }) {
    const provider = (params.provider ?? 'google').toLowerCase();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const redirect = searchParams.get('redirect') || `${FRONTEND}/auth/callback/done`;

    if (error) {
        return NextResponse.redirect(`${FRONTEND}/login?error=${encodeURIComponent(error)}`, { status: 302 });
    }
    if (!code) {
        return NextResponse.redirect(`${FRONTEND}/login`, { status: 302 });
    }

    // 브라우저를 "백엔드 콜백"으로 이동시켜 쿠키를 심게 함
    const be = new URL(`api/user/oauth/${provider}/callback`, BASE_URL);
    be.searchParams.set('code', code);
    be.searchParams.set('redirect', redirect);

    return NextResponse.redirect(be.toString(), { status: 302 });
}
