import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = request.cookies.get('accessToken')?.value;
    const id = request.nextUrl.searchParams.get('id');
    try {
        const body = await request.json();
        const response = await axios.post(`${BASE_URL}api/teampost/${id}/comments`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
    }
}
