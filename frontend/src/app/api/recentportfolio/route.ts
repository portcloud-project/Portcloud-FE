import axios from 'axios';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const response = await axios.get(`${BASE_URL}api/portfolios/all`);
        console.log(response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
