import { contracts } from "@/contracts/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { formatUnits } from "viem";
import { useAccount, useBlockNumber, useChainId, useReadContract } from "wagmi";

// Test event watch for ERC20 Mint

export default function MintTokenWatcher() {
  const chainId = useChainId();
  const contract =
    contracts[chainId as keyof typeof contracts]?.BasedToken ?? undefined;

  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: balance, queryKey } = useReadContract({
    address: contract && contract.address,
    abi: contract && contract.abi,
    functionName: "balanceOf",
    args: address && [address],
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [address, blockNumber, queryClient, chainId]);

  return (
    <div className="">
      {contract
        ? `Token Balance: ${formatUnits(balance ?? BigInt(0), 18)}`
        : "Contract Error"}
    </div>
  );
}
