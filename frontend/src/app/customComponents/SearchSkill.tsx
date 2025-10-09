'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';
import { Skills, skillsStore } from '../stores/skillStore';

const SearchSkill = ({ width }: { width?: string }) => {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { categorizedSkills } = skillsStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const ref = useRef<HTMLDivElement>(null);

    const categories = ['ALL', ...Object.keys(categorizedSkills)];
    const { control } = useFormContext();
    const skills = skillsStore();

    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(inputValue);
        }, 500);
        return () => clearTimeout(handler);
    }, [inputValue]);

    //전체 스킬 API
    const {
        data: searchResult,
        isLoading,
        isError,
    } = useQuery<Skills[], Error>({
        queryKey: ['searchResult'],
        queryFn: async () => {
            const res = await axios.get('/api/skillsearch');
            skills.setSkill(res.data.data);
            return res.data.data;
        },
        staleTime: 1000 * 60,
    });

    const filteredSkill = useMemo(() => {
        if (!searchResult) return [];

        if (debouncedSearchTerm.trim()) {
            return searchResult.filter((skill) =>
                skill.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
            );
        }

        if (selectedCategory !== 'ALL') {
            return categorizedSkills[selectedCategory] || [];
        }

        return searchResult;
    }, [searchResult, debouncedSearchTerm, selectedCategory, categorizedSkills]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setToggleDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Controller
            control={control}
            name="skill"
            rules={{
                validate: (value) => value.length > 0 || '* 기술을 하나 이상 선택해주세요.',
            }}
            defaultValue={[]}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputValue(e.target.value);
                    setToggleDropdown(true);
                };

                const handleRemoveSkill = (skillToRemove: Skills) => {
                    const newSkills = value.filter((s: Skills) => s.id !== skillToRemove.id);
                    onChange(newSkills);
                };

                const handleSkillSelectionChange = (skill: Skills, isChecked: boolean) => {
                    if (isChecked) onChange([...value, skill]);
                    else onChange(value.filter((s: Skills) => s.id !== skill.id));
                };

                return (
                    <div
                        className={`relative gap-[12px] flex flex-col justify-center items-start w-full ${width}`}
                        ref={ref}
                    >
                        <label
                            htmlFor="skill"
                            className="font-bold text-[24px] text-[var(--color-gray-900)]"
                        >
                            스킬
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onFocus={() => setToggleDropdown(true)}
                                placeholder="활용된 스킬을 입력해 주세요"
                                className="w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] p-[20px] pl-[40px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out upload-placeholder"
                            />
                            <span className="w-[24px] h-[24px] flex justify-center items-center absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FaMagnifyingGlass className="w-[16.8px] h-[16.8px] text-[var(--color-gray-500)]" />
                            </span>
                        </div>
                        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}

                        {toggleDropdown && (
                            <div className="absolute top-[124px] left-0 border border-[var(--color-gray-300)] bg-white p-[24px] flex flex-col gap-[16px] rounded-[8px] z-10 w-full max-h-[400px] overflow-y-auto">
                                {value.length > 0 && (
                                    <div className="flex flex-wrap gap-[8px] mb-[16px]">
                                        {value.map((skill: Skills) => (
                                            <div
                                                key={`${skill.id}_${skill.name}`}
                                                className="flex flex-row gap-[4px] items-center px-[16px] py-[6px] rounded-full bg-gray-100 text-gray-700 text-[14px] font-semibold border border-gray-200"
                                            >
                                                {skill.name}
                                                <IoCloseOutline
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    className="w-[16px] h-[16px] cursor-pointer"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-[16px]">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setInputValue('');
                                                setDebouncedSearchTerm('');
                                            }}
                                            className={clsx(
                                                'px-4 py-1 rounded-full border text-sm',
                                                selectedCategory === cat
                                                    ? 'bg-purple-100 border-purple-500 text-purple-700'
                                                    : 'bg-gray-100 border-gray-300 text-gray-600',
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <ul
                                    id="skill-search-results"
                                    role="listbox"
                                    className="w-full rounded-[16px] p-[8px] flex gap-[12px] justify-start flex-wrap"
                                >
                                    {isLoading && <li>검색 중...</li>}
                                    {isError && <li>오류: {error?.message}</li>}
                                    {!isLoading &&
                                        filteredSkill.length > 0 &&
                                        filteredSkill.map((skill) => (
                                            <label
                                                key={skill.id}
                                                htmlFor={`skill-${skill.id}`}
                                                className={clsx(
                                                    'inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium cursor-pointer border border-gray-200',
                                                    {
                                                        'bg-purple-50 border border-purple-500':
                                                            value.some(
                                                                (s: Skills) => s.id === skill.id,
                                                            ),
                                                    },
                                                )}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`skill-${skill.id}`}
                                                    checked={value.some(
                                                        (s: Skills) => s.id === skill.id,
                                                    )}
                                                    onChange={(e) =>
                                                        handleSkillSelectionChange(
                                                            skill,
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="mr-2 h-4 w-4 rounded accent-purple-500"
                                                />
                                                {skill.name}
                                            </label>
                                        ))}
                                    {!isLoading && filteredSkill.length === 0 && (
                                        <li>결과가 없습니다</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default SearchSkill;
