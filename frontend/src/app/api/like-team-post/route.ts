import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const id = request.nextUrl.searchParams.get('id');

        const response = await axios.post(
            `${BASE_URL}api/teampost/${id}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
