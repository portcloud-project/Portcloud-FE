'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';

interface SKILLITEM {
    id: string;
    name: string;
    category: string;
}

const SearchSkill = ({ width }: { width?: string }) => {
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
        const response = await axios.get(`/api/skillsearch?q=${result}`);
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

    // 선택된 스킬 제거 핸들러
    const handleRemoveSkill = (skillToRemove: SKILLITEM) => {
        setSelectedSkill((prev) => prev.filter((s) => s.id !== skillToRemove.id));
    };

    const handleSkillSelectionChange = (skillToHandle: SKILLITEM, isChecked: boolean) => {
        if (isChecked) {
            setSelectedSkill((prevSkills) => [...prevSkills, skillToHandle]);
        } else {
            setSelectedSkill((prevSkills) => prevSkills.filter((s) => s.id !== skillToHandle.id));
        }
    };

    return (
        <div
            className={`relative gap-[12px] flex flex-col justify-center items-start w-full ${width}`}
            ref={ref}
        >
            {/* 스킬 라벨 section */}
            <label htmlFor="skill" className="font-bold text-[24px] text-[var(--color-gray-900)]">
                스킬
            </label>

            {/* 스킬 검색창 section */}
            <div className="relative w-full">
                <input
                    type="text"
                    value={inputValue}
                    className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] p-[20px] pl-[40px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out upload-placeholder`}
                    onChange={handleInputChange}
                    placeholder="활용된 스킬을 입력해 주세요"
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
                <span className="w-[24px] h-[24px] flex justify-center items-center absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaMagnifyingGlass className="w-[16.8px] h-[16.8px] text-[var(--color-gray-500)]" />
                </span>
            </div>

            <div className="absolute top-[124px] left-0 border border-[var(--color-gray-300)] bg-white p-[24px] flex flex-col gap-[16px] rounded-[8px]">
                {/* 선택된 스킬 section */}
                {selectedSkill.length > 0 ? (
                    selectedSkill.map((skill) => (
                        <div
                            key={skill.id}
                            className="flex flex-row gap-[4px] items-center px-[16px] py-[6px] rounded-full bg-gray-100 text-gray-700 text-[14px] font-semibold border border-gray-200"
                        >
                            {skill.name}
                            <IoCloseOutline
                                onClick={() => handleRemoveSkill(skill)}
                                className="w-[16px] h-[16px] cursor-pointer"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm"></p>
                )}

                <hr className="w-full h-1" />
                {/* 선택될 스킬 section */}
                {toggleDropdown &&
                    (isLoading || (searchResult && searchResult.length > 0) || isError) && (
                        <ul
                            id="skill-search-results"
                            role="listbox"
                            className="w-full rounded-[16px] p-[16px] flex gap-[20px] justify-center flex-wrap"
                        >
                            {isLoading ? (
                                <li className="">검색 중...</li>
                            ) : searchResult && searchResult.length > 0 && !isLoading ? (
                                searchResult.map((skill) => (
                                    <>
                                        <label
                                            key={skill.id}
                                            htmlFor={`skill-${skill.id}`}
                                            className={clsx(
                                                'inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-m font-medium cursor-pointer border border-gray-200',
                                                {
                                                    'bg-purple-50 border border-purple-500':
                                                        selectedSkill.some(
                                                            (s) => s.id === skill.id,
                                                        ),
                                                },
                                            )}
                                        >
                                            {skill.name}
                                        </label>
                                        <input
                                            type="checkbox"
                                            id={`skill-${skill.id}`}
                                            checked={selectedSkill.some((s) => s.id === skill.id)}
                                            onChange={(e) =>
                                                handleSkillSelectionChange(skill, e.target.checked)
                                            }
                                            className=" ml-2 h-4 w-4 rounded accent-purple-500 peer"
                                        />
                                    </>
                                ))
                            ) : (
                                !isLoading &&
                                debouncedSearchTerm.trim().length > 0 && (
                                    <li>검색 결과가 없습니다</li>
                                )
                            )}
                            {isError && <li>오류: {error?.message}</li>}
                        </ul>
                    )}
            </div>
        </div>
    );
};

export default SearchSkill;
