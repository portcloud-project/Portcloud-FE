// app/api/allproject/route.ts (가정)
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || '';

        // 1) BASE_URL 검증
        if (!BASE_URL || !/^https?:\/\//.test(BASE_URL)) {
            return NextResponse.json({ error: 'BASE_URL is missing or invalid' }, { status: 500 });
        }

        // 2) 토큰 읽기
        const token = cookies().get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        // 3) URL 안전하게 조립
        const url = new URL('/api/mypage/project', BASE_URL).toString();

        // 4) 업스트림 호출 (캐시 금지)
        const upstream = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
        });

        console.log(upstream);

        // 5) 업스트림 상태코드 보존 + 본문 전달
        const text = await upstream.text();
        if (!upstream.ok) {
            // 문제 분석용으로 본문 일부 보여주기
            return NextResponse.json(
                {
                    error: 'Upstream request failed',
                    status: upstream.status,
                    body: text.slice(0, 500), // 과도한 로그 방지
                },
                { status: upstream.status },
            );
        }

        // 6) 정상 JSON 응답
        // 업스트림이 JSON이 아니라면 try/catch로 JSON 파싱 실패 대비 가능
        const data = text ? JSON.parse(text) : null;
        return NextResponse.json(data ?? {});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // 7) 절대 throw 하지 말고 종결
        return NextResponse.json(
            {
                error: 'Route handler crashed',
                message: err?.message ?? String(err),
            },
            { status: 500 },
        );
    }
}
