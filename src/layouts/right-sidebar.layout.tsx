export default function RightSidebarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="sticky right-0 top-20 h-fit">{children}</div>;
}
