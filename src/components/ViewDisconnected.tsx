import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function ViewDisconnected() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-2 max-w-screen-sm w-full">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/logos/logo-dark.png"
            width="200"
            height="200"
            alt="ZenMon Logo"
          />
          <div className="text-xl font-superion">NuRtuRe, $aVe</div>
          <div className="mt-4">
            <ConnectButton
              showBalance={false}
              chainStatus="none"
              accountStatus="avatar"
              label="Enter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
