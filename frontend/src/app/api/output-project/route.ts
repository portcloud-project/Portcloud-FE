import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const res = await axios.get(`${BASE_URL}api/projects/{id}`);
        const data = res.data;

        return NextResponse.json(data, { status: data.status });
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
