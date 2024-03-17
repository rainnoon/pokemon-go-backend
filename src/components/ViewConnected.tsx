"use client";

import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import ViewConnectedMember from "./ViewConnectedMember";
import { contracts } from "@/contracts/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Monster } from "@/types/monster";

export default function ViewConnected() {
  const [base, setBase] = useState(1);
  const [name, setName] = useState("");

  const [mon, setMon] = useState<Monster | undefined>(undefined);

  const chainId = useChainId();
  const viewContract =
    contracts[chainId as keyof typeof contracts]?.ZenMonViewer ?? undefined;

  const queryClient = useQueryClient();
  const { address } = useAccount();

  const {
    data: monster,
    queryKey,
    refetch,
  } = useReadContract({
    address: viewContract && viewContract.address,
    abi: viewContract && viewContract.abi,
    functionName: "getMonster",
    args: address && [address],
  });

  const refetchMonster = () => {
    refetch();
  };

  // Creating monster
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Load monster if successful
  useEffect(() => {
    if (monster) {
      const newMonster = {
        id: monster.id,
        name: monster.name,
        base: monster.base,
        status: monster.status,
        live: monster.live,
        energy: monster.energy,
        energyUpdated: monster.energyUpdated,
        mood: monster.mood,
        moodUpdated: monster.moodUpdated,
        accessories: [...monster.accessories],
      };
      setMon(newMonster);
      if (typeof document !== "undefined") {
        const event = new CustomEvent("phaserEvent", { detail: newMonster });
        document.dispatchEvent(event);
      }
    }
  }, [monster]);

  if (
    !(chainId in contracts) ||
    !contracts[chainId as keyof typeof contracts].ZenMonController
  ) {
    return (
      <button
        disabled={true}
        className="w-32 py-2 rounded-md bg-indigo-500 text-white font-bold hover:opacity-80 disabled:opacity-50"
      >
        Contract Error
      </button>
    );
  }

  const contract =
    contracts[chainId as keyof typeof contracts].ZenMonController!;
  const abi = contract.abi;

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [isConfirmed]);

  if (mon?.live) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <ViewConnectedMember monster={mon} refetchMonster={refetchMonster} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-screen justify-between items-center gap-2 py-4 px-4">
      <div className="text-3xl pt-4">Create your ZenMon</div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="text-2xl">Pick a Mon you vibe with...</div>
        <div className="grid grid-cols-3 gap-4">
          <div
            className={`rounded-xl border-2 ${base === 1 ? "border-accent" : "border-transparent"}`}
            onClick={() => {
              setBase(1);
            }}
          >
            <Image
              src="/gifs/mon01.gif"
              alt="Mon 1 Logo"
              width="100"
              height="100"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          <div
            className={`rounded-xl border-2 ${base === 2 ? "border-accent" : "border-transparent"}`}
            onClick={() => {
              setBase(2);
            }}
          >
            <Image
              src="/gifs/mon02.gif"
              alt="Mon 2 Logo"
              width="100"
              height="100"
              style={{ imageRendering: "pixelated" }}
              className="scale-x-[-1]"
            />
          </div>

          <div
            className={`rounded-xl border-2 ${base === 3 ? "border-accent" : "border-transparent"}`}
            onClick={() => {
              setBase(3);
            }}
          >
            <Image
              src="/gifs/mon03.gif"
              alt="Mon 3 Logo"
              width="100"
              height="100"
              style={{ imageRendering: "pixelated" }}
              className="scale-x-[-1]"
            />
          </div>
          <div
            className={`rounded-xl border-2 ${base === 4 ? "border-accent" : "border-transparent"}`}
            onClick={() => {
              setBase(4);
            }}
          >
            <Image
              src="/gifs/mon04.gif"
              alt="Mon 4 Logo"
              width="100"
              height="100"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div
            className={`rounded-xl border-2 ${base === 5 ? "border-accent" : "border-transparent"}`}
            onClick={() => {
              setBase(5);
            }}
          >
            <Image
              src="/gifs/mon05.gif"
              alt="Mon 5 Logo"
              width="100"
              height="100"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>
        <div className="text-2xl">Give them a name...</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-64 py-2 bg-transparent rounded-md border-2  border-accent text-white font-bold p-2 focus:border-accent focus:outline-none"
        />
        <button
          disabled={isPending || isConfirming || name.length === 0}
          onClick={() =>
            writeContract({
              abi,
              address: contract.address,
              functionName: "createMonster",
              args: [name, base],
            })
          }
          className="w-48 py-2 rounded-md bg-accent text-white font-bold hover:opacity-80 disabled:opacity-50"
        >
          {isPending || isConfirming ? `Finding ${name}...` : `Let's Go`}
        </button>
      </div>
      <div></div>
    </div>
  );
}
