// The character type
export type SavingItem = {
  id: number;
  name: string;
  fee: bigint;
  feeToken: string;
  feeTokenSymbol: string;
  lock: number;
  itemType: number;
  itemBoost: number;
};

export function savingItemTypeToString(itemType: number): string {
  if (itemType === 0) {
    return "Energy";
  } else if (itemType === 1) {
    return "Mood";
  } else {
    return "Unknown";
  }
}
