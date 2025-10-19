// src/app/api/comment-post-projects/route.ts
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // 서버전용이면 NEXT_PUBLIC 제거 권장(아래 팁 참고)
    const token = request.cookies.get('accessToken')?.value ?? '';
    const id = request.nextUrl.searchParams.get('id');

    // 1) 입력 검증(빠르게 400을 주기)
    if (!id) {
        return NextResponse.json(
            { message: 'Missing required query param: id' },
            { status: 400 }
        );
    }

    let body: unknown;
    try {
        // 2) JSON 파싱 실패도 400으로 명확히
        body = await request.json();
    } catch {
        return NextResponse.json(
            { message: 'Invalid JSON body' },
            { status: 400 }
        );
    }

    try {
        // 3) 백엔드 호출
        // BASE_URL 끝에 슬래시 유무에 상관없이 안전하게 합치기
        const base = BASE_URL?.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL ?? '';
        const url = `${base}/api/project/${encodeURIComponent(id)}/comments`;

        const response = await axios.post(url, body, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            // 필요 시 timeout 등 추가
        });

        // 4) 성공 시 반드시 반환
        return NextResponse.json(response.data, { status: response.status || 200 });
    } catch (err) {
        // 5) 실패 시에도 항상 반환 (백엔드 status/메시지 전달)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const axErr = err as AxiosError<any>;
        const status = axErr.response?.status ?? 500;

        // 백엔드 에러 페이로드를 최대한 보존해서 프론트가 분기하기 쉽게
        const payload =
            axErr.response?.data ??
            { message: axErr.message || 'Upstream request failed' };

        // 서버 로그는 자세히 남기고
        console.error('[comment-post-projects] error:', {
            status,
            url: axErr.config?.url,
            method: axErr.config?.method,
            data: axErr.config?.data,
            respData: axErr.response?.data,
        });

        return NextResponse.json(payload, { status });
    }
}
