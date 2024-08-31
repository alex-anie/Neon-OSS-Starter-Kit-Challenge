import Image from "next/image";
import DashboardLinks from "../components/DashboardLinks";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"
import { CircleUser, MenuIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem  } from "@/components/ui/dropdown-menu"
import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation"
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardLayout({children}:{children : ReactNode}) {

    const {getUser} = getKindeServerSession()
    const user = await getUser();

    if(!user || user.email !== "ocxigin@gmail.com"){
        return redirect("/")
    } 

  return (
    <>
        <main className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b">

            <Sheet>
                    <SheetTrigger asChild>
                       <Button className="shrink-0 md:hidden" variant="outline" size="icon">
                            <MenuIcon className="h-5 w-5"/>
                       </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                            <DashboardLinks />
                        </nav>
                    </SheetContent>
            </Sheet>

                <nav className="flex gap-4">
                    <Link href="/dashboard" className="flex gap-2 select-none font-extrabold">
                        <Image width={20} height={20} src="/images/logo.png" alt="Amastore logo" />
                        <p>Amastore</p>
                    </Link>

                    <div className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <DashboardLinks />
                    </div>
                </nav>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="w-5 h-5"/>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogoutLink>Logout</LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </header>
            <div className="my-5">{children}</div>
        </main>
    </>
  )
}
