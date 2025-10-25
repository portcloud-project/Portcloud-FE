// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const cookie = req.headers.get('cookie') ?? '';
    const res = await fetch(`${BASE_URL}api/logout`, {
        method: 'POST',
        headers: { cookie },
        cache: 'no-store',
    });
    if (!res.ok) return new NextResponse(await res.text(), { status: res.status });
    return NextResponse.json({ ok: true });
}
