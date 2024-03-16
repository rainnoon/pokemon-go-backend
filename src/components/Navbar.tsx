import { ConnectButton } from "@rainbow-me/rainbowkit";

// Basic Navbar

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 z-30 w-full">
      <div className="flex justify-between items-center px-4 py-4">
        <div className="w-1/6">A</div>
        <div className="text-2xl font-superion">ZenMon</div>
        {/* Should hide eventually */}
        <div className="w-1/6">
          <ConnectButton
            showBalance={false}
            chainStatus="none"
            accountStatus="avatar"
          />
        </div>
      </div>
    </div>
  );
}
