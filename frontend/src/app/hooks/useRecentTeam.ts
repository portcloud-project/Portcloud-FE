import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UploadTeamsFormValuesType } from '../upload/teams/page';

type TeamItem = UploadTeamsFormValuesType & {
  id: number;
  title: string;
  writerName: string;
  projectType: string;
  recruitStatus: string;
  requiredRoles: string[];
  viewCount: string;
  likeCount: number;
  recruitDeadline: string;
  createdAt: string;
};

type TeamPage = {
  content: TeamItem[];
  page: number;    // 현재 페이지 번호
  last: boolean;   // 마지막 페이지 여부
  // 필요하면 totalPages 등 추가
};

const limit = 12;

export const useRecentTeam = () => {
  return useInfiniteQuery<TeamPage, Error, TeamItem[], ['recentTeam'], number>({
    queryKey: ['recentTeam'],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get('/api/recentteam', {
        params: { page: pageParam, size: limit },
      });
      return data as TeamPage;
    },
    // 마지막 페이지가 아니면 다음 페이지 번호 리턴
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
    // 핵심: pages[].content[] -> 평탄화해서 훅의 data를 바로 배열로
    select: (data) => data.pages.flatMap((p) => p.content),
    // 초기 렌더에서 undefined 방지
    // placeholderData: [] as TeamItem[],
    staleTime: 1000 * 60 * 5,
  });
};
