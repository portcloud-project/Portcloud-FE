import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
    try {
        // Next.js 에서 들어온 여청을 formData로 파싱
        const form = await req.formData();
        const token = req.cookies.get('accessToken')?.value;

    const url = `${BASE_URL?.endsWith('/') ? BASE_URL : BASE_URL + '/'}api/project`;

        // axios로 넘길 새 formData를 생성 (Node 환경에서는 form-data 패키지가 필요할 수 있음)
        const upstream = await fetch(url, { method: 'POST', body: form,  headers: { Authorization: `Bearer ${token}` } }, );
        
    const data = await upstream.json();

    return NextResponse.json(data, { status: upstream.status });
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
