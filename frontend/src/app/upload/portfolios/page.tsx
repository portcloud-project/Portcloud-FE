'use client';
import PortfolioLicense from '@/app/customComponents/PortflioLicense';
import PortfolioAword from '@/app/customComponents/PortfolioAword';
import PortfolioCreer from '@/app/customComponents/PortfolioCreer';
import PortfolioProject from '@/app/customComponents/PortfolioProject';
import PortfolioSchool from '@/app/customComponents/PortfolioSchool';
import SearchSkill, { SKILLITEM } from '@/app/customComponents/SearchSkill';
import useSectionManagement from '@/app/hooks/useSectionManagement';
import axios from 'axios';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';

export interface ProjectSectionData {
    id: number;
    description: string;
}
export interface AwardSectionData {
    id: number;
    awardDescription: string;
}
export interface CreerSectionData {
    id: number;
    companyName: string;
    companyPosition: string;
    duty: string;
    date: string;
    dutyDescription: string;
    startDate: string;
    endDate: string;
}
export interface SchoolSectionData {
    id: number;
    school: string;
    schoolStatus: string;
}
export interface LicenseSectionData {
    id: number;
    certificateName: string;
    certificateDate: string;
    number: string;
}

interface FormData {
    title: string;
    email: string;
    industry: string;
    jobPosition: string;
    skill: SKILLITEM;
    introductions: string;
    saveStatus: boolean;
    projectDescriptions: ProjectSectionData[];
    careers: CreerSectionData[];
    awards: AwardSectionData[];
    certificates: LicenseSectionData[];
    educations: SchoolSectionData[];
}

