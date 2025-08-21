'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
const Searchbar = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const search = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const q = search.get('q') || '';
        setInputValue(q);
    }, [search]);

    const onClickSearch = () => {
        const trimmed = inputValue.trim();
        const currentPath = window.location.pathname;

        if (trimmed === '') {
            router.push(currentPath);
        } else {
            router.push(`${currentPath}?q=${encodeURIComponent(trimmed)}`);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickSearch();
        }
    };

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="w-full flex relative">
            <input
                type="text"
                className="w-full h-[48px] rounded-[100px] bg-gray-100 border border-gray-300 py-[12px] pl-[16px] focus:outline-none text-[16px] pr-[50px] font-semibold    "
                onChange={onChangeInputValue}
                value={inputValue}
                onKeyDown={onKeyDown}
            />
            <FiSearch
                size={24}
                className="absolute right-[16px] top-[50%] translate-y-[-50%] cursor-pointer"
                color="#6B7280"
                onClick={onClickSearch}
            />
        </div>
    );
};

export default Searchbar;
