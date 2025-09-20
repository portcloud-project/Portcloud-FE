'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useId } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkdownProps {
    value?: string; // ✅ RHF가 내려줄 값
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange?: (v: string) => void; // ✅ RHF field.onChange
    onBlur?: () => void; // ✅ RHF field.onBlur (touched 관리)
    id?: string;
    name?: string;
    error?: string; // 에러 스타일/헬퍼텍스트
    editorHeight?: number;
    labelText: string;
    labelFont: string;
    dropDownLabel: string; // 네이밍은 유지
}

const MarkdownEditor = ({
    value = '',
    onChange,
    onBlur,
    id,
    name,
    error,
    editorHeight = 500,
    labelFont,
    labelText,
    dropDownLabel,
}: MarkdownProps) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const describedBy = error ? `${inputId}-error` : undefined;

    return (
        <div className="flex flex-col justify-center items-start w-full gap-[12px]">
            <label
                htmlFor={inputId}
                className={`text-[var(--color-gray-900)] ${labelText} ${labelFont}`}
            >
                {dropDownLabel}
            </label>

            <div data-color-mode="light" className="w-full">
                <MDEditor
                    // a11y
                    id={inputId}
                    aria-invalid={!!error}
                    aria-describedby={describedBy}
                    // RHF 연결
                    value={value}
                    onChange={(v) => onChange?.(v ?? '')}
                    onBlur={onBlur}
                    // UI
                    height={editorHeight}
                    preview="live"
                    className={`border rounded-[8px] overflow-hidden transition duration-300 ease-in-out
            ${
                error
                    ? 'border-[var(--color-red-500)]'
                    : 'border-[var(--color-gray-400)] focus:border-[var(--color-purple-500)] focus:outline-none'
            }`}
                />
            </div>

            {!!error && (
                <p id={describedBy} className="text-sm text-[var(--color-red-500)]">
                    {error}
                </p>
            )}
            {/* name은 테스트/트래킹 용도로 div data-attr로 묶어둘 수도 있음 */}
            {name && <div data-field-name={name} className="sr-only" />}
        </div>
    );
};

export default MarkdownEditor;
