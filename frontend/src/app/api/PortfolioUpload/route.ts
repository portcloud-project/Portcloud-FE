import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }
        const body = await request.json();
        if (!body) {
            return NextResponse.json({ error: 'Empty body' }, { status: 400 });
        }

        const response = await axios.post(`${BASE_URL}api/portfolio`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response.data.data);
        return NextResponse.json(response.data.data, { status: 200 });
    } catch (err) {
        console.error('API 요청 중 오류:', err);

        return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }
}
