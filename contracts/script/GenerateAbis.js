const fs = require("fs");
const path = require("path");

const contractsDir = "./broadcast/Deploy.s.sol/";
const outDir = "./out/";

// Function to fetch ABI for a given contract name
const getAbiForContract = (contractName) => {
  const abiFilePath = path.join(
    outDir,
    `${contractName}.sol`,
    `${contractName}.json`
  );
  if (fs.existsSync(abiFilePath)) {
    const fileContent = fs.readFileSync(abiFilePath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    return jsonData.abi || "";
  }
  return "";
};

// Read all subdirectories in the contracts directory
const subDirs = fs.readdirSync(contractsDir).filter((subDir) => {
  const subDirPath = path.join(contractsDir, subDir);
  return fs.statSync(subDirPath).isDirectory() && !isNaN(Number(subDir));
});

const contracts = {};

subDirs.forEach((subDir) => {
  const filePath = path.join(contractsDir, subDir, "run-latest.json");
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    jsonData.transactions.forEach((transaction) => {
      if (
        transaction.transactionType === "CREATE" ||
        transaction.transactionType === "CREATE2"
      ) {
        const folderNumber = Number(subDir); // Convert folder name to number
        if (!contracts[folderNumber]) {
          contracts[folderNumber] = {};
        }
        const abi = getAbiForContract(transaction.contractName);
        contracts[folderNumber][transaction.contractName] = {
          address: transaction.contractAddress,
          abi: abi,
        };
      }
    });
  }
});

// Manually construct the TypeScript string
const outputLines = ["export const contracts = {"];

for (const [key, value] of Object.entries(contracts)) {
  outputLines.push(`  ${key}: {`);
  for (const [contractName, contractData] of Object.entries(value)) {
    outputLines.push(`    ${contractName}: {`);
    outputLines.push(`      address: "${contractData.address}",`);
    outputLines.push(`      abi: ${JSON.stringify(contractData.abi)}`);
    outputLines.push("    },");
  }
  outputLines.push("  },");
}

outputLines.push("} as const;");
const output = outputLines.join("\n");
fs.writeFileSync("../src/contracts/contracts.ts", output);
