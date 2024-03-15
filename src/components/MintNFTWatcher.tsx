import { contracts } from "@/contracts/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAccount, useBlockNumber, useChainId, useReadContract } from "wagmi";

// Test event watch for ERC721 Mint

export default function MintWatcher() {
  const chainId = useChainId();
  const contract =
    contracts[chainId as keyof typeof contracts]?.BasedNFT ?? undefined;

  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: owned, queryKey } = useReadContract({
    address: contract && contract.address,
    abi: contract && contract.abi,
    functionName: "getTokensForAddress",
    args: address && [address],
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [address, blockNumber, queryClient, chainId]);

  useEffect(() => {
    console.log(blockNumber);
  }, [blockNumber]);

  return (
    <div>
      {contract
        ? `Owned NFTs: ${owned?.join(", ")} ${
            owned?.length === 0 ? "None" : ""
          }`
        : "Contract Error"}
    </div>
  );
}
