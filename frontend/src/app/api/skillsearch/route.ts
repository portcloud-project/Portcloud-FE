import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const response = await axios.get(`${BASE_URL}api/skills`);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('API 프록시 중 오류 발생:', error);
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: error.response?.data?.message || 'Error proxying request',
                    details: error.message,
                },
                { status: error.response?.status || 500 },
            );
        } else {
            return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}
