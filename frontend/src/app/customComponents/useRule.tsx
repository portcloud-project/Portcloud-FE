'use client';

import CardLayout from '../layoutComponents/CardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const UseRule = ({
    setUseRuleModal,
}: {
    setUseRuleModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <CardLayout setLoginModal={setUseRuleModal}>
            <Card
                className="w-[518px] tablet:w-[720px] h-[602px] tablet:h-[614px] overflow-y-auto p-8 flex flex-col gap-8 relative"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <CardHeader className="text-center text-lg font-semibold">이용약관</CardHeader>

                <CardContent className="space-y-8 text-sm leading-6">
                    {/* 제1장 총칙 */}
                    <section>
                        <h2 className="font-bold text-base mb-2">제1장 총칙</h2>

                        <article className="space-y-4">
                            <div>
                                <h3 className="font-medium">제1조 (목적)</h3>
                                <p>
                                    이 약관은 PortCloud(이하 &apos;회사&apos;)가 제공하는 PortCloud
                                    서비스(이하 &apos;서비스&apos;)의 이용과 관련하여 ...
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium">제2조 (용어의 정의)</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                        <b>서비스:</b> 회사가 제공하는 포트폴리오 관리, 프로젝트
                                        관리, 팀원 찾기, 성장일지 등 PortCloud 관련 제반 서비스를
                                        의미합니다.
                                    </li>
                                    <li>
                                        <b>회원:</b> 회사의 서비스에 접속하여 이 약관에 따라 회사와
                                        이용계약을 체결하고 서비스를 이용하는 고객을 의미합니다.
                                    </li>
                                    <li>
                                        <b>게시물:</b> 회원이 서비스 상에 게시한 글, 사진, 동영상,
                                        파일 및 링크 등을 의미합니다.
                                    </li>
                                    <li>
                                        <b>계정:</b> 회원의 식별과 서비스 이용을 위해 회사가 승인한
                                        이메일 주소 등을 의미합니다.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium">제3조 (약관의 명시와 개정)</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                        회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기
                                        화면 또는 연결화면에 게시합니다.
                                    </li>
                                    <li>
                                        회사는 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수
                                        있습니다.
                                    </li>
                                    <li>
                                        약관을 개정할 경우 적용일자 및 개정사유를 명시하여 적용일
                                        7일 전부터 공지하며, 불리한 개정 시 30일 이상 유예기간을
                                        둡니다.
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </section>

                    {/* 제2장 서비스 이용 계약 */}
                    <section>
                        <h2 className="font-bold text-base mb-2">제2장 서비스 이용 계약</h2>

                        <article className="space-y-4">
                            <div>
                                <h3 className="font-medium">제4조 (회원가입)</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                        회원가입은 이용자가 약관에 동의한 후 회원가입 신청을 하고,
                                        회사가 이를 승낙함으로써 체결됩니다.
                                    </li>
                                    <li>
                                        다음 각 호에 해당하는 경우 회사는 승낙을 거부하거나 사후에
                                        이용계약을 해지할 수 있습니다.
                                        <ul className="list-decimal pl-5 mt-1 space-y-1">
                                            <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                                            <li>
                                                허위의 정보를 기재하거나 필수 정보를 누락한 경우
                                            </li>
                                            <li>기술상 서비스 제공이 불가능한 경우</li>
                                            <li>사회질서 또는 미풍양속을 저해할 목적</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium">제5조 (회원 정보의 변경)</h3>
                                <p>
                                    회원은 개인정보관리화면을 통해 언제든지 본인의 개인정보를 열람
                                    및 수정할 수 있습니다. 변경 사항을 수정하지 않아 발생한 불이익은
                                    회사가 책임지지 않습니다.
                                </p>
                            </div>
                        </article>
                    </section>

                    {/* 제3장 서비스 이용 */}
                    <section>
                        <h2 className="font-bold text-base mb-2">제3장 서비스 이용</h2>

                        <article className="space-y-4">
                            <div>
                                <h3 className="font-medium">제6조 (회사의 의무)</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                        회사는 관련 법령과 약관이 금지하는 행위를 하지 않으며
                                        안정적으로 서비스를 제공하기 위해 최선을 다합니다.
                                    </li>
                                    <li>
                                        회사는 회원의 개인정보 보호를 위해 보안 시스템을 갖추고
                                        개인정보처리방침을 준수합니다.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium">제7조 (회원의 의무)</h3>
                                <ul className="list-decimal pl-5 space-y-1">
                                    <li>타인의 정보 도용</li>
                                    <li>저작권 등 지식재산권 침해</li>
                                    <li>허위 사실 유포, 명예 훼손</li>
                                    <li>음란·폭력적 정보 게시</li>
                                    <li>영리 목적 무단 사용</li>
                                    <li>서비스 안정적 운영 방해 행위</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium">제8조 (게시물의 저작권 및 관리)</h3>
                                <p>
                                    회원이 서비스에 게시한 게시물의 저작권은 작성자에게 귀속됩니다.
                                    회사는 관련 법령 및 정책에 따라 게시물을 노출하거나 일부
                                    수정·복제·편집할 수 있으며, 회원은 언제든지 삭제·비공개를 요청할
                                    수 있습니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium">제9조 (계약 해지 및 이용 제한)</h3>
                                <p>
                                    회원은 언제든지 탈퇴할 수 있으며, 회사는 회원이 의무를 위반한
                                    경우 경고, 일시정지, 영구정지 등 단계적으로 이용을 제한할 수
                                    있습니다.
                                </p>
                            </div>
                        </article>
                    </section>

                    {/* 제4장 기타 */}
                    <section>
                        <h2 className="font-bold text-base mb-2">제4장 기타</h2>

                        <article className="space-y-4">
                            <div>
                                <h3 className="font-medium">제10조 (면책조항)</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>천재지변 등 불가항력 시 서비스 제공 책임 면제</li>
                                    <li>회원 간 분쟁에 개입할 의무 없음</li>
                                    <li>게시물의 신뢰·정확성에 대한 책임 없음</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium">제11조 (준거법 및 재판관할)</h3>
                                <p>
                                    회사와 회원 간 발생한 분쟁은 대한민국 법을 준거법으로 하며,
                                    관할법원에 제소합니다.
                                </p>
                            </div>
                        </article>
                    </section>
                </CardContent>
            </Card>
        </CardLayout>
    );
};

export default UseRule;
