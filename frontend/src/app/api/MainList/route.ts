import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    try {
        const type = request.nextUrl.searchParams.get('type');
        if (type === 'MainList') {
            const res = await axios.get(`${BASE_URL}api/projects/recommend`);
            const data = res.data;
            return NextResponse.json(data, { status: 200 });
        }
        if (type === 'TeamList') {
            const res = await axios.get(`${BASE_URL}`);
            const data = res.data;
            return NextResponse.json(data, { status: 200 });
        }
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
