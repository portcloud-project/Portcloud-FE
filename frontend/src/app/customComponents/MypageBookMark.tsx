import { useMypageBookMark } from '../hooks/useGetMypageBookMark';

const MypageBookMark = () => {
    const { data } = useMypageBookMark();
    return <div>{data}</div>;
};

export default MypageBookMark;
