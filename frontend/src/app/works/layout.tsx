import React from 'react';
import Searchbar from '../customComponents/Searbar';
import UploadBtn from '../customComponents/UploadBtn';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full mx-auto max-w-[1440px] flex gap-[48px] flex-col">
            <div className="w-full flex gap-[12px]">
                <Searchbar />
                <UploadBtn />
            </div>
            {children}
        </main>
    );
}
