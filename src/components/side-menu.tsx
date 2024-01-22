"use client";

import { useState } from "react";

import { logout } from "@/lib/actions";

import { Button } from "./ui/button";

export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div id="mobile-nav" className="flex sticky top-0 md:hidden">
        <button
          className="p-4 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="block p-4 font-bold">Next Auth Example</div>
      </div>

      <div
        id="side-menu"
        className={`absolute md:relative inset-y-0 w-64 p-4 flex flex-col space-y-4 transform ${
          isMenuOpen ? "" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out z-10 bg-background border-r`}
      >
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="flex justify-start w-full px-2"
          >
            Logout
          </Button>
        </form>
      </div>

      {isMenuOpen && (
        <button
          id="tinted-overlay"
          className={`md:hidden fixed inset-0 bg-black/80 ${isMenuOpen ? "animate-in fade-in-0" : ""} ${!isMenuOpen ? "animate-out fade-out-0" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
