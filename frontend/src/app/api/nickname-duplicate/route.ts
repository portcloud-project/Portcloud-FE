import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nickname = searchParams.get('nickname');
    const token = request.cookies.get('accessToken')?.value;
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get(`${BASE_URL}api/user/duplicate/nickname/${nickname}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return NextResponse.json(response.data.message);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
