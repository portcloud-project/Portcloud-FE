// import axios from "axios";

export const getItem = async () => {
  const mockData: string[] = [
    "PortCloud, IT 커리어 성장 플랫폼 프로젝트 1",
    "PortCloud, IT 커리어 성장 플랫폼 프로젝트 2",
    "PortCloud, IT 커리어 성장 플랫폼 프로젝트 3",
    "PortCloud, IT 커리어 성장 플랫폼 프로젝트 4",
  ];
  try {
    // const res = await axios.get("백엔드 엔드포인트");
    // return res.data;
    return mockData;
  } catch (error) {
    console.error("api 호출중 오류", error);
    throw error;
  }
};
