"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { User } from "better-auth"
import Link from "next/link"
import { LogOut, PenSquare, UserIcon } from "lucide-react"
import { signOut } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface UserMenuProps{
  user: User
}

const UserMenu = ({ user }: UserMenuProps) => {
  
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  const handleLogout = async() => {
    setIsLoading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("You have been Logged Out Successfully");
            router.refresh()
          }
        }
      })
    } catch (error) {
      console.log(error)
      toast("Faled to Logout ! Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="w-8 h-8 rounded-full relative">
          <Avatar className="w-8 h-8">
            <AvatarFallback>{ getInitials(user?.name) || "User"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-bold">{ user.name}</p>
            <p className="text-sm text-muted-foreground">{ user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/profile"}>
            <UserIcon className="h-4 w-4 mr-2" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/post/create"}>
            <PenSquare className="h-4 w-4 mr-2" /> Create Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={isLoading} className="cursor-pointer">
          <LogOut className="mr-3 h-4 w-4" />
          <span>{isLoading ? "Logging Out"  : "LogOut" }</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
