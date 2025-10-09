import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = req.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        const { data } = await axios.post(`${BASE_URL}api/user/send-delete-verification`, body , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(
            { message: data.message, status: data.status },
            { status: data.status },
        );
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
