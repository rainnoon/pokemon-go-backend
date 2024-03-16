"use client";

import { contracts } from "@/contracts/contracts";
import { SavingItem, savingItemTypeToString } from "@/types/savingItem";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import {
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

interface InteractionProps {
  refetchMonster: () => void;
}

export default function Interaction({ refetchMonster }: InteractionProps) {
  const [items, setItems] = useState<SavingItem[]>([]);

  const chainId = useChainId();
  const viewContract =
    contracts[chainId as keyof typeof contracts]?.ZenMonViewer ?? undefined;

  const queryClient = useQueryClient();

  const { data: newItems, queryKey } = useReadContract({
    address: viewContract && viewContract.address,
    abi: viewContract && viewContract.abi,
    functionName: "getItems",
    args: [],
  });

  // Creating vault
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const contract =
    contracts[chainId as keyof typeof contracts].ZenMonController!;
  const abi = contract.abi;

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  isConfirmed && refetchMonster();

  const purchaseBoost = async (id: number, value: bigint) => {
    if (isPending || isConfirming) {
      return;
    }
    await writeContract({
      abi,
      address: contract.address,
      functionName: "purchaseBoost",
      args: [id],
      value: value,
    });
  };

  console.log(items);

  useEffect(() => {
    if (newItems) {
      const newItemsArray = newItems.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          fee: BigInt(item.fee),
          feeToken: item.feeToken,
          feeTokenSymbol: item.feeTokenSymbol,
          lock: item.lock,
          itemType: item.itemType,
          itemBoost: item.itemBoost,
        };
      });
      setItems(newItemsArray);
    }
  }, [newItems]);

  return (
    <div className="w-full grid grid-cols-2 mt-8 gap-2 ">
      {items.map((item, index) => (
        <div
          key={index}
          className="w-full rounded-lg bg-gray-900 p-2 cursor-pointer"
          onClick={() => {
            purchaseBoost(
              item.id,
              item.feeTokenSymbol === "ETH" ? item.fee : BigInt(0)
            );
          }}
        >
          <div className="flex flex-col items-center justify-center text-sm">
            <div className="font-bold">
              {item.name} {item.feeTokenSymbol === "ETH" ? "🍣" : "🍌"}
            </div>
            <div className="">{`${savingItemTypeToString(item.itemType)} +${item.itemBoost}`}</div>
            <div className="text-xs">{`
            ${formatEther(item.fee)}
              ${item.feeTokenSymbol} (${item.lock}d)     
`}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
