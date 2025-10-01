import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const page = request.nextUrl.searchParams.get('page') || '0';
    const size = request.nextUrl.searchParams.get('size') || '12';
    try {
        const response = await axios.get(`${BASE_URL}api/projects`, {
            params: { page, size },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
