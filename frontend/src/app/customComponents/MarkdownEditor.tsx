'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useState } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type Props = { editorHeight?: number };

const MarkdownEditor = ({ editorHeight = 500 }: Props) => {
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex justify-center items-start w-full">
            <div data-color-mode="light" className="w-full">
                <MDEditor
                    value={value}
                    onChange={(v) => setValue(v ?? '')}
                    height={editorHeight}
                    preview="live"
                    className='border border-[var(--color-gray-400)] rounded-[8px]  focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out overflow-hidden'
                />
            </div>
        </div>
    );
};

export default MarkdownEditor;
