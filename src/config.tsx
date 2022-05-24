import contract from "./abis/NFT.json";
const deployedNetwork = contract.networks["5777"];
export const Byte_code = contract.bytecode;
export const address = deployedNetwork.address;
export const abi = contract.abi;
