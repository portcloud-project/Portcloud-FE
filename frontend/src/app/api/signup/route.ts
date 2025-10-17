import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function normalizeBaseUrl(url?: string) {
    if (!url) return '/';
    return url.endsWith('/') ? url : url + '/';
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('[signup body]', body);

    try {
        const res = await axios.post(
            `${normalizeBaseUrl(BASE_URL)}api/user/register`,
            body,
            { timeout: 10000 }
        );
        console.log('[register:OK]', res.status, res.data);
        // ✅ HTTP status는 upstream HTTP코드 사용
        return NextResponse.json(res.data, { status: res.status });
    } catch (err) {
        console.error('[register:ERR]', err);
        if (axios.isAxiosError(err)) {
            const status = err.response?.status ?? 500;
            const payload = err.response?.data ?? { message: err.message };
            return NextResponse.json(payload, { status });
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
