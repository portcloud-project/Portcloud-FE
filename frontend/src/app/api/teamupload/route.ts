import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        const body = await request.json();

        // const payload = {
        //     title: body.title,
        //     content: body.content,
        //     recruitRoles: body.recruitRoles ?? body.recruitRoles,
        //     projectType: body.projectType ?? body.position,
        //     recruitDeadline: body.recruitDeadline ?? body.endDate,
        //     contactMethod: body.contactMethod ?? body.contact,
        //     saveStatus: body.saveStatus,
        //     skills: (body.skills ?? body.skill ?? [])
        //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //         .filter((s: any) => s?.name?.trim())
        //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //         .map((s: any) => s.name.trim()),
        // };

        const response = await axios.post(`${BASE_URL}api/teampost`, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (err) {
        console.error('백엔드 요청 중 오류:', err);
        return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }
}
