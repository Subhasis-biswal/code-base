import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

import Link from "next/link";
import {Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { api } from "@/convex/_generated/api";
import MobileMenu from "./MobileMenu";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      <div
        className="flex items-center justify-between 
        bg-[#0a0a0f]/80 backdrop-blur-xl p-4 sm:p-6 mb-4 rounded-lg"
      >
        {/* Logo - Always visible */}
        <Link href="/snippets" className="flex items-center gap-3 group relative">
          <div
            className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
          />
          <div
            className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
            ring-white/10 group-hover:ring-white/20 transition-all transform -rotate-0 group-hover:rotate-180 transition-transform duration-500"
          >
            <b className="size-6 text-blue-400">&lt; &gt;</b>
          </div>
          <div className="flex flex-col">
            <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
              CodeBase
            </span>
            <span className="hidden sm:block text-xs text-blue-400/60 font-medium">
              Your Code Arsenal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-lime-500/10 border border-gray-800 hover:border-lime-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-lime-500/30 
                to-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>

            <Link
              href="https://codeconnect-psa2.onrender.com/"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gradient-to-r from-purple-500/30 to-blue-500/30
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/50 
                to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                <b>&lt; &gt;</b> Code Connect
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <ThemeSelector />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>

            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                  to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                  transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                  Pro
                </span>
              </Link>
            )}

            <SignedIn>
              <RunButton />
            </SignedIn>

            <div className="pl-3 border-l border-gray-800">
              <HeaderProfileBtn />
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-4">
          <SignedIn>
            <RunButton />
          </SignedIn>
          <MobileMenu isPro={Boolean(convexUser?.isPro)} />
        </div>
      </div>
    </div>
  );
}
export default Header;