import React, { Suspense } from 'react';
import Searchbar from '../customComponents/Searbar';
import UploadBtn from '../customComponents/UploadBtn';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full mx-auto max-w-[1440px] flex gap-[48px] flex-col">
            <div className="w-full flex gap-[12px] px-[48px]">
                <Suspense fallback={null}>
                    <Searchbar />
                </Suspense>
                <UploadBtn />
            </div>
            <Suspense fallback={null}>{children}</Suspense>
        </main>
    );
}
