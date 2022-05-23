import contract from "./abis/NFT.json";
const deployedNetwork = contract.networks["5777"];

export const address = deployedNetwork.address;
export const abi = contract.abi;
export const Byte_code = contract.deployedBytecode;