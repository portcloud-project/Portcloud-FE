import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function GET(req: NextRequest, { params }: { params: { provider: string } }) {
    const provider = (params.provider ?? 'google').toLowerCase();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const redirect = searchParams.get('redirect') || `${FRONTEND}/auth/callback/done`;
    const error = searchParams.get('error');

    if (error)
        return NextResponse.redirect(`${FRONTEND}/login?error=${encodeURIComponent(error)}`, {
            status: 302,
        });
    if (!code) return NextResponse.redirect(`${FRONTEND}/login`, { status: 302 });

    const be = new URL(`${BASE_URL}api/user/oauth/${provider}/callback`);
    be.searchParams.set('code', code);
    be.searchParams.set('redirect', redirect);

    return NextResponse.redirect(be.toString(), { status: 302 });
}
