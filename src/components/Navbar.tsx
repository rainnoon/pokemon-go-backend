import { ConnectButton } from "@rainbow-me/rainbowkit";

// Basic Navbar

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 z-30 w-full">
      <div className="flex justify-between items-center px-4 py-4">
        <div className="font-bold text-lg">NextJS / Foundry Starter</div>
        <ConnectButton />
      </div>
    </div>
  );
}
