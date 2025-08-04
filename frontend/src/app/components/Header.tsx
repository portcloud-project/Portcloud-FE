import Link from "next/link";

const Header = () => {
    const navArr = ["프로젝트", "포트폴리오", "팀 구하기", "기록"];

    return (
        <header className="fixed top-0 left-0 w-[100vw] h-[60px] flex justify-center items-center text-[var(--color-gray-900)] font-semibold text-[16px]">
            <div className="w-[1440px] h-full flex flex-row justify-between items-center">
                <div className="w-[130px] h-[28px]">
                    logoImage
                </div>

                <nav className="w-[286px] h-[36px] flex flex-row justify-between items-center">
                    {navArr.map((a, i) => (
                        <Link
                            key={i}
                            href={"/"}
                            className=""
                        >
                            {a}
                        </Link>
                    ))}
                </nav>

                <div className="w-[130px] h-[24px] flex justify-end items-center">
                    <h3 className="">로그인</h3>
                </div>
            </div>
        </header>
    );
};

export default Header;
