/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type AnyObj = Record<string, any>;

function normalizeToArray(payload: any): { data: any[]; sourceKey: string | null } {
    // 1) 응답이 바로 배열인 경우
    if (Array.isArray(payload)) return { data: payload, sourceKey: '__root__' };

    // 2) 흔한 키들 우선 시도
    const candidates = ['data', 'items', 'results', 'list', 'rows'];
    for (const key of candidates) {
        const v = (payload as AnyObj)?.[key];
        if (Array.isArray(v)) return { data: v, sourceKey: key };
    }

    // 3) 객체 값들 중 첫 번째 배열 찾아보기
    if (payload && typeof payload === 'object') {
        for (const [k, v] of Object.entries(payload)) {
            if (Array.isArray(v)) return { data: v, sourceKey: k };
        }
    }

    // 4) 못 찾으면 빈 배열 반환 (프론트 깨지지 않도록)
    return { data: [], sourceKey: null };
}

export async function GET(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

    if (!BASE_URL) {
        return NextResponse.json({ error: '서버 설정 오류: BASE_URL 누락' }, { status: 500 });
    }

    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        // 슬래시 안전하게 합치기
        const upstreamUrl = new URL('api/teamposts/all', BASE_URL).toString();

        const upstream = await axios.get(upstreamUrl, {
            headers: { Authorization: `Bearer ${token}` },
            // 타임아웃 방어
            timeout: 15000,
            validateStatus: () => true, // 상태코드에 따라 throw 안 하도록
        });

        // 업스트림이 실패 상태코드면 그대로 전달 (디버깅에 도움)
        if (upstream.status < 200 || upstream.status >= 300) {
            return NextResponse.json(
                {
                    error: '업스트림 요청 실패',
                    status: upstream.status,
                    detail: upstream.data,
                },
                { status: 502 },
            );
        }

        const raw = upstream.data;
        const { data, sourceKey } = normalizeToArray(raw);

        return NextResponse.json({
            data, // ✅ 항상 배열
            meta: { sourceKey }, // 어디서 뽑았는지 추적용(선택)
        });
    } catch (err: any) {
        // 네트워크/타임아웃 등
        return NextResponse.json(
            {
                error: '서버 오류',
                detail: err?.message ?? 'unknown',
            },
            { status: 500 },
        );
    }
}
