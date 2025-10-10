import axios from 'axios';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

    try {
        const { data } = await axios.get(`${BASE_URL}api/teamposts`);
        return NextResponse.json(data);
    } catch (error) {
        console.error('api 호출중 오류', error);
        return NextResponse.json({ message: 'internal error' }, { status: 500 });
    }
}
