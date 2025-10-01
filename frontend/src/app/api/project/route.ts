import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const token = req.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        const formData = await req.formData();

        const raw = String(formData.get('distribution') ?? '').trim().toLowerCase();
        const isTrue =
            raw === 'true' || raw === '1' || raw === 'y' || raw === 'yes' || raw === '배포 중';
        formData.set('distribution', isTrue ? 'true' : 'false');
        formData.set('title', String(formData.get('title')));

        const res = await axios.post(`${BASE_URL}api/project`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (err) {
        console.error('백엔드 요청 중 오류:', err);
        return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }
}
