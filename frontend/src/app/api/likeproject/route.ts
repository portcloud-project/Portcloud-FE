import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const id = request.nextUrl.searchParams.get('id');
        const response = await axios.get(`${BASE_URL}api/project/${id}/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
    }
}
