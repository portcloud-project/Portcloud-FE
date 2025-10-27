'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
    const sp = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const code = sp.get('code');
        const error = sp.get('error');
        // const provider = (sp.get('provider') ?? 'google').toLowerCase();

        if (error) {
            router.replace(`/login?error=${encodeURIComponent(error)}`);
            return;
        }
        if (!code) {
            router.replace('/login');
            return;
        }

        // 브라우저 → Next API 콜백 프록시 → (302) 백엔드 콜백
        const url = new URL(`/api/auth/google/callback`, window.location.origin);
        url.searchParams.set('code', code);
        url.searchParams.set('redirect', `${window.location.origin}/auth/callback/done`);
        window.location.replace(url.toString());
    }, [sp, router]);

    return <p className="p-6">구글 로그인 처리 중입니다…</p>;
}
