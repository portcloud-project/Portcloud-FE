import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { data } = await axios.post(`${BASE_URL}api/user/login`, body);
        console.log(data);
        const response = NextResponse.json(data, { status: 200 });
        const token = data.token;
        response.cookies.set('accessToken', token, {
            httpOnly: false,
            maxAge: 60 * 60 * 24,
            path: '/',
            sameSite: 'lax',
        });
        return response;
    } catch (err) {
        console.error(err);

        let message = 'An unknown error occurred.';

        if (axios.isAxiosError(err)) {
            message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
            message = err.message;
        }

        return NextResponse.json({ success: false, message: message }, { status: 500 });
    }
}
