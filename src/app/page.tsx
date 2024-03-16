"use client";

import Interaction from "@/components/InteractionView";
import PhaserGame from "@/components/PhaserGame";
import ViewConnected from "@/components/ViewConnected";
import ViewDisconnected from "@/components/ViewDisconnected";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <ViewConnected />;
  }

  return <ViewDisconnected />;
}
