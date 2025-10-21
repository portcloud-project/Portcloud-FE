import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const id = request.nextUrl.searchParams.get('id');
    const token = request.cookies.get('accessToken')?.value;
    try {
        const response = await axios.delete(
            `${BASE_URL}api/teampost/${id}/bookmark`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
