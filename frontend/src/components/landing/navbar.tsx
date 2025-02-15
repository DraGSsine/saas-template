"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./logo";
import Link from "next/link";

const navigation = [
  { name: "How It Works", href: "#features" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-md text-[#48558a] font-semibold transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center font-bold gap-2 rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary "
              >
                Sign In
              </Button>

              <Button
                size="lg"
                className="rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Free Trial
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 w-9 p-0"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-[#0A0A0A] border-l border-white/[0.08]"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="flex flex-col space-y-4 pt-4 border-t border-white/[0.08]">
                    <Link href="/auth/signin">
                      <Button
                        variant="ghost"
                        className="w-full text-zinc-300 hover:text-white"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="#pricing">
                      <Button className="w-full bg-blue-600 hover:bg-primary text-white">
                        Start Free Trial
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
