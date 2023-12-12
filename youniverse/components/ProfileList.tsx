import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ProfileLink from './ProfileLink';
import { UUID } from 'crypto';



type TProfile = {
    id: UUID,
    slug: string,
    display_name: string,
    created_at: Date,
    widget_data: Object[],
    description: string
}

export default async function ProfileList() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {
        const { data: profiles } = await supabase.from("user_sites").select()
        return (
            <>
                <h2>Sites on file:</h2>
                {profiles && profiles.map((profile: TProfile) => (
                    <ProfileLink key={profile.slug} data={profile} />
                ))}

            </>
        )
    }

    if (!user) {
        return <pre>Please log in to view data.</pre>
    }
}