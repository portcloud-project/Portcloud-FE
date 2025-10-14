import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // const url = new URL('/api/user/register', BASE_URL);
        const response = await axios.post(`${BASE_URL}api/user/register`, body);
        // const { data, status } = await axios.post(url.toString(), body, {});
        console.log(response);
        return NextResponse.json(response.data);
    } catch (err: unknown) {
        console.log(err);
    }
}
