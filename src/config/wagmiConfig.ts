import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { fallback, http, webSocket } from "viem";
import {
  arbitrumSepolia,
  foundry,
  mainnet,
  sepolia,
  spicy,
  baseSepolia,
  auroraTestnet,
} from "viem/chains";

const walletConnectProjectId = "7b89f04f8986abd750f74d7668f82275";

// Transports must be set for each chain, for now using bounty networks, need to add

const config = getDefaultConfig({
  appName: "ZenMon",
  projectId: walletConnectProjectId,
  chains: [
    mainnet,
    ...(process.env.NODE_ENV === "development"
      ? [sepolia, foundry, spicy]
      : []),
  ],
  transports: {
    [mainnet.id]: fallback([
      webSocket(
        "wss://mainnet.infura.io/ws/v3/5ed87f32fc4d40529b2ef2caf65f8145"
      ),
      http("https://mainnet.infura.io/v3/5ed87f32fc4d40529b2ef2caf65f8145"),
    ]),
    [foundry.id]: http("http://localhost:8545"),
    [sepolia.id]: fallback([
      webSocket(
        "wss://sepolia.infura.io/ws/v3/5ed87f32fc4d40529b2ef2caf65f8145"
      ),
      http("https://sepolia.infura.io/v3/5ed87f32fc4d40529b2ef2caf65f8145"),
    ]),
    [spicy.id]: fallback([
      webSocket("wss://spicy-rpc-ws.chiliz.com/"),
      http("https://spicy-rpc.chiliz.com/"),
    ]),
    [baseSepolia.id]: fallback([
      webSocket(
        "wss://base-sepolia.g.alchemy.com/v2/3rb7yUwky2ZfI_2uh1J_HSbiE4-njJAm"
      ),
      http(
        "https://base-sepolia.g.alchemy.com/v2/3rb7yUwky2ZfI_2uh1J_HSbiE4-njJAm"
      ),
    ]),
    [arbitrumSepolia.id]: fallback([
      webSocket(
        "https://arb-sepolia.g.alchemy.com/v2/JW2E-DaJtduYdzbbebQ19WcIMdlqCG9p"
      ),
      http(
        "wss://arb-sepolia.g.alchemy.com/v2/JW2E-DaJtduYdzbbebQ19WcIMdlqCG9p"
      ),
    ]),
    [auroraTestnet.id]: fallback([
      webSocket("wss://aurora-testnet.drpc.org"),
      http("https://testnet.aurora.dev"),
    ]),
  },
  ssr: true,
});

export { config };
