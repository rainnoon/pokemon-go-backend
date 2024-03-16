"use client";

import Interaction from "@/components/InteractionView";
import MintNFTButton from "@/components/MintNFTButton";
import MintNFTWatcher from "@/components/MintNFTWatcher";
import MintTokenButton from "@/components/MintTokenButton";
import MintTokenWatcher from "@/components/MintTokenWatcher";
import PhaserGame from "@/components/PhaserGame";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-2 max-w-screen-sm">
      <div className="h-16" />
      <div>
        <PhaserGame />
      </div>
      <div>
        <Interaction />
      </div>
      {/* <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-col gap-2 items-center justify-start w-96 bg-gray-900 p-8 rounded-xl">
          <h1 className="text-2xl font-bold">ERC721 Test ZenMon</h1>
          <MintNFTButton />
          <MintNFTWatcher />
        </div>
        <div className="flex flex-col gap-2 items-center justify-start w-96 bg-gray-900 p-8 rounded-xl">
          <h1 className="text-2xl font-bold">ERC20 Test ZenMon</h1>
          <MintTokenButton />
          <MintTokenWatcher />
        </div>
      </div> */}
    </div>
  );
}
