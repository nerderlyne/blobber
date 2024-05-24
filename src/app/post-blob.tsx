"use client";
import { Reaction } from "@/components/reaction";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getKzg } from "@/lib/kzg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { parseGwei, stringToHex, toBlobs } from "viem";
import { useSendTransaction } from "wagmi";
import { z } from "zod";

const formSchema = z.object({
	file: z
		.instanceof(FileList)
		.refine((file) => file?.length == 1, "File is required:)"),
});

export const PostBlob = () => {
	const { data: hash, isPending, isError, error, sendTransaction } = useSendTransaction();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const fileRef = form.register("file");

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const fileContent = await data.file[0].text(); // txt or md file content as string
		// toast(<pre>{fileContent}</pre>);
		const kzg = await getKzg();

		sendTransaction({
			blobs: toBlobs({ data: stringToHex(fileContent) }),
			kzg,
			maxFeePerBlobGas: parseGwei("30"),
			to: "0x0000000000000000000000000000000000000000",
		});
	};

	if (isPending) {
		return <div className="flex flex-col items-center justify-center p-10">
            <Reaction status="loading" />
        </div>;
	}

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-10">
                <Reaction status="error" />
                <p>{error.message}</p>
            </div>
        );
    }

	if (hash) {
		return (
			<div className="flex flex-col items-center justify-center p-10">
                <Reaction status="success" />
				<p>
					Hash:{" "}
					<a
						href={`https://blobscan.com/tx/${hash}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{hash}
					</a>
				</p>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col space-y-3 p-10"
			>
				<FormField
					control={form.control}
					name="file"
					render={() => {
						return (
							<FormItem>
								<FormLabel>File (only .txt and .md)</FormLabel>
								<FormControl>
									<Input
										type="file"
										placeholder="file"
										{...fileRef}
										accept=".txt,.md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};
