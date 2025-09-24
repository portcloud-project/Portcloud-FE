import axios from 'axios';
import { NextResponse } from 'next/server';


export async function GET() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const res = await axios.get(`${BASE_URL}api/portfolio/recommend`);
        const data = res.data;

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('api 호출중 오류', error);
        throw error;
    }
}
