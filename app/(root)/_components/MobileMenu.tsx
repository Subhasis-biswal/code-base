"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import HeaderProfileBtn from "./HeaderProfileBtn";

interface MobileMenuProps {
  isPro: boolean;
}

export default function MobileMenu({ isPro }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-400" />
        ) : (
          <Menu className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-56 bg-[#12121a]/90 backdrop-blur-xl rounded-xl border border-white/[0.05] p-3 shadow-xl z-50"
          >
            <nav className="flex flex-col gap-2">
              {/* Profile at the top */}
              <div className="flex items-center justify-end mb-2">
                <HeaderProfileBtn />
              </div>

              <Link
                href="/snippets"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 bg-gray-800/50 
                  hover:bg-lime-500/10 border border-gray-800 hover:border-lime-500/50 transition-all duration-300"
              >
                <Code2 className="w-4 h-4" />
                <span className="text-sm font-medium">Snippets</span>
              </Link>

              <Link
                href="https://codeconnect-psa3.onrender.com/"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 bg-gradient-to-r from-purple-500/30 to-blue-500/30
                  hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <span className="text-sm font-medium">
                  <b>&lt; &gt;</b> Code Connect
                </span>
              </Link>

              {!isPro && (
                <Link
                  href="/pricing"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                    to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                    transition-all duration-300"
                >
                  <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                    Pro
                  </span>
                </Link>
              )}

              {/* Settings Section */}
              <div className="pt-2 mt-2 border-t border-gray-800">
                <div className="flex flex-col gap-2">
                  <div className="w-full flex justify-center px-3 py-2 [&_select]:!absolute [&_select]:!top-0 [&_select]:!left-0 [&_select]:!w-full [&_select]:!h-full [&_select]:!opacity-0 [&_select]:!cursor-pointer">
                    <ThemeSelector />
                  </div>
                  <div className="w-full flex justify-center px-3 py-2 [&_select]:!absolute [&_select]:!top-0 [&_select]:!left-0 [&_select]:!w-full [&_select]:!h-full [&_select]:!opacity-0 [&_select]:!cursor-pointer [&_select]:scrollbar-thin [&_select]:scrollbar-thumb-gray-700 [&_select]:scrollbar-track-gray-800/50 [&_select]:hover:scrollbar-thumb-gray-600">
                    <LanguageSelector hasAccess={isPro} />
                  </div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 