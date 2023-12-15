'use client'
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation"
import { useEffect } from 'react';
import { useState } from 'react';
import WidgetGridAdmin from '@/components/WidgetGridAdmin';
import WidgetGridGuest from '@/components/WidgetGridGuest';
import AuthButton from '@/components/AuthButton';
import Image from 'next/image';

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
        // if (isAuth.session.user.email === stores.email) {

        // }

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
            <div className='flex md:flex-row w-full justify-between flex-row max-w-[1600px] p-14'>
                {stores ? (
                    <div className='w-full flex gap-10 justify-between relative animate-in'>
                        {isUser ? <p className='text-green-500 font-bold text-xs absolute top-0 left-0'>This is your account.</p> : <p className='text-red-500 font-bold text-xs absolute'>This is not your account.</p>}
                        <div className='flex flex-col gap-3 my-5'>
                            <Image src={'/profile_picture.webp'} alt={'Profile Picture'} height={184} width={184} className='rounded-full max-w-[184px] max-h-[184px] aspect-square object-cover' />
                            <h2 className='text-[36px] md:text-[44px] font-bold tracking-tighter'>Kevin Yatsinko</h2>
                            <p className='text-[20px] text-[#454545]'>{stores.description}<br />I do cool stuff with React.</p>
                        </div>
                        <div className='max-w-[850px] w-full'>
                            {isUser ? <WidgetGridAdmin widgets={stores.widget_data} supabase={supabase} slug={params.slug} /> : <WidgetGridGuest widgets={stores.widget_data} isUser={isUser} />}
                        </div>
                    </div>
                ) : null}
            </div>


        </>
    )

}