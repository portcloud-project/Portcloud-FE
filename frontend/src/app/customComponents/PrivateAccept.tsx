'use client';

import CardLayout from '../layoutComponents/CardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PrivateAccept = ({
    setPrivateModal,
}: {
    setPrivateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <CardLayout setLoginModal={setPrivateModal}>
            <Card
                className="w-[518px] tablet:w-[720px] h-[602px] tablet:h-[614px] overflow-y-auto p-8 flex flex-col gap-8 relative"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <CardHeader className="text-center text-lg font-semibold">
                    개인정보 처리방침
                </CardHeader>

                <CardContent className="space-y-6 text-sm leading-6">
                    <section>
                        <h2 className="font-bold mb-2">1. 총칙</h2>
                        <p>
                            PortCloud(이하 “회사”)는 이용자의 개인정보를 중요시하며 「개인정보
                            보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련
                            법령을 준수합니다.
                        </p>
                        <p>
                            회사는 개인정보처리방침을 통해 이용자가 제공한 개인정보가 어떤 용도와
                            방식으로 이용되며, 보호를 위해 어떤 조치가 취해지고 있는지 안내합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">2. 개인정보의 수집 항목 및 이용 목적</h2>
                        <p className="font-medium">가. 수집 항목</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>필수 항목: 이메일 주소, 비밀번호, 닉네임</li>
                            <li>자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                        </ul>

                        <p className="font-medium mt-3">나. 이용 목적</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>회원 관리: 본인 식별, 부정 이용 방지</li>
                            <li>서비스 제공: 포트폴리오/프로젝트 등록 및 노출 등 핵심 기능</li>
                            <li>신규 서비스 개발 및 마케팅 활용(사전 동의 시 광고성 정보 발송)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">3. 개인정보의 보유 및 이용 기간</h2>
                        <p>
                            회사는 이용자가 회원에서 탈퇴하거나 수집·이용 목적이 달성된 후 지체 없이
                            파기합니다. 단, 관계 법령에 따라 일정 기간 보관할 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">4. 개인정보의 파기 절차 및 방법</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>
                                <span className="font-medium">파기절차:</span> 목적 달성 후 별도 DB
                                또는 서류함에 보관 후 파기
                            </li>
                            <li>
                                <span className="font-medium">파기방법:</span> 전자 파일은 복구
                                불가능한 기술적 방법으로 삭제, 종이는 분쇄 또는 소각
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">5. 개인정보의 제3자 제공</h2>
                        <p>
                            회사는 이용자의 사전 동의 없이 고지 범위를 초과하여 개인정보를
                            이용하거나 외부에 공개하지 않습니다. 다만 법령 또는 수사 목적에 따라
                            요구가 있을 경우 예외로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">6. 개인정보 처리의 위탁</h2>
                        <p>
                            원활한 서비스 제공을 위해 필요한 경우 위탁업체 및 업무 내용을 사전 고지
                            후 처리할 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">7. 이용자 및 법정대리인의 권리</h2>
                        <p>
                            이용자는 언제든지 자신의 개인정보를 조회·수정·삭제할 수 있으며, 서비스
                            내 또는 이메일을 통해 요청 시 지체 없이 조치합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">8. 개인정보의 안전성 확보 조치</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>개인정보처리시스템 접근 제한</li>
                            <li>처리 직원 교육 및 감시</li>
                            <li>개인정보 암호화</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">9. 개인정보 보호책임자</h2>
                        <p>개인정보보호책임자: 강요한 </p>
                        <p>연락처: 010-7507-7699</p>
                        <p>이메일: portcloud.team@gmail.com</p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2">부칙</h2>
                        <p>본 방침은 2025년 10월 01일부터 시행됩니다.</p>
                    </section>
                </CardContent>
            </Card>
        </CardLayout>
    );
};

export default PrivateAccept;
