"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import { siteConfig } from "@/lib/site-config";

const config = getDefaultConfig({
	appName: siteConfig.title,
	appDescription: siteConfig.description,
	projectId: env.NEXT_PUBLIC_WC_ID,
	chains: [mainnet],
	ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const RootProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};
