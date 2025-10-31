'use client';

import dayjs from 'dayjs';
import LoadingSpinner from './LoadingSpinner';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import CustomConfirm from './CustomConfirm';
import { useMypageBookMark } from '../hooks/useGetMypageBookMark';
// import { BookmarkMinus } from 'lucide-react';

const MypageBookMark = () => {
    const { data, isLoading, isError, error } = useMypageBookMark();
    const router = useRouter();
    // const [isOpenConfirm, setIsConfirm] = useState(false);
    // const [deleteInfo, setDeleteInfo] = useState<{ id: string; type: string } | null>(null);
    if (data?.length === 0) {
        return <div>북마크한 게시글이 존재하지 않습니다</div>;
    }
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-[50vh]">
                <LoadingSpinner />
            </div>
        );
    }
    if (isError) {
        return (
            <p className="text-red-500 flex items-center justify-center w-full h-[50vh]">
                {error instanceof Error ? error.message : '데이터를 불러오지 못했습니다.'}
            </p>
        );
    }
    const postTypeMap: Record<string, string> = {
        project: '프로젝트',
        portfolio: '포트폴리오',
        teampost: '팀구하기',
        blog: '기록',
    };

    const onClickByType = (type: string, id: string) => {
        if (type === 'teampost') {
            const path = (type = 'teams');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'blog') {
            const path = (type = 'logs');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'project') {
            const path = (type = 'projects');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'portfolio') {
            const path = (type = 'portfolio');
            router.push(`/output/${path}/${id}`);
        }
    };
    return (
        <div className="flex flex-wrap gap-[12px]">
            {data?.map((bookmark) => (
                <div
                    key={`${bookmark.id}`}
                    className="group w-full laptop:w-[calc(33.3%-8px)] tablet:w-[calc(50%-6px)] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer "
                    onClick={() => onClickByType(bookmark.type, bookmark.id)}
                >
                    {/* 앞면 */}
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://port-cloud.com/img/${bookmark.thumbnailURL})`,
                            }}
                        ></div>

                        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/60 to-transparent rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                            <div className="font-bold text-white text-[18px]">
                                {bookmark.title}
                                <p className="text-gray-100 text-[14px]">
                                    {postTypeMap[bookmark.type] || bookmark.type}
                                </p>
                                <p>{dayjs(bookmark.createTime).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
                    </div>

                    {/* 뒷면 */}
                    <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                        {/* 뒷면 배경 */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://port-cloud.com/img/${bookmark.thumbnailURL})`,
                            }}
                        ></div>
                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className="absolute bottom-0 left-0 right-0 h-[100px] rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                            <div className="font-bold text-white text-[18px]">
                                {bookmark.title}
                                <p className="text-gray-100 text-[14px]">
                                    {postTypeMap[bookmark.type] || bookmark.type}
                                </p>
                                <p>{dayjs(bookmark.createTime).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-[18px] p-[24px] flex-col  ">
                            {/* <p
                                className="bg-purple-500  rounded-[100px] min-w-[72px] min-h-[72px] flex justify-center items-center"
                                // onClick={(e) => {
                                //     setIsConfirm(true);
                                //     setDeleteInfo({
                                //         id: bookmark.id,
                                //         type: bookmark.type,
                                //     });
                                //     e.stopPropagation();
                                // }}
                            >
                                <BookmarkMinus />
                            </p> */}
                        </div>
                    </div>
                </div>
            ))}
            {/* {isOpenConfirm && deleteInfo && (
                <CustomConfirm
                    onAccept={() => {
                        handleDelete(deleteInfo.id, deleteInfo.type);
                        setIsConfirm(false);
                        setDeleteInfo({
                            id: '',
                            type: '',
                        });
                    }}
                    onCancel={() => {
                        setIsConfirm(false);
                        setDeleteInfo({
                            id: '',
                            type: '',
                        });
                    }}
                    title="북마크 삭제"
                    message="해당 게시글의 북마크를 삭제하시겠습니까 ?"
                />
            )} */}
        </div>
    );
};

export default MypageBookMark;
