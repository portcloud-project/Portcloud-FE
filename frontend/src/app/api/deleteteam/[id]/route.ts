import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = request.cookies.get('accessToken')?.value;
    const id = params.id;
    if (!id) return NextResponse.json({ message: 'id required' }, { status: 400 });

    try {
        const upstream = await axios.delete(`${BASE_URL}api/teampost/${encodeURIComponent(id)}`, {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus: () => true,
        });
        // 업스트림 상태코드 그대로 전달(throw 금지 → JSON 유지)
        return NextResponse.json(upstream.data ?? null, {
            status: upstream.status || 200,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        const status = e?.response?.status ?? 500;
        const data = e?.response?.data ?? { message: 'proxy delete failed' };
        return NextResponse.json(data, { status });
    }
}
