'use client'
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation"
import { useEffect } from 'react';
import { useState } from 'react';
import WidgetGridAdmin from '@/components/WidgetGridAdmin';
import WidgetGridGuest from '@/components/WidgetGridGuest';
import ProfileHeading from '@/components/ProfileHeading';
import Link from 'next/link';
import AuthButton from '@/components/AuthButton';


export default function Page() {
    const supabase = createClient()
    const params = useParams()
    const [stores, setStores] = useState<any>()
    const [isAuth, setIsAuth] = useState<any>(null)
    const [isUser, setIsUser] = useState<boolean>(false)
    const [doesNotExist, setDNE] = useState<boolean>(false)

    useEffect(() => {
        async function getUser() {
            const { data } = await supabase.auth.getSession()

            return setIsAuth(data.session)
        }
        getUser()
    }, [])

    useEffect(() => {
        async function getProfileData() {
            const { data: profile, error } = await supabase
                .from('user_sites')
                .select()
                .eq('slug', params.slug)
                .single()

            if (error) {
                return setDNE(true)
            }

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
            {stores ? (
                <div className='max-w-[1200px] w-full xl:ml-[430px]'>
                    {/* These are absolute at xl width*/}
                    <div className='animate-in xl:fixed xl:top-3 profile-heading xl:z-50 flex flex-col justify-center items-center xl:items-start xl:justify-start gap-3 my-5 mt-14'>
                        <ProfileHeading isAdmin={isUser} user_data={stores} supabase={supabase} />
                    </div>
                    <div className="animate-in fixed bottom-5 left-[2.5rem] z-50">
                        <AuthButton style="profile" />
                    </div>
                    {/* End absolute */}
                        <div className='animate-in max-w-[820px] w-full  h-full mt-10 mx-auto'>
                            
                                {isUser ?
                                    <WidgetGridAdmin widgets={stores.widget_data} supabase={supabase} slug={params.slug} isAdmin={isUser} userId={isAuth.user.id} />
                                    :
                                    <WidgetGridGuest widgets={stores.widget_data} isUser={isUser} />
                                }
                            
                        </div>
                    
                </div>
            ) : doesNotExist ? (
                <div className='animate-in flex gap-5 flex-col justify-center items-center mx-auto mt-12'>
                    <p className='text-3xl font-bold animate-pulse border px-3 py-1 rounded-lg w-min'>？</p>
                    <p className='text-xl font-bold'>Looks like this zine doesn't exist...</p>
                    <Link href={'/signup?stealing=' + params.slug} className='hover:underline'>It's yours if you want it. 😈</Link>
                </div>
            ) : null}

        </>
    )

}