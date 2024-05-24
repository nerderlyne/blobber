import { loadKZG } from "kzg-wasm";
import { setupKzg } from "viem";
import { mainnetTrustedSetupPath } from "viem/node";

export const getKzg = async () => {
	return await loadKZG();
};
// export const kzg = setupKzg(wKzg, mainnetTrustedSetupPath)
