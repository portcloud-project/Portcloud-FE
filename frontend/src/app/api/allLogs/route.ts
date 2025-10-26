import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }
        const response = await axios.get(`${BASE_URL}api/mypage/blogs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return NextResponse.json(error.message);
        }
        throw error;
    }
}
