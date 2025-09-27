import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        const formData = await request.formData();

        const response = await axios.post(`${BASE_URL}api/portfolio`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (err) {
        console.error('백엔드 요청 중 오류:', err);
        return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }
}
