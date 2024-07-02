import { ethers } from "ethers";
import {
    TOKEN_ADDRESS,
} from "./Addresses";
import {
    TOKEN_ABI,
} from "./Abi";

export const initializeProvider = () => {
    if (typeof window === "undefined") {
        console.warn(
            "initializeProvider: Window object not available on the server."
        );
        return null;
    }

    const windowWithEthereum = window;

    if (windowWithEthereum.ethereum) {
        return new ethers.providers.Web3Provider(windowWithEthereum.ethereum, 'any');
    } else {
        console.warn("initializeProvider: Web3Provider not available.");
        return null;
    }
};

export const getProviderAndSigner = () => {
    const provider = initializeProvider();

    if (provider) {
        const signer = provider.getSigner();
        return { provider, signer };
    } else {
        return { provider: null, signer: null };
    }
};

export const provider = initializeProvider();
export const signer = provider ? provider.getSigner() : null;

export const tokenContract = signer
    ? new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    : null;
export const tokenContractWithSigner = tokenContract ? tokenContract.connect(signer) : null;