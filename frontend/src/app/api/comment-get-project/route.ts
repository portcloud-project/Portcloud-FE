import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const id = request.nextUrl.searchParams.get('id');
    try {
        const token = request.cookies.get('accessToken')?.value;
        const response = await axios.get(`${BASE_URL}api/project/${id}/comment`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
    }
}
