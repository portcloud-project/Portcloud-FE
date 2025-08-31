'use client';
import PortfolioLicense from '@/app/customComponents/PortflioLicense';
import PortfolioAword from '@/app/customComponents/PortfolioAword';
import PortfolioCreer from '@/app/customComponents/PortfolioCreer';
import PortfolioProject from '@/app/customComponents/PortfolioProject';
import PortfolioSchool from '@/app/customComponents/PortfolioSchool';
import SearchSkill from '@/app/customComponents/SearchSkill';
import useSectionManagement from '@/app/hooks/useSectionManagement';

interface ProjectSectionData {
    id: number;
    value: string;
}
interface AwardSectionData {
    id: number;
    value: string;
}
interface CreerSectionData {
    id: number;
    companyName: string;
    position: string;
    jobTitle: string;
    period: string;
    description: string;
}
interface SchoolSectionData {
    id: number;
    school: string;
    department: string;
}
interface LicenseSectionData {
    id: number;
    certificationName: string;
    acquisitionDate: string;
    registrationNumber: string;
}

const UploadPortfolios = () => {
    // ⭐️ useSectionManagement 훅 사용으로 상태 및 핸들러 단순화
    const {
        sections: projectSections,
        addSection: handleAddProjectComponent,
        updateSectionValue: handleProjectComponentValueChange,
        deleteSection: handleProjectDeleteComponent,
    } = useSectionManagement<ProjectSectionData>([{ id: 1, value: '' }]); // 초기값 지정

    const {
        sections: awordSections,
        addSection: handleAddAwordComponent,
        updateSectionValue: handleAwordComponentValueChange,
        deleteSection: handleAwordDeleteComponent,
    } = useSectionManagement<AwardSectionData>([{ id: 1, value: '' }]); // 초기값 지정

    const {
        sections: creerSections,
        addSection: handleAddCreerComponent,
        updateSectionValue: handleCreerComponentValueChange,
        deleteSection: handleCreerDeleteComponent,
    } = useSectionManagement<CreerSectionData>([
        {
            id: 1,
            companyName: '',
            position: '',
            jobTitle: '',
            period: '',
            description: '',
        },
    ]); // 초기값 지정

    const {
        sections: schoolSections,
        addSection: handleAddSchoolComponent,
        updateSectionValue: handleSchoolComponentValueChange,
        deleteSection: handleSchoolDeleteComponent,
    } = useSectionManagement<SchoolSectionData>([{ id: 1, school: '', department: '' }]); // 초기값 지정

    const {
        sections: LicenseSections,
        addSection: handleAddLicenseComponent,
        updateSectionValue: handleLicenseComponentValueChange,
        deleteSection: handleLicenseDeleteComponent,
    } = useSectionManagement<LicenseSectionData>([
        { id: 1, certificationName: '', acquisitionDate: '', registrationNumber: '' },
    ]); // 초기값 지정

    return (
        <section className="w-[768px] flex gap-[48px] flex-col">
            <h3 className="text-[28px] font-bold">포트폴리오 업로드</h3>
            <form action="" className="flex flex-col gap-[48px]">
                <div className="flex gap-[12px] flex-col">
                    <label htmlFor="" className="font-bold text-[24px]">
                        제목 *
                    </label>
                    <input
                        type="text"
                        className="w-full py-[12px] border rounded-[8px] px-[20px]"
                        placeholder="제목을 입력해 주세요"
                    />
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
                        type="text"
                        className="w-full py-[12px] border rounded-[8px] px-[20px]"
                        placeholder="이메일을 입력해 주세요"
                    />
                </div>
                <div className="flex gap-[12px]">
                    <div className="flex flex-col flex-grow gap-[12px]">
                        <label htmlFor="" className="font-bold text-[24px]">
                            분야 *
                        </label>
                        <input
                            type="text"
                            className=" py-[12px] border rounded-[8px] px-[20px]"
                            placeholder="분야를 입력해 주세요"
                        />
                    </div>
                    <div className="flex flex-col flex-grow gap-[12px]">
                        <label htmlFor="" className="font-bold text-[24px]">
                            직무 *
                        </label>
                        <input
                            type="text"
                            className=" py-[12px] border rounded-[8px] px-[20px]"
                            placeholder="직무를 입력해 주세요"
                        />
                    </div>
                </div>
                <SearchSkill />
                <div className="flex flex-col gap-[12px]">
                    <h1 className="text-[24px] font-bold">본인 소개 *</h1>
                    <label htmlFor="">
                        <textarea
                            placeholder="내용을 입력해 주세요"
                            className="w-full min-h-[312px] rounded-[8px] py-[12px] px-[20px] border resize-none overflow-y-auto"
                        />
                    </label>
                </div>

                {/* 학력 섹션 */}
                <div className="flex flex-col gap-[12px]">
                    {schoolSections.map((data) => (
                        <PortfolioSchool
                            key={data.id}
                            id={data.id}
                            school={data.school}
                            department={data.department}
                            onDelete={handleSchoolDeleteComponent}
                            onValueChange={(id, field, newValue) =>
                                handleSchoolComponentValueChange(id, field, newValue)
                            }
                            title="학력 *"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            handleAddSchoolComponent({
                                school: '',
                                department: '',
                            })
                        } // ⭐️ 새로운 아이템의 기본값만 전달
                        className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                    >
                        <div className="text-gray-600 text-[20px]">+</div>
                    </button>
                </div>

                {/* 경력 섹션 */}
                <div className="flex flex-col gap-[12px]">
                    {creerSections.map((data) => (
                        <PortfolioCreer
                            key={data.id}
                            id={data.id}
                            companyName={data.companyName} // ⭐️ 필드 prop 전달
                            position={data.position} // ⭐️ 필드 prop 전달
                            jobTitle={data.jobTitle} // ⭐️ 필드 prop 전달
                            period={data.period} // ⭐️ 필드 prop 전달
                            description={data.description} // ⭐️ 필드 prop 전달
                            onDelete={handleCreerDeleteComponent}
                            onValueChange={(id, field, newValue) =>
                                handleCreerComponentValueChange(id, field, newValue)
                            }
                            title="경력"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            handleAddCreerComponent({
                                companyName: '',
                                position: '',
                                jobTitle: '',
                                period: '',
                                description: '',
                            })
                        } // ⭐️ 새로운 아이템의 기본값만 전달
                        className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                    >
                        <div className="text-gray-600 text-[20px]">+</div>
                    </button>
                </div>

                {/* 수상 섹션 */}
                <div className="flex flex-col gap-[12px]">
                    {awordSections.map((data) => (
                        <PortfolioAword
                            key={data.id}
                            id={data.id}
                            initialValue={data.value}
                            onDelete={handleAwordDeleteComponent}
                            onValueChange={(id, newValue) =>
                                handleAwordComponentValueChange(id, 'value', newValue)
                            }
                            title="수상"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddAwordComponent({ value: '' })} // ⭐️ 새로운 아이템의 기본값만 전달
                        className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                    >
                        <div className="text-gray-600 text-[20px]">+</div>
                    </button>
                </div>

                {/* 프로젝트 섹션 */}
                <div className="flex flex-col gap-[12px]">
                    {projectSections.map((data) => (
                        <PortfolioProject
                            key={data.id}
                            id={data.id}
                            initialValue={data.value}
                            onDelete={handleProjectDeleteComponent}
                            onValueChange={(id, newValue) =>
                                handleProjectComponentValueChange(id, 'value', newValue)
                            }
                            title="프로젝트"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddProjectComponent({ value: '' })} //
                        className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                    >
                        <div className="text-gray-600 text-[20px]">+</div>
                    </button>
                </div>
                {/* 자격 어학 섹션 */}
                <div className="flex flex-col gap-[12px]">
                    {LicenseSections.map((data) => (
                        <PortfolioLicense
                            key={data.id}
                            id={data.id}
                            acquisitionDate={data.acquisitionDate}
                            certificationName={data.certificationName}
                            registrationNumber={data.registrationNumber}
                            onDelete={handleLicenseDeleteComponent}
                            onValueChange={(id, filed, newValue) =>
                                handleLicenseComponentValueChange(id, filed, newValue)
                            }
                            title="경력 / 어학"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            handleAddLicenseComponent({
                                certificationName: '',
                                acquisitionDate: '',
                                registrationNumber: '',
                            })
                        } //
                        className=" bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                    >
                        <div className="text-gray-600 text-[20px]">+</div>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default UploadPortfolios;
