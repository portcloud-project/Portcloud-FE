import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get('q');

        if (USE_MOCK_DATA) {
            const mockData = {
                message: `성공적으로 목 데이터를 받았습니다! 검색어: ${query || '없음'}`,
                data: [
                    { id: 1, name: 'React' },
                    { id: 2, name: 'Next.js' },
                    { id: 3, name: 'JavaScript' },
                    { id: 4, name: 'Typescript' },
                    { id: 5, name: 'Node.js' },
                    { id: 6, name: 'tanstackQuery' },
                    { id: 7, name: 'Java' },
                    { id: 8, name: 'Figma' },
                    { id: 9, name: 'Notion' },
                ],
            };
            return NextResponse.json(mockData, { status: 200 });
        }

        const backendResponse = await axios.get(`${BASE_URL}/api?q=${query}`);
        const responseData = backendResponse.data;

        return NextResponse.json(responseData, { status: backendResponse.status });
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
