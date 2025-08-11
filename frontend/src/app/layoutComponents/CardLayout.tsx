const CardLayout = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
    return (
        <main
            className={`fixed inset-0 bg-[#00000099] z-50 flex justify-center items-center overflow-y-auto`}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose(); // 배경만 클릭되었을 때만 닫기
            }}
        >
            {children}
        </main>
    );
};

export default CardLayout;
