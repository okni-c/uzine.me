import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import NoteBody from './ProfileLink';



type TProfile = {
    slug: string,
    full_name: string,
    created_date: Date,
    components: Object[],
    description: string
}

export default async function ProfileList() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {
        const { data: profiles } = await supabase.from("user_profiles").select()
        return (
            <>
                <h2>Profiles on file:</h2>
                {profiles && profiles.map((profile: TProfile) => (
                    <NoteBody key={profile.slug} data={profile} />
                ))}

            </>
        )
    }

    if (!user) {
        return <pre>Please log in to view notes.</pre>
    }
}