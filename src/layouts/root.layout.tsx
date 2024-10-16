import { Outlet } from "react-router";

import { Navbar } from "@/components/navbar";

export default function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Navbar />
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="border-t bg-background py-4 text-center text-sm text-muted-foreground">
                This is Copyright
            </footer>
        </div>
    );
}
