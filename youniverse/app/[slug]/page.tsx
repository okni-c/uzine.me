'use client'
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation"
import { useEffect } from 'react';
import { useState } from 'react';
import WidgetGridAdmin from '@/components/WidgetGridAdmin';
import WidgetGridGuest from '@/components/WidgetGridGuest';
import AuthButton from '@/components/AuthButton';

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
            <div className='flex md:flex-row w-full justify-between p-5 flex-col max-w-7xl'>
                {stores ? (
                    <div className='w-full flex flex-col gap-5'>
                        {isUser ? <p className='text-green-500 font-bold text-2xl mb-24'>This is your account.</p> : <p className='text-red-500 font-bold text-2xl mb-24'>This is not your account.</p>}
                        <div className='flex flex-col gap-3 my-5'>
                            <h2 className='text-5xl font-black tracking-tighter'>{stores.display_name}</h2>
                            <p className='text-2xl'>{stores.description}</p>
                        </div>
                        {/* <pre>Session Cookie: {JSON.stringify(isAuth, null, 6)}</pre>
                        <pre>Stores: {JSON.stringify(stores, null, 6)}</pre> */}
                        {isUser ? <WidgetGridAdmin widgets={stores.widget_data} supabase={supabase} slug={params.slug} /> : <WidgetGridGuest widgets={stores.widget_data} isAuth={isAuth} />}
                    </div>
                ) : null}
            </div>


        </>
    )

}