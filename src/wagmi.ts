import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   connectors: [
//     injected(),
//     coinbaseWallet({ appName: "ZenMon" }),
//     walletConnect({ projectId: "7b89f04f8986abd750f74d7668f82275" }),
//   ],
//   ssr: true,
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// });

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
