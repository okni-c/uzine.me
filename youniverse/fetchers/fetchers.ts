import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const cookieStore = cookies()
const supabase = createClient(cookieStore);

export async function getAllProfiles() {
    const { data: profiles } = await supabase.from("user_profiles").select()
    return profiles
}

export async function authThisUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return user
}