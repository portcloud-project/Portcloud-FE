// app/api/auth/[provider]/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function GET(req: NextRequest, ctx: { params: { provider?: string } }) {
    try {
        const provider = (ctx?.params?.provider ?? 'google').toLowerCase();
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const redirect = searchParams.get('redirect') || `${FRONTEND}/auth/callback/done`;

        if (!BASE_URL || !FRONTEND) {
            return new NextResponse('ENV 미설정(NEXT_PUBLIC_BACKEND_URL / FRONTEND_URL)', { status: 500 });
        }
        if (error) {
            return NextResponse.redirect(`${FRONTEND}/login?error=${encodeURIComponent(error)}`, { status: 302 });
        }
        if (!code) {
            return NextResponse.redirect(`${FRONTEND}/login`, { status: 302 });
        }

        const be = new URL(`/api/user/oauth/${provider}/callback`, BASE_URL);
        be.searchParams.set('code', code);
        be.searchParams.set('redirect', redirect);

        return NextResponse.redirect(be.toString(), { status: 302 });
    } catch (e) {
        console.error(e);
        return new NextResponse('OAuth callback proxy error', { status: 500, });
    }
}
