import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(requset: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = requset.cookies.get('accessToken')?.value;
    try {
        const res = await axios.get(`${BASE_URL}api/mypage/bookmark`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
