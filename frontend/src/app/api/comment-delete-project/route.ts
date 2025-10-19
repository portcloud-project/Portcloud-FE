import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function DELETE(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = request.cookies.get('accessToken')?.value;
    const id = request.nextUrl.searchParams.get('id');
    const parentCommentId = request.nextUrl.searchParams.get('parentCommentId');
    try {
        const response = await axios.delete(
            `${BASE_URL}api/project/${id}/comments/${parentCommentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}
