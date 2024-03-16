"use client";

import { useAccount } from "wagmi";

// Basic Navbar

export default function Navbar() {
  const { isConnected } = useAccount();

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-16">
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex justify-start w-1/2"></div>
        <div className="text-2xl font-superion">ZenMon</div>
        {/* Should hide eventually */}
        <div className="flex justify-end w-1/2">
          {isConnected ? (
            <div className="w-2 h-2 bg-green-500 rounded-full connected"></div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
