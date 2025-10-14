import { useFormContext } from 'react-hook-form';
import SearchSkill from './SearchSkill';
import UploadDropDown from './UploadDropDown';
import { AiOutlineClose } from 'react-icons/ai';

/* eslint-disable no-unused-vars */
interface PortfolioCreerProps {
    index: number;
    isOnlyOneSection: boolean;
    onDelete: (id: number) => void;
    id: number;
}

const TeamRecruit = ({ index, onDelete, isOnlyOneSection, id }: PortfolioCreerProps) => {
    const positionArr = ['Back-end', 'Front-end', 'Full-stack', 'PM', 'Designer'];
    const peopleArr = [...Array.from({ length: 5 }, (_, i) => `${i + 1}명`)];

    const fieldNamePrefix = `recruitRoles.${index}`;

    const {
        formState: { errors },
    } = useFormContext();
    return (
        <div className="w-full flex flex-row justify-between items-center gap-[16px] relative">
            {/* 모집 포지션, 인원, 스킬 section */}
            {/* 모집 포지션 section */}
            <UploadDropDown
                arr={positionArr}
                dropDownLabel={'모집 포지션 *'}
                dropDownPlaceholoder={''}
                width="w-[216px]"
                height="h-[64px]"
                gap="gap-[12px]"
                labelFont="font-bold"
                labelText="text-[24px]"
                name={`${fieldNamePrefix}.role`}
                rules={{ required: '모집 포지션을 선택해주세요' }}
                errors={errors.position}
            />
            {/* 모집 인원 section */}
            <UploadDropDown
                arr={peopleArr}
                dropDownLabel={'모집 인원 *'}
                dropDownPlaceholoder={''}
                width="w-[136px]"
                height="h-[64px]"
                gap="gap-[12px]"
                labelFont="font-bold"
                labelText="text-[24px]"
                name={`${fieldNamePrefix}.count`}
                rules={{ required: '모집 인원을 선택해주세요' }}
                errors={errors.people}
            />
            {/* 스킬 section */}
            <SearchSkill width="w-full" fieldName={`${fieldNamePrefix}.skills`} />

            {!isOnlyOneSection && (
                <button
                    type="button"
                    onClick={() => onDelete(id)}
                    className="absolute right-0 top-0 cursor-pointer "
                >
                    <AiOutlineClose />
                </button>
            )}
        </div>
    );
};

export default TeamRecruit;
