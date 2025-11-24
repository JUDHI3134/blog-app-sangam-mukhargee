"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import UserMenu from "../auth/user-menu"

const Header = () => {

  const { data: session, isPending } = useSession();
  const router = useRouter();

  const navItems = [
    {label : "Home", path: "/"},
    {label : "Create Post", path: "/post/create"},
  ]

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="font-black text-xl">Next.js 15 Blog</Link>

          <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link href={item.path} key={item.label} className={cn("text-sm font-medium transition-colors hover:text-primary")}>{ item.label}</Link>
          ))}
        </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {/* keep placeholder for search  */}

          </div>
          {/* placeholder for theme toggle  */}
          <div className="flex items-center gap-2">
            {isPending ? null :
              session?.user ?
                (<UserMenu user={session?.user} />) :
              <Button onClick={() => router.push("/auth")} className="cursor-pointer">
              Login
            </Button>}
            </div>
        </div>

      </div>
    </header>
  )
}

export default Header
