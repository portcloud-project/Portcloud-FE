'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

interface SKILLITEM {
    id: string;
    name: string;
    category: string;
}

const SearchSkill = () => {
    const [inputValue, setInputValue] = useState<string>('');
    // 선택된 스킬 최종적으로 서버로 POST 할 데이터
    const [selectedSkill, setSelectedSkill] = useState<SKILLITEM[]>([]);
    // 드롭다운의 토글 여부
    const [toggleDropdown, setToggleDropdown] = useState(false);
    // 디바운싱 된 값
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    // 외부 클릭 감지를 위한 Ref
    const ref = useRef<HTMLDivElement>(null);

    const fetchSearchResult = async (result: string) => {
        const response = await axios.get(`/api/SkillSearch?q=${result}`);
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            throw new Error('API 응답 형식이 올바르지 않습니다.');
        }
    };

    // 디바운싱 로직
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(inputValue);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    const {
        data: searchResult,
        isLoading,
        isError,
        error,
    } = useQuery<SKILLITEM[], Error>({
        queryKey: ['searchResult', debouncedSearchTerm],
        queryFn: () => fetchSearchResult(debouncedSearchTerm),
        enabled: debouncedSearchTerm.trim().length > 0,
        staleTime: 1000 * 60,
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setToggleDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value.trim().length > 0) {
            setToggleDropdown(true);
        } else {
            setToggleDropdown(false);
        }
    };

    const handleSkillClick = (skill: SKILLITEM) => {
        if (!selectedSkill.some((s) => s.id === skill.id)) {
            setSelectedSkill((prev) => [...prev, skill]);
        }
        setInputValue('');
        setToggleDropdown(false); // 드롭다운 닫기
        setDebouncedSearchTerm(''); // 선택했으니 검색 쿼리 상태 초기화 (필요시)
    };

    // 선택된 스킬 제거 핸들러
    const handleRemoveSkill = (skillToRemove: SKILLITEM) => {
        setSelectedSkill((prev) => prev.filter((s) => s.id !== skillToRemove.id));
    };
    return (
        <div className="relative w-full flex gap-[16px] flex-col" ref={ref}>
            <input
                type="text"
                value={inputValue}
                className="w-full border border-gray-300 py-[12px] rounded-[8px] px-[16px]"
                onChange={handleInputChange}
                placeholder="활용될 스킬을 입력해 주세요"
                onFocus={() => {
                    if (
                        inputValue.trim().length > 0 ||
                        (searchResult && searchResult.length > 0) ||
                        isLoading
                    ) {
                        setToggleDropdown(true);
                    }
                }}
            />
            <div className=" flex flex-wrap gap-2 p-2">
                {selectedSkill.length > 0 ? (
                    selectedSkill.map((skill) => (
                        <span
                            key={skill.id}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-m font-medium cursor-pointer"
                        >
                            {skill.name}
                            <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-2 -mr-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-purple-200 text-purple-600 hover:bg-purple-300 cursor-pointer"
                            >
                                <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm"></p>
                )}
            </div>
            {toggleDropdown && (
                <ul
                    id="skill-search-results"
                    role="listbox"
                    className="w-full border border-gray-300 rounded-[16px] p-[16px] flex gap-[20px] justify-center flex-wrap"
                >
                    {isLoading && <li className="">검색 중...</li>}
                    {isError && <li>오류: {error?.message}</li>}
                    {searchResult && searchResult.length > 0 && !isLoading
                        ? searchResult.map((skill) => (
                              <li
                                  key={skill.id}
                                  onClick={() => handleSkillClick(skill)}
                                  className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-m font-medium cursor-pointer"
                              >
                                  {skill.name}
                              </li>
                          ))
                        : !isLoading &&
                          debouncedSearchTerm.trim().length > 0 && <li>검색 결과가 없습니다</li>}
                </ul>
            )}
        </div>
    );
};

export default SearchSkill;
