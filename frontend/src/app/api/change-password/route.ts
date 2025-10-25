import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function PATCH(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = request.cookies.get('accessToken')?.value;
    const body = await request.json();
    try {
        const response = await axios.patch(`${BASE_URL}api/user/change-password`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
