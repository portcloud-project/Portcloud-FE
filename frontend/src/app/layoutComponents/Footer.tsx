'use client';
import Image from 'next/image';
import logo from '../imgs/logoImage_v2.png';

import { useState } from 'react';
import UseRule from '../customComponents/useRule';
import PrivateAccept from '../customComponents/PrivateAccept';
const Footer = () => {
    const [useRule, setUseRule] = useState(false);
    const [privateRule, setPrivateRule] = useState(false);
    return (
        <footer className="w-full h-[230px] flex justify-center items-center z-40 border-t border-[var(--color-gray-300)] bg-gray-50 ">
            <div className="w-[1440px] h-full flex flex-col justify-center items-start gap-[15px]">
                <Image src={logo} alt="logo" width={130} />
                <div className="flex flex-col gap-[6px]">
                    <div className="flex gap-[8px]">
                        <p className="text-gray-900 text-[14px] font-semibold">contact</p>
                        <p> portcloud.team@gmail.com</p>
                    </div>
                    <p>Copyright PortCloud. All right reserved</p>
                </div>
                <div className="flex gap-[24px]">
                    <p className="cursor-pointer" onClick={() => setUseRule(true)}>
                        이용약관
                    </p>
                    {useRule && <UseRule setUseRuleModal={setUseRule} />}
                    <p className="cursor-pointer" onClick={() => setPrivateRule(true)}>
                        개인정보처리방침
                    </p>
                    {privateRule && <PrivateAccept setPrivateModal={setPrivateRule} />}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