const UploadPortfolios = () => {
    const methods = useForm<FormData>({
        defaultValues: {
            title: '',
            email: '',
            industry: '',
            jobPosition: '',
            // skill: { name: '' },
            introductions: '',
            saveStatus: true,
            projectDescriptions: [{ description: '' }],
            careers: [
                {
                    companyName: '',
                    duty: '',
                    companyPosition: '',
                    startDate: '',
                    endDate: '',
                    date: '',
                    dutyDescription: '',
                },
            ],
            awards: [
                {
                    awardDescription: '',
                },
            ],
            certificates: [
                {
                    certificateName: '',
                    certificateDate: '',
                    number: '',
                },
            ],
            educations: [
                {
                    school: '',
                    schoolStatus: '',
                },
            ],
        },
    });

    const onSubmit = async (data: FormData) => {
        console.log('전송할 데이터:', data);
        try {
            await axios.post<FormData>('/api/portfolioupload', data);
        } catch (err) {
            console.log('Next 서버 전송중 오류', err);
        }
    };

    const {
        register,
        formState: { errors: formErrors },
    } = methods;
    const errors = formErrors as FieldErrors<FormData>;

    const {
        sections: projectSections,
        addSection: handleAddProjectComponent,

        deleteSection: handleProjectDeleteComponent,
    } = useSectionManagement<ProjectSectionData>([{ id: 1, description: '' }]);

    const {
        sections: awordSections,
        addSection: handleAddAwordComponent,

        deleteSection: handleAwordDeleteComponent,
    } = useSectionManagement<AwardSectionData>([{ id: 1, awardDescription: '' }]);

    const {
        sections: creerSections,
        addSection: handleAddCreerComponent,

        deleteSection: handleCreerDeleteComponent,
    } = useSectionManagement<CreerSectionData>([
        {
            id: 1,
            companyName: '',
            companyPosition: '',
            duty: '',
            date: '',
            dutyDescription: '',
            startDate: '',
            endDate: '',
        },
    ]);

    const {
        sections: schoolSections,
        addSection: handleAddSchoolComponent,

        deleteSection: handleSchoolDeleteComponent,
    } = useSectionManagement<SchoolSectionData>([{ id: 1, school: '', schoolStatus: '' }]);

    const {
        sections: licenseSections,
        addSection: handleAddLicenseComponent,
        deleteSection: handleLicenseDeleteComponent,
    } = useSectionManagement<LicenseSectionData>([
        { id: 1, certificateName: '', certificateDate: '', number: '' },
    ]);

    return (
        <section className="w-[768px] flex gap-[48px] flex-col">
            <h3 className="text-[28px] font-bold">포트폴리오 업로드</h3>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    action=""
                    className="flex flex-col gap-[48px]"
                >
                    <div className="flex gap-[12px] flex-col">
                        <label htmlFor="" className="font-bold text-[24px]">
                            제목 *
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="w-full py-[12px] border rounded-[8px] px-[20px]"
                            placeholder="제목을 입력해 주세요"
                            {...register('title', {
                                required: '* 제목을 입력해 주세요.',
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message as string}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-[12px]">
                        <label htmlFor="" className="font-bold text-[24px]">
                            이름
                        </label>
                        <p>이예희</p>
                    </div>
                    <div className="flex gap-[12px] flex-col">
                        <label htmlFor="" className="font-bold text-[24px]">
                            이메일 *
                        </label>
                        <input
                            id="email"
                            type="text"
                            className="w-full py-[12px] border rounded-[8px] px-[20px]"
                            placeholder="이메일을 입력해 주세요"
                            {...register('email', {
                                required: '* 이메일을 입력해 주세요',
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-[12px]">
                        <div className="flex flex-col flex-grow gap-[12px]">
                            <label htmlFor="" className="font-bold text-[24px]">
                                분야 *
                            </label>
                            <input
                                id="filed"
                                type="text"
                                className=" py-[12px] border rounded-[8px] px-[20px]"
                                placeholder="분야를 입력해 주세요"
                                {...register('industry', {
                                    required: '* 분야를 입력해 주세요',
                                })}
                            />
                            {errors.industry && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.industry.message as string}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col flex-grow gap-[12px]">
                            <label htmlFor="" className="font-bold text-[24px]">
                                직무 *
                            </label>
                            <input
                                id="job"
                                type="text"
                                className=" py-[12px] border rounded-[8px] px-[20px]"
                                placeholder="직무를 입력해 주세요"
                                {...register('jobPosition', {
                                    required: '* 직무를 입력해 주세요',
                                })}
                            />
                            {errors.jobPosition && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.jobPosition.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                    <SearchSkill />
                    <div className="flex flex-col gap-[12px]">
                        <h1 className="text-[24px] font-bold">본인 소개 *</h1>
                        <label htmlFor="">
                            <textarea
                                id="introduce"
                                placeholder="내용을 입력해 주세요"
                                className="w-full min-h-[312px] rounded-[8px] py-[12px] px-[20px] border resize-none overflow-y-auto"
                                {...register('introductions', {
                                    required: '* 자기소개(내용)를 입력해 주세요',
                                })}
                            />
                        </label>
                        {errors.introductions && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.introductions.message as string}
                            </p>
                        )}
                    </div>

                    {/* 학력 섹션 */}
                    <div className="flex flex-col gap-[12px]">
                        <h1>학력</h1>
                        {schoolSections.map((section, index) => (
                            <PortfolioSchool
                                key={section.id}
                                id={section.id}
                                index={index}
                                onDelete={() => handleSchoolDeleteComponent(section.id)}
                                isOnlyOneSection={schoolSections.length === 1}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                handleAddSchoolComponent({
                                    school: '',
                                    schoolStatus: '',
                                })
                            }
                            className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                        >
                            <div className="text-gray-600 text-[20px]">+</div>
                        </button>
                    </div>

                    {/* 경력 섹션 */}
                    <div className="flex flex-col gap-[12px]">
                        <h1>경력</h1>
                        {creerSections.map((section, index) => (
                            <PortfolioCreer
                                key={section.id}
                                id={section.id}
                                index={index}
                                onDelete={() => handleCreerDeleteComponent(section.id)}
                                isOnlyOneSection={creerSections.length === 1}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                handleAddCreerComponent({
                                    companyName: '',
                                    companyPosition: '',
                                    duty: '',
                                    date: '',
                                    dutyDescription: '',
                                    startDate: '',
                                    endDate: '',
                                })
                            }
                            className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                        >
                            <div className="text-gray-600 text-[20px]">+</div>
                        </button>
                    </div>

                    {/* 수상 섹션 */}
                    <h1>수상</h1>
                    <div className="flex flex-col gap-[12px]">
                        {awordSections.map((section, index) => (
                            <PortfolioAword
                                key={section.id}
                                id={section.id}
                                index={index}
                                onDelete={() => handleAwordDeleteComponent(section.id)}
                                isOnlyOneSection={awordSections.length === 1}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddAwordComponent({ awardDescription: '' })}
                            className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                        >
                            <div className="text-gray-600 text-[20px]">+</div>
                        </button>
                    </div>

                    {/* 프로젝트 섹션 */}
                    <h1>프로젝트</h1>
                    <div className="flex flex-col gap-[12px]">
                        {projectSections.map((section, index) => (
                            <PortfolioProject
                                key={section.id}
                                id={section.id}
                                index={index}
                                onDelete={() => handleProjectDeleteComponent(section.id)}
                                isOnlyOneSection={projectSections.length === 1}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddProjectComponent({ description: '' })}
                            className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                        >
                            <div className="text-gray-600 text-[20px]">+</div>
                        </button>
                    </div>
                    {/* 자격 어학 섹션 */}
                    <div className="flex flex-col gap-[12px]">
                        <h1>자격 / 어학</h1>
                        {licenseSections.map((section, index) => (
                            <PortfolioLicense
                                key={section.id}
                                id={section.id}
                                index={index}
                                onDelete={() => handleLicenseDeleteComponent(section.id)}
                                isOnlyOneSection={licenseSections.length === 1}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                handleAddLicenseComponent({
                                    certificateName: '',
                                    certificateDate: '',
                                    number: '',
                                })
                            } //
                            className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                        >
                            <div className="text-gray-600 text-[20px]">+</div>
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="flex justify-center max-w-[248px] min-h-[48px] items-center px-[96px] bg-purple-500 text-white text-[14px] font-semibold rounded-[8px] cursor-pointer"
                        >
                            등록하기
                        </button>
                    </div>
                </form>
            </FormProvider>
        </section>
    );
};

export default UploadPortfolios;
