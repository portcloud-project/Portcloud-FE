import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FormData } from '../upload/portfolios/page';
interface RecentPortfolioType<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    count: number;
}

const fetchRecentPortfolio = async () => {
    try {
        const response = await axios.get('/api/recentportfolio');
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const useRecentPortfolio = () => {
    return useQuery<RecentPortfolioType<FormData>>({
        queryKey: ['recent_portfolio'],
        queryFn: async () => {
            const data = await fetchRecentPortfolio();
            console.log(data);
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
