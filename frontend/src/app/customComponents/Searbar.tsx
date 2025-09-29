'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { SearchType } from '../works/portfolios/page';

const Searchbar = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [searchType, setSearchType] = useState<SearchType>('title');
    const search = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const q = search.get('q') || '';
        setInputValue(q);
        const typeFromUrl = search.get('type');
        if (typeFromUrl === 'title' || typeFromUrl === 'nickname') {
            setSearchType(typeFromUrl);
        } else {
            setSearchType('title');
        }
    }, [search]);

    const onClickSearch = () => {
        const trimmed = inputValue.trim();
        const currentPath = window.location.pathname;
        const query = trimmed ? `?q=${encodeURIComponent(trimmed)}&type=${searchType}` : '';
        router.push(`${currentPath}${query}`);
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
        <div className="w-full flex items-center gap-2 relative">
            <input
                type="text"
                className="flex-1 h-[48px] rounded-[100px] bg-gray-100 border border-gray-300 py-[12px] pl-[16px] focus:outline-none text-[16px] pr-[50px] font-semibold"
                onChange={onChangeInputValue}
                value={inputValue}
                onKeyDown={onKeyDown}
            />
            <div className="flex gap-2 absolute right-[50px] top-[50%] -translate-y-1/2">
                <button
                    className={`px-3 py-1 rounded-full cursor-pointer ${
                        searchType === 'title' ? 'bg-white text-black border' : 'bg-none'
                    }`}
                    onClick={() => setSearchType('title')}
                >
                    제목
                </button>
                <button
                    className={`px-3 py-1 rounded-full cursor-pointer ${
                        searchType === 'nickname' ? 'bg-white text-black border' : 'bg-none'
                    }`}
                    onClick={() => setSearchType('nickname')}
                >
                    작성자
                </button>
            </div>

            <FiSearch
                size={24}
                className="absolute right-[16px] top-[50%] -translate-y-1/2 cursor-pointer"
                color="#6B7280"
                onClick={onClickSearch}
            />
        </div>
    );
};

export default Searchbar;
