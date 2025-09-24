export default function outputLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="flex flex-col justify-start items-center">{children}</main>;
}
