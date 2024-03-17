"use client";

import { useEffect, useState } from "react";
import EnergyBar from "./EnergyBar";
import Interaction from "./InteractionView";
import Navbar from "./Navbar";
import NavbarSpacer from "./NavbarSpacer";
import PhaserGame from "./PhaserGame";
import { Monster, monEnergyToString, monMoodToString } from "@/types/monster";
import { Vault } from "@/types/vault";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { contracts } from "@/contracts/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { formatEther } from "viem";
import { daysFromNow } from "@/utils/timedate";

import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/PhaserGame"),
  { ssr: false }
);

interface ViewConnectedMemberProps {
  monster: Monster;
  refetchMonster: () => void;
}

export default function ViewConnectedMember({
  monster,
  refetchMonster,
}: ViewConnectedMemberProps) {
  const [mode, setMode] = useState<"monster" | "vault">("monster");

  const [vaults, setVaults] = useState<Vault[]>([]);

  const chainId = useChainId();
  const viewContract =
    contracts[chainId as keyof typeof contracts]?.ZenMonViewer ?? undefined;

  const queryClient = useQueryClient();
  const { address } = useAccount();

  const {
    data: newVaults,
    queryKey,
    refetch: refetchVaults,
  } = useReadContract({
    address: viewContract && viewContract.address,
    abi: viewContract && viewContract.abi,
    functionName: "getVaults",
    args: address && [address],
  });

  // Load vaults if successful
  useEffect(() => {
    if (newVaults) {
      const newVaultsArray = newVaults.map((vault: any) => {
        return {
          id: vault.id,
          token: vault.token,
          amount: vault.amount,
          expiry: vault.expiry,
        };
      });
      setVaults(newVaultsArray.sort((a, b) => a.expiry - b.expiry));
    }
  }, [newVaults]);

  useEffect(() => {
    if (mode === "vault") {
      refetchVaults();
    }
  }, [mode]);

  const ethusd = 3548;
  const apeusd = 1.96;

  const netPosition = vaults.reduce((acc, vault) => {
    return (
      acc +
      Number(formatEther(vault.amount)) *
        (vault.token === "0x0000000000000000000000000000000000000000"
          ? ethusd
          : apeusd)
    );
  }, 0);

  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-screen-sm">
      <Navbar />
      <NavbarSpacer />

      {mode === "monster" ? (
        <div className="flex flex-col gap-2 w-full px-8 items-center justify-center">
          <div>
            {/* <PhaserGame monster={monster} /> */}
            <DynamicComponentWithNoSSR monster={monster} />
          </div>
          <div className="text-3xl">{`${monster.name}`}</div>
          <div className="text-xl">{`${monEnergyToString(monster.energy)} and ${monMoodToString(monster.mood)}...`}</div>
          <div className="flex flex-col gap-0 w-full px-8 pt-4">
            <div className="text-md font-bold ">Energy</div>
            <EnergyBar value={monster.energy} />
          </div>
          <div className="flex flex-col gap-0 w-full px-8 pt-4">
            <div className="text-md font-bold ">Mood</div>
            <EnergyBar value={monster.mood} />
          </div>
          <div className="w-full">
            <Interaction refetchMonster={refetchMonster} />
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col gap-4 justify-start items-center">
          <div className="mt-8 flex flex-col gap-2 min-w-48 p-4 items-center justify-center rounded-full border-4 border-white min-h-48">
            <div className=" font-superion text-4xl">
              ${netPosition.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="flex flex-col text-2xl mb-2">Your Savings</div>
            {vaults.map((vault, index) => (
              <div key={index} className="flex flex-col mb-2">
                <div className="flex flex-row justify-between text-md">
                  <div>
                    $
                    {vault.token ===
                    "0x0000000000000000000000000000000000000000"
                      ? (Number(formatEther(vault.amount)) * ethusd).toFixed(2)
                      : (Number(formatEther(vault.amount)) * apeusd).toFixed(2)}
                  </div>
                  <div>
                    {vault.token ===
                    "0x0000000000000000000000000000000000000000"
                      ? "ETH"
                      : "APE"}
                  </div>
                  <div>{daysFromNow(vault.expiry)}d</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button
              disabled={true}
              className="bg-accent  rounded-md p-2 text-xl disabled:opacity-50"
            >
              No withdraw available
            </button>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full h-14 z-10">
        <button
          className={`text-xl w-1/2  h-full ${mode === "monster" ? "bg-accent" : "bg-gray-900"}`}
          onClick={() => {
            setMode("monster");
          }}
        >
          {monster.name}
        </button>
        <button
          className={`text-xl w-1/2  h-full ${mode === "vault" ? "bg-accent" : "bg-gray-900"}`}
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
