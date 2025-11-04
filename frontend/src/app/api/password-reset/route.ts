import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const body = await request.json();
    console.log('바디데이ㅓㅌ', body);
    try {
        const res = await axios.post(`${BASE_URL}api/user/reset-password`, body);

        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
