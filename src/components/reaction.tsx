import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

const reactions = {
    error: '/error.gif',
    success: '/success.gif',
    loading: '/loading.gif'
}

export const Reaction = ({
    status
}: {
    status: 'error' | 'success' | 'loading' 
}) => {
    return <div className="w-[250px]">
    <AspectRatio ratio={1 / 1}>
      <Image src={reactions[status]} alt="tx status reaction" fill className="rounded-md object-cover" />
    </AspectRatio>
  </div>
}