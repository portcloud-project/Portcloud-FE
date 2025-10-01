import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function PATCH(req: NextRequest) {
    try {
        const token = req.cookies.get('accessToken')?.value;
        const body = await req.json();

        const { data } = await axios.patch(`${BASE_URL}api/user/profile`, body, {
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
