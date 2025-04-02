'use client';

import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";

export default function SnippetsMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-[#1a1a2e] hover:bg-[#2a2a3a] transition-colors"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-400" />
        ) : (
          <Menu className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="p-4 space-y-4">
            <Link
              href="/snippets"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-lime-500/10 border border-gray-800 hover:border-lime-500/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">Snippets</span>
            </Link>

            <Link
              href="https://codeconnect-psa3.onrender.com/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 bg-gradient-to-r from-purple-500/30 to-blue-500/30
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-sm font-medium">
                <b>&lt; &gt;</b> Code Connect
              </span>
            </Link>

            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/20
                  hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                  to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                  duration-300"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                  Pro
                </span>
              </Link>
            </SignedOut>

            <div className="pt-2 border-t border-gray-800/50">
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 