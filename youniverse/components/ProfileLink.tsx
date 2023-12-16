import Link from "next/link";
import Image from "next/image";

export default function ProfileLink({ data }: any) {

    let formattedDate = new Date(data.created_at).toLocaleString();

    return (
        <Link href={`/${data.slug}`} className='border border-emerald-400 rounded-2xl px-4 py-3 my-1 flex flex-col gap-2 hover:scale-[1.02] transition-all duration-150 max-h-80 overflow-y-auto drop-shadow-lg'>
            <div className="flex flex-row gap-5 items-center">
                <Image src={data.avatar_src} alt={'Profile Picture'} width={80} height={80} className="rounded-full object-cover aspect-square w-[80px] h-[80px]" />
                <div>
                    <h2 className="font-bold text-xl">{data.display_name}</h2>
                    <pre>{data.description}</pre>
                    <pre className='text-sm'>Created: {formattedDate}</pre>
                </div>
            </div>
        </Link>
    )

}