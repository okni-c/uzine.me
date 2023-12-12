import Link from "next/link";

export default function ProfileLink({ data }: any) {

    // const [input, setInput] = useState<string>(data.title)
    // const inputRef = useRef(null)

    // const router = useRouter()

    // async function deleteNote(id: string) {
    //     const supabase = createClient()
    //     const { error } = await supabase
    //         .from('notes')
    //         .delete()
    //         .eq('id', id)
    //     router.refresh()
    // }

    // async function modifyNote(id: string) {
    //     const supabase = createClient()
    //     const { error } = await supabase
    //         .from('notes')
    //         .update({ title: input })
    //         .eq('id', id)
    //     router.refresh()
    // }

    let formattedDate = new Date(data.created_at).toLocaleString();

    return (
        <Link href={`/${data.slug}`} className='border border-emerald-400 rounded-lg px-4 py-3 my-1 flex flex-col gap-2 hover:scale-[1.02] transition-all duration-150 max-h-80 overflow-y-auto drop-shadow-lg'>
            <pre>Slug: {data.slug}</pre>
            <pre>Name: {data.display_name}</pre>
            <pre>Description: {data.description}</pre>
            <pre className='text-sm'>Created: {formattedDate}</pre>
            <pre>Widgets: {JSON.stringify(data.widget_data, null, 4)}</pre>
        </Link>
    )

}