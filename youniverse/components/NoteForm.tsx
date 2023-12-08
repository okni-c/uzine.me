'use client'
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function NoteForm() {
    const router = useRouter()
    const supabase = createClient()


    async function addNotes(event: any) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        let title = formData.get('title')
        if (title) {
            const { error } = await supabase
                .from('notes')
                .insert({ title: title })
        }
        router.refresh()
    }

    return (
        <div className='border border-emerald-400 rounded-lg px-4 py-3 my-5 flex flex-col gap-3'>
            <p>New Note:</p>
            <form onSubmit={addNotes} className='flex flex-col'>
                <label htmlFor='newNote' className='sr-only'>Title:</label>
                <input id='newNote' name='title' placeholder='Enter note here' className='bg-black border border-emerald-200 rounded-lg p-2' />
                <button type='submit'></button>
            </form>
        </div>
    )
}