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

export function monEnergyToString(energy: number): string {
  if (energy <= 0) {
    return "Basically dead"; // Catch negative numbers as well
  } else if (energy > 0 && energy <= 10) {
    return "Barely awake";
  } else if (energy > 10 && energy <= 20) {
    return "Super tired";
  } else if (energy > 20 && energy <= 30) {
    return "Somewhat active";
  } else if (energy > 30 && energy <= 40) {
    return "Normal";
  } else if (energy > 40 && energy <= 60) {
    return "Energetic";
  } else if (energy > 60 && energy <= 80) {
    return "Very energetic";
  } else if (energy > 80 && energy <= 90) {
    return "Hyperactive";
  } else if (energy > 90 && energy <= 100) {
    return "Unstoppable";
  } else {
    return "Unknown"; // For values above 100 or other unexpected values
  }
}

export function monMoodToString(mood: number): string {
  if (mood <= 0) {
    return "grumpy"; // Catch negative numbers as well
  } else if (mood > 0 && mood <= 10) {
    return "irritated";
  } else if (mood > 10 && mood <= 20) {
    return "annoyed";
  } else if (mood > 20 && mood <= 30) {
    return "indifferent";
  } else if (mood > 30 && mood <= 40) {
    return "calm";
  } else if (mood > 40 && mood <= 50) {
    return "content";
  } else if (mood > 50 && mood <= 60) {
    return "pleased";
  } else if (mood > 60 && mood <= 70) {
    return "happy";
  } else if (mood > 70 && mood <= 80) {
    return "joyful";
  } else if (mood > 80 && mood <= 90) {
    return "excited";
  } else if (mood > 90 && mood <= 100) {
    return "ecstatic";
  } else {
    return "Unknowable"; // For values above 100 or other unexpected values
  }
}
