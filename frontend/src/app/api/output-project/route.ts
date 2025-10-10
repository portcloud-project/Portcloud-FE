import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const token = request.cookies.get('accessToken')?.value;
        const id = request.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'id 파라미터가 필요합니다.' },
                {
                    status: 400,
                },
            );
        }

        const res = await axios.get(`${BASE_URL}api/project`, {
            params: { id },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = res.data.data;
        console.log(data);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
