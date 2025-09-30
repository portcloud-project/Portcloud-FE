import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const token = request.cookies.get('accessToken')?.value;

        const id = request.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'id 파라미터가 필요합니다.' }, { status: 400 });
        }

        const response = await axios.get(`${BASE_URL}api/portfolio`, {
            params: { id },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.data.certificates);
        const data = response.data.data;
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error('api 호출중 오류', err);
        return NextResponse.json({ error: '프록시 서버 오류' });
    }
}
