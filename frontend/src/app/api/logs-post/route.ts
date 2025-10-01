import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = request.cookies.get('accessToken')?.value;
    const formData = await request.formData();
    console.log(formData);
    try {
        const response = await axios.post(
            `${BASE_URL}api/blogs`,
            formData,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
