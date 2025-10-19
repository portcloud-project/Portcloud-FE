import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('[signup body]', body);

    try {
        const body = await req.json();

        const response = await axios.post(`${BASE_URL}api/user/register`, body);
        return NextResponse.json(response.data);
    } catch (err: unknown) {
        console.error(err);
    }
}
