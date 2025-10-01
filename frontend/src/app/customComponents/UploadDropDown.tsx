import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FaAngleDown, FaAngleUp, FaCheck } from 'react-icons/fa6';

type UploadDropDownPropsType = {
    arr: string[];
    dropDownLabel: string;
    dropDownPlaceholoder: string;
    width: string;
    height: string;
    value?: string;
    labelText: string;
    labelFont: string;
    gap: string;
    name: string;
    rules?: RegisterOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
    // eslint-disable-next-line no-unused-vars
    onChange?: (a: string) => void;
};
const UploadDropDown = ({
    arr,
    dropDownLabel,
    dropDownPlaceholoder,
    width,
    height,
    name,
    gap,
    labelText,
    labelFont,
    errors,
    rules,
}: UploadDropDownPropsType) => {
    const [open, setOpen] = useState<boolean>(false);
    const { control } = useFormContext();

    return (
        <div className={`w-fit flex flex-col justify-between items-start ${gap}`}>
            <label
                htmlFor="isDeploy"
                className={`text-[var(--color-gray-900)] ${labelText} ${labelFont}`}
            >
                {dropDownLabel}
            </label>
            <Controller
                control={control}
                name={`${name}`}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger
                            className={`relative ${width} ${height} border rounded-[8px] px-[12px] flex items-center justify-between cursor-pointer transition duration-300 ease-in-out ${open ? 'border-[var(--color-purple-500)]' : 'border-[var(--color-gray-400)]'} ${errors ? 'border-[var(--color-red-500)]' : ''}`}
                        >
                            <span className="flex-1 text-left">
                                {field.value || (
                                    <span className="text-[var(--color-gray-600)] text-[16px]">
                                        {dropDownPlaceholoder}
                                    </span>
                                )}
                            </span>
                            <span className="ml-2 flex-shrink-0">
                                {open ? (
                                    <FaAngleUp className="w-[15px] h-[15px] text-[var(--color-gray-400)]" />
                                ) : (
                                    <FaAngleDown className="w-[15px] h-[15px] text-[var(--color-gray-400)]" />
                                )}
                            </span>
                            {errors && (
                                <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[76px] whitespace-nowrap">
                                    {errors.message}
                                </p>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className={`${width} flex flex-col gap-[4px] p-[6px]`}
                            side="bottom"
                            align="start"
                            sideOffset={6}
                            alignOffset={0}
                        >
                            {arr.map((a, i) => (
                                <DropdownMenuItem
                                    key={i}
                                    className="text-[16px] text-[var(--color-gray-700)] data-[highlighted]:text-white bg-[white] data-[highlighted]:bg-[var(--color-purple-500)] transition duration-300 ease-in-out w-[364px] h-[48px]"
                                    onSelect={() => field.onChange?.(a)}
                                >
                                    <FaCheck className="text-white" />
                                    {a}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
                    </DropdownMenu>
                )}
            />
        </div>
    );
};

export default UploadDropDown;
