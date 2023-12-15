'use client'
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation"
import { useEffect } from 'react';
import { useState } from 'react';
import WidgetGridAdmin from '@/components/WidgetGridAdmin';
import WidgetGridGuest from '@/components/WidgetGridGuest';
import AuthButton from '@/components/AuthButton';
import ProfileHeading from '@/components/ProfileHeading';

export default function Page() {
    const supabase = createClient()
    const params = useParams()
    const [stores, setStores] = useState<any>()
    const [isAuth, setIsAuth] = useState<any>(null)
    const [isUser, setIsUser] = useState<boolean>(false)

    useEffect(() => {
        async function getUser() {
            const { data, error } = await supabase.auth.getSession()

            return setIsAuth(data.session)
        }
        getUser()
    }, [])

    useEffect(() => {
        async function getProfileData() {
            const { data: profile } = await supabase
                .from('user_sites')
                .select()
                .eq('slug', params.slug)
                .single()

            return setStores(profile)
        }
        getProfileData()

    }, [params.slug])

    useEffect(() => {
        if (isAuth && stores) {
            if (isAuth.user.id == stores.id) {
                return setIsUser(true)
            }
        } else {
            return setIsUser(false)
        }

    }, [isAuth, stores])

    return (
        <>
            <div className='flex w-full justify-between flex-row max-w-[1400px] p-14'>
                {stores ? (
                    <div className='w-full flex xl:flex-row flex-col gap-10 justify-between relative animate-in'>
                        {isUser ? <p className='text-green-500 font-bold text-xs absolute top-0 left-0'>This is your account.</p> : <p className='text-red-500 font-bold text-xs absolute'>This is not your account.</p>}
                        <div className='flex flex-col justify-center items-center xl:items-start xl:justify-start gap-3 my-5'>
                            <ProfileHeading isAdmin={isUser} data={stores} supabase={supabase} />
                        </div>
                        <div className='max-w-[850px] w-full mx-auto'>
                            {isUser ? <WidgetGridAdmin widgets={stores.widget_data} supabase={supabase} slug={params.slug} /> : <WidgetGridGuest widgets={stores.widget_data} isUser={isUser} />}
                        </div>
                    </div>
                ) : null}
            </div>


        </>
    )

}