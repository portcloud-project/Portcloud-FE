import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function GET(request: NextRequest) {
    try {
        const response = await axios.get(`${BASE_URL}api/portfolio/${request}`);
        const data = response.data.data;

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error('api 호출중 오류', err);
        throw err;
    }
}
