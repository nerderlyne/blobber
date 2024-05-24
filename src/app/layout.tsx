import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { RootProvider } from "./root-provider";
import { LoginButton } from "./login-button";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<RootProvider>
					<div className="flex flex-col items-center justify-center">
						<div className="p-6 w-full flex flex-row space-x-6 items-center justify-between">
							<h1 className="font-extrabold	tracking-wide text-2xl">
								BLOBBER
							</h1>
							<LoginButton />
						</div>
						<div>{children}</div>
					</div>
					<Toaster />
				</RootProvider>
			</body>
		</html>
	);
}
