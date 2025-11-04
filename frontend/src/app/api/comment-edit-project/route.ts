import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const body = await request.json();
        const comment = body.comment;
        const commentId = body.commentId;
        const id = body.id;
        console.log(comment);
        const response = await axios.patch(`${BASE_URL}api/project/${id}/comments/${commentId}`, {
            comment,
            commentId,
        });
        return NextResponse.json(response.data);
    } catch (err) {
        console.log(err.response?.data);
        if (axios.isAxiosError(err)) {
            return NextResponse.json(
                { error: err.response?.data?.message || '서버 에러' },
                { status: err.response?.status || 500 },
            );
        } else {
            return NextResponse.json(
                { error: err instanceof Error ? err.message : '알 수 없는 에러' },
                { status: 500 },
            );
        }
    }
}
