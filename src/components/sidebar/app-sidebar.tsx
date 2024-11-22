import {
    AlignEndHorizontalIcon,
    Calendar,
    Home,
    Inbox,
    LucideIcon,
    Search,
    Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { useUser } from "@/providers/user-provider";

type MenuItemType = {
    title: string;
    url: string;
    icon: LucideIcon;
};

const DEFAULT_ITEMS: MenuItemType[] = [
    {
        icon: Home,
        title: "Home",
        url: "/",
    },
    // {
    //     icon: AlignEndHorizontalIcon,
    //     title: "All",
    //     url: "/all",
    // },
];

// Menu items.

export function AppSidebar() {
    const { user, isLoading } = useUser();
    if (isLoading) return null;

    let items: MenuItemType[] = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Inbox",
            url: "/chat",
            icon: Inbox,
        },
    ];
    if (user) {
        items = [
            ...items,
            {
                title: "Groups",
                url: `/user/${user._id}?tab=group`,
                icon: Calendar,
            },
        ];
    }
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link
                    className="flex flex-row items-center space-x-2 py-2"
                    to={"/"}
                >
                    <img className="size-8" src="/logo.svg" alt="Logo" />
                    <h1>Loop Me</h1>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {DEFAULT_ITEMS.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link to={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>CUSTOM FEEDS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
