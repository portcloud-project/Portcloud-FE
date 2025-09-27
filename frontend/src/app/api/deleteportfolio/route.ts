import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function DELETE(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = request.cookies.get('accessToken')?.value;

    const id = request.nextUrl.searchParams.get('id');
    try {
        const response = await axios.delete(`${BASE_URL}api/portfolio`, {
            params: { id },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
