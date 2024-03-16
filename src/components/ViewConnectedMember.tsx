import { useEffect, useState } from "react";
import EnergyBar from "./EnergyBar";
import Interaction from "./InteractionView";
import Navbar from "./Navbar";
import NavbarSpacer from "./NavbarSpacer";
import PhaserGame from "./PhaserGame";
import { Monster } from "@/types/monster";
import { Vault } from "@/types/vault";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { contracts } from "@/contracts/contracts";
import { useQueryClient } from "@tanstack/react-query";

interface ViewConnectedMemberProps {
  monster: Monster;
}

export default function ViewConnectedMember({
  monster,
}: ViewConnectedMemberProps) {
  const [mode, setMode] = useState<"monster" | "vault">("monster");

  const [vaults, setVaults] = useState<Vault[]>([]);

  const chainId = useChainId();
  const viewContract =
    contracts[chainId as keyof typeof contracts]?.ZenMonViewer ?? undefined;

  const queryClient = useQueryClient();
  const { address } = useAccount();

  const { data: newVaults, queryKey } = useReadContract({
    address: viewContract && viewContract.address,
    abi: viewContract && viewContract.abi,
    functionName: "getVaults",
    args: [],
  });

  // Load vaults if successful
  useEffect(() => {
    if (newVaults) {
      console.log(newVaults);
    }
  }, [newVaults]);

  return (
    <div className="flex flex-col items-center gap-2 max-w-screen-sm">
      <Navbar />
      <NavbarSpacer />

      {mode === "monster" ? (
        <div className="flex flex-col gap-2 w-full px-8 items-center">
          <div>
            <PhaserGame monster={monster} />
          </div>
          <div className="font-superion text-xl">{`${monster.name}`}</div>
          <div className="font-superion text-md">{`${"Kinda tired and grumpy..."}`}</div>
          <div className="flex flex-col gap-2 w-full px-8 pt-4">
            <div className="text-xs font-bold font-superion">Energy</div>
            <EnergyBar value={monster.energy} />
          </div>
          <div className="flex flex-col gap-2 w-full px-8 pt-4">
            <div className="text-xs font-bold font-superion">Mood</div>
            <EnergyBar value={monster.mood} />
          </div>
          <div className="w-full">
            <Interaction />
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col gap-4">
          <div className="mt-8 flex flex-col gap-2 w-36 p-4 items-center justify-center rounded-full border-4 border-white h-36">
            <div className=" font-superion text-4xl">$120</div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full h-16 z-10">
        <button
          className={`font-superion w-1/2  h-full ${mode === "monster" ? "bg-accent" : "bg-gray-900"}`}
          onClick={() => {
            setMode("monster");
          }}
        >
          Mon
        </button>
        <button
          className={`font-superion w-1/2  h-full ${mode === "vault" ? "bg-accent" : "bg-gray-900"}`}
          onClick={() => {
            setMode("vault");
          }}
        >
          Vault
        </button>
      </div>
    </div>
  );
}
