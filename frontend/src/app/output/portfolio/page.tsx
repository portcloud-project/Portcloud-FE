'use client';
const PortfolioOutput = () => {
    return (
        <main className="w-[768px]  flex  justify-start items-center">
            <div className="flex gap-[48px] flex-col">
                <section>
                    <h1>타이틀</h1>
                    <p>작성자 시간 및</p>
                </section>
                <section>
                    <p>작성자</p>
                    <p>이메일</p>
                </section>
                <section>
                    <p>포지션</p>
                    <p>스킬</p>
                </section>
                <section>
                    <h2>본인소개</h2>
                    <div>본인소개 출력</div>
                </section>
                <section>
                    <h2>학력</h2>
                    <p>학교</p>
                    <p>졸업 / 졸업예정</p>
                </section>
                <section>
                    <h2>경력</h2>
                    <div>경력 출력</div>
                </section>
                <section>
                    <h2>프로젝트</h2>
                    <div>프로젝트 출력</div>
                </section>
                <section>
                    <h2>수상</h2>
                    <div>수상 출력</div>
                </section>
                <section>
                    <h2>자격/어학</h2>
                    <div>자격어학 출력</div>
                </section>
                <section>댓글</section>
                <section>댓글출력</section>
            </div>
        </main>
    );
};
export default PortfolioOutput;
