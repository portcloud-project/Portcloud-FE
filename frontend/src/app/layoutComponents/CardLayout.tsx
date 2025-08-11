const CardLayout = ({
    children,
    setLoginModal,
}: {
    children: React.ReactNode;
    setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <main
            className={`fixed inset-0 bg-[#00000099] z-50 flex justify-center items-center overflow-y-auto`}
            onClick={() => setLoginModal(false)}
        >
            {children}
        </main>
    );
};

export default CardLayout;
