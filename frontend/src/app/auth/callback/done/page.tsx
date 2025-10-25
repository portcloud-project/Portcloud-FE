// app/auth/callback/done/page.tsx
'use client';

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AxiosError } from 'axios';
import { userStore } from '@/app/stores/userStore';
import axios from 'axios';

export default function AuthDone() {
    const router = useRouter();
    const setUser = userStore((s) => s.setUser);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                // Next API 프록시 → 백엔드 /api/me (쿠키로 세션 확인)
                // withCredentials는 api 인스턴스에서 기본 적용됨
                const res = await axios.get('/api/auth/me');

                // 응답 스키마 방어적 파싱: { user: {...} } or {...} 둘 다 대응
                const payload = res.data;
                const me = payload?.user ?? payload;

                if (!me || typeof me !== 'object') {
                    throw new Error('유효한 사용자 정보가 없습니다.');
                }

                // ✅ 전역 상태 업데이트
                setUser(me);

                // ✅ 원하는 경로로 이동 (필요하면 쿼리/리다이렉트 대상 읽어 처리)
                router.replace('/');
            } catch (e: unknown) {
                let message = '로그인 확인 중 오류';

                // AxiosError 처리
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const ax = e as AxiosError<any>;
                if (ax?.response) {
                    // 서버에서 보낸 에러 메시지 사용(가능하면)
                    const serverMsg =
                        (typeof ax.response.data === 'string'
                            ? ax.response.data
                            : ax.response.data?.message) || '';
                    message = serverMsg || `세션 확인 실패 (${ax.response.status})`;
                } else if (e instanceof Error && e.message) {
                    message = e.message;
                } else if (typeof e === 'string' && e) {
                    message = e;
                }

                if (!mounted) return;
                setErr(message);

                // 실패 시 로그인 페이지로 돌려보내고 싶으면 아래 주석 해제
                // router.replace(`/login?error=${encodeURIComponent(message)}`);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [router, setUser]);

    if (err) return <p className="p-6 text-red-600">{err}</p>;
    return <p className="p-6">로그인이 완료되었습니다. 이동 중…</p>;
}
