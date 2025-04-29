"use client"
import { useAuthContext } from "@/app/provider"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BadgeCent, Clapperboard, HomeIcon, Search, WalletCards } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MenuItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: HomeIcon,
    },
    {
        title: "Create",
        url: "/create",
        icon: Clapperboard,
    },
    {
        title: "Explore",
        url: "/explore",
        icon: Search,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: WalletCards,
    },
]

function AppSidebar() {
    const path = usePathname()
    const { user } = useAuthContext()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex flex-col items-center w-full">
                    <Link href="/">
                        <div className="flex items-center gap-2 justify-center mt-3">
                            <Image
                                src={"/logo.svg"}
                                alt="Reelsy logo"
                                width={40}
                                height={40}
                                className="group-data-[collapsible=icon]:w-[48px] group-data-[collapsible=icon]:h-[48px]"
                            />
                            <h2 className="font-bold text-2xl group-data-[collapsible=icon]:hidden">Reelsy</h2>
                        </div>
                    </Link>
                    <h2 className="text-sm text-gray-400 text-center mt-3 group-data-[collapsible=icon]:hidden">
                        AI short form content generator
                    </h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className="mx-5 mt-4 group-data-[collapsible=icon]:mx-0">
                            <Link href={"/create"}>
                                <Button className="w-full group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                                    <Clapperboard className="h-5 w-5 shrink-0 group-data-[collapsible=icon]:mr-0" />
                                    <span className="group-data-[collapsible=icon]:hidden ml-2">Create</span>
                                </Button>
                            </Link>
                        </div>
                        <SidebarMenu>
                            {MenuItems.map((menu, index) => (
                                <SidebarMenuItem key={index} className="mt-3 mx-5 group-data-[collapsible=icon]:mx-0">
                                    <Link href={menu?.url} className="block w-full">
                                        <SidebarMenuButton isActive={path === menu.url} className="w-full" tooltip={menu.title}>
                                            <div className="flex items-center gap-4">
                                                <menu.icon className="h-5 w-5 shrink-0" />
                                                <span className="group-data-[collapsible=icon]:hidden">{menu?.title}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                {/* Credits section with different display for collapsed state */}
                <div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mb-6">
                    {/* Expanded state */}
                    <div className="p-5 border rounded-lg mx-2 mb-6 bg-gray-800 group-data-[collapsible=icon]:hidden">
                        <div className="flex items-center justify-between">
                            <BadgeCent className="text-gray-400" />
                            <h2 className="text-gray-400">{user?.credits} Credits Left</h2>
                        </div>
                        <Button className="w-full mt-3">Buy More Credits</Button>
                    </div>

                    {/* Collapsed state */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/billing" className="hidden group-data-[collapsible=icon]:block">
                                    <div className="flex items-center justify-center p-2 rounded-full bg-gray-800 border w-10 h-10">
                                        <BadgeCent className="text-gray-400" />
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <div className="text-center">
                                    <p>{user?.credits} Credits Left</p>
                                    <p className="text-xs text-gray-400">Click to buy more</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar
