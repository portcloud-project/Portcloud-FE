import React, { Suspense } from 'react';

const UploadLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full flex justify-center items-center ">
            <div className="w-[768px] flex flex-col justify-start items-start gap-[48px]">
                <Suspense fallback={null}>{children}</Suspense>
            </div>
        </main>
    );
};

export default UploadLayout;
