'use client';

const PasswordReset = () => {

    return (
        <main className="w-[480px] h-auto px-[24px] flex flex-col justify-start items-start gap-[24px] font-bold text-black">
            <h3 className="text-[28px]">비밀번호 재설정</h3>
            <p className="text-[20px]">
                비밀번호 재설정을 위해 포트클라우드에 가입한 이메일을 입력해 주세요.
            </p>
            <form
                autoComplete="off"
                // onSubmit={handleSubmit(onPasswordResetSubmit)}
                className="w-full h-auto flex flex-col justify-start items-start gap-[6px]"
            >
                <label
                    htmlFor="email"
                    className="font-semibold text-[14px] text-[var(--color-gray-900)] text-left"
                >
                    이메일 (필수)
                </label>
                <div className="w-full flex flex-row justify-between items-center gap-[6px] text-[16px] font-normal">
                    {/* <input
                        type="email"
                        id="email"
                        // readOnly={isVerified === 200}
                        placeholder="이메일"
                        className={`w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out ${
                            errors.email
                                ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                        }`}
                        {...register('email', {
                            required: '이메일 주소를 입력해 주세요',
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: '올바른 이메일 형식을 입력하세요',
                            },
                        })}
                    /> */}
                    <button
                        className={`px-[24px] py-[12px] rounded-[8px] text-white bg-[var(--color-purple-500)] whitespace-nowrap border border-[var(--color-purple-500)] transition duration-300 ease-in-out hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer w-[76px] h-[44px] flex justify-center items-center `}
                        // disabled={isSubmitting}
                    >
                        인증
                    </button>
                </div>

                {/* 이메일 error section */}
                {/* {errors.email && (
                    <p className="text-sm text-[var(--color-red-500)]">{errors.email.message}</p>
                )} */}
            </form>
            {/* <button className={`w-full h-[48px] border font-semibold text-[16px] rounded-[8px] transition duration-300 ease-in-out ${
                isVerified ? 'text-white bg-[var(--color-purple-500)] whitespace-nowrap border-[var(--color-purple-500)] hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer' : 'border-[var(--color-gray-200)] bg-[var(--color-gray-100)] text-[var(--color-gray-400)] cursor-not-allowed'
            }`}>다음</button> */}
        </main>
    );
};

export default PasswordReset;
