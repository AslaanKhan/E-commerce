'use client'

import { User } from "@/payload-types"
import { Button, buttonVariants } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

const UserAccountNav = ({ user }: { user: User }) => {
    const { signout } = useAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button className={buttonVariants({
                    variant: 'ghost',
                    className: 'relative',
                    size: 'sm',
                })}>My Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-60" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-5  leading-none">
                        <p className="font-medium text-sm text-black">{user.email}</p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href='/sell'>Seller DashBoard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem 
                className="cursor-pointer"
                onClick={signout}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>)
}

export default UserAccountNav