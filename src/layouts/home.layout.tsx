import { Outlet } from "react-router";

import { Navbar } from "@/components/navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { UserProvider } from "@/providers/user-provider";

export default function HomeLayout() {
    return (
        <UserProvider>
            <SidebarProvider defaultOpen>
                <AppSidebar />
                <div className="flex w-full flex-col">
                    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <Navbar />
                    </header>
                    <main className="container py-10 pt-6">
                        <Outlet />
                    </main>
                </div>
            </SidebarProvider>
        </UserProvider>
    );
}
