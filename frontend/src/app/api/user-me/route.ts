import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = request.cookies.get('accessToken')?.value;
        const { data } = await axios.get(`${BASE_URL}api/user/token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return NextResponse.json(data, { status: data.status });
    } catch (err: unknown) {
        console.error(err);

        // 에러 안전하게 사용하기 위해 타입 가드를 활용
        let message = 'An unknown error occurred.';

        if (axios.isAxiosError(err)) {
            // Axios 에러인 경우
            message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
            // 기본 JavaScript Error인 경우
            message = err.message;
        }

        return NextResponse.json({ success: false, message: message }, { status: 500 });
    }
}
