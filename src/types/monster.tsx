// The character type
export type Monster = {
  id: BigInt;
  name: string;
  base: number;
  status: number;
  live: boolean;
  energy: number;
  energyUpdated: number;
  mood: number;
  moodUpdated: number;
  accessories: number[];
};
