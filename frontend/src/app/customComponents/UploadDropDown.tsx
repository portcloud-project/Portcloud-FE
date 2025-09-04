import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaCheck } from 'react-icons/fa6';

const UploadDropDown = ({ arr, dropDowLabel, dropDownPlaceholoder, width }: { arr: string[], dropDowLabel :string, dropDownPlaceholoder :string, width : string }) => {
    const [selected, setSelected] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="w-fit flex flex-col justify-between items-start gap-[12px]">
            <label
                htmlFor="isDeploy"
                className="text-[24px] font-bold text-[var(--color-gray-900)]"
            >
                {dropDowLabel}
            </label>

            <input type="hidden" id="isDeploy" value={selected} />
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    className={` ${width} h-[64px] border rounded-[8px] px-[12px] flex items-center justify-between cursor-pointer transition duration-300 ease-in-out
  ${open ? 'border-[var(--color-purple-500)]' : 'border-[var(--color-gray-400)]'}`}
                >
                    <span className="flex-1 text-left">
                        {selected || (
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
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[376px] flex flex-col gap-[4px] p-[6px]"
                    side="bottom"
                    align="start"
                    sideOffset={6}
                    alignOffset={0}
                >
                    {arr.map((a, i) => (
                        <DropdownMenuItem
                            key={i}
                            className="text-[16px] text-[var(--color-gray-700)] data-[highlighted]:text-white bg-[white] data-[highlighted]:bg-[var(--color-purple-500)] transition duration-300 ease-in-out w-[364px] h-[48px]"
                            onSelect={() => setSelected(a)}
                        >
                            <FaCheck className="text-white" />
                            {a}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UploadDropDown;
