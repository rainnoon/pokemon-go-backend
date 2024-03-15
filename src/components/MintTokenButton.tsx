import { contracts } from "@/contracts/contracts";
import { useChainId, useWriteContract } from "wagmi";

// Test button to mint an ERC20

export default function MintTokenButton() {
  const chainId = useChainId();
  const { writeContract, isPending } = useWriteContract();

  if (
    !(chainId in contracts) ||
    !contracts[chainId as keyof typeof contracts].BasedToken
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

  const contract = contracts[chainId as keyof typeof contracts].BasedToken!;
  const abi = contract.abi;

  return (
    <button
      disabled={isPending}
      onClick={() =>
        writeContract({
          abi,
          address: contract.address,
          functionName: "mint",
          args: [BigInt(1000000000000000000)],
        })
      }
      className="w-32 py-2 rounded-md bg-indigo-500 text-white font-bold hover:opacity-80 disabled:opacity-50"
    >
      Mint Token
    </button>
  );
}
