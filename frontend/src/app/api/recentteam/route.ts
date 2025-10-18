import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
    const page = request.nextUrl.searchParams.get('page') ?? '0';
    const size = request.nextUrl.searchParams.get('size') ?? '12';

    try {
        const { data } = await axios.get(`${BASE_URL}api/teamposts`, { params: { page, size } });

        // 외부 응답이 { data: { data: { content, page, last, ... }}} 라면:
        const pageObj = data?.data?.data ?? data?.data ?? data;

        // 프론트가 쓰는 필드만 "항상 같은 키"로 내려줌
        const normalized = {
            page: Number(pageObj.page ?? 0),
            size: Number(pageObj.size ?? Number(size)),
            last: Boolean(pageObj.last ?? false),
            totalPages: Number(pageObj.totalPages ?? 0),
            totalElements: Number(pageObj.totalElements ?? 0),
            content: Array.isArray(pageObj.content) ? pageObj.content : [],
        };

        return NextResponse.json(normalized, { status: 200 });
    } catch (error) {
        console.error('api 호출중 오류', error);
        // **반드시 응답 반환** (throw 금지)
        return NextResponse.json({ error: '최근 팀 조회 실패' }, { status: 500 });
    }
}
