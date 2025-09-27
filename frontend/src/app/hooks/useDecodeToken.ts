export function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
                .join(''),
        );
        console.log(jsonPayload);
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('JWT 디코딩 실패:', e);
        return null;
    }
}
