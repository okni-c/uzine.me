'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import SignUpForm from "@/components/SignUpForm"
import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()
    const stolen = searchParams.get('stealing')
    const [potentialSlug, setPotentialSlug] = useState<string>(stolen || '')
    const [availible, setAvailible] = useState<boolean>()
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false)

    const supabase = createClient()

    const handleChange = (e: any) => {
        e.preventDefault();
        let tempStr = e.currentTarget.value
        let sanitizedStr = tempStr.replace(/[^a-zA-Z0-9-]/g, '');
        let lowercaseStr = sanitizedStr.toLowerCase()
        setPotentialSlug(lowercaseStr.trim())
    }

    useEffect(() => {
        if (potentialSlug !== '') {
            const checkStringExists = async () => {
                try {
                    const { data, error } = await supabase
                        .from('user_sites')
                        .select()
                        .filter('slug', 'eq', potentialSlug);

                    if (error) {
                        console.error('Error fetching data:', error.message);
                        return false;
                    }

                    // If data is not empty, it means the string exists in the specified column
                    setAvailible(data.length > 0);
                } catch (error) {
                    console.error('Error:', error);
                    return false;
                }
            };
            checkStringExists()
        }
    }, [potentialSlug])

    const GrabButton = () => {
        return (
            <button onClick={() => setShowLoginForm(true)} className="animate-in shadow-inset-home-btn border border-[rgba(12,12,12,0.19)] p-4 text-center w-min whitespace-nowrap rounded-xl min-w-[120px] font-semibold tracking-tight">✅ Reserve this link</button>
        )
    }

    return (
        <div className='animate-in flex flex-row mt-28 p-5 w-full max-w-[900px] justify-around'>
            {!showLoginForm ? (
                <>
                    <div className='flex flex-col gap-10 w-full max-w-[600px] justify-start'>
                        <h1 className='text-3xl font-bold tracking-tighter'>Reserve your zine link</h1>
                        <div className='relative'>
                            <div className='absolute bg-transparent p-3 rounded-lg'>
                                uzine.me/
                            </div>
                            <input className='bg-neutral-100 p-3 rounded-lg pl-[85px]' type='text' placeholder='your-slug' maxLength={23} pattern="[A-Za-z0-9]+" onChange={handleChange} value={potentialSlug} />
                        </div>
                        {potentialSlug !== '' ? !availible ? <GrabButton /> : <p className="text-red-500">This link is already taken.</p> : null}
                    </div>
                    <div className='max-w-[400px] hidden md:flex justify-center flex-col items-center gap-4'>
                        <img className='rounded-2xl' src='/mountains_placeholder.png' />
                        <p className='text-xl font-semibold tracking-tighter'>Heres a picture while you work.</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col gap-12 w-full max-w-[350px]">
                        <div>
                            <SignUpForm potentialSlug={potentialSlug} supabase={supabase} />
                        </div>
                        <div>
                            <button onClick={() => setShowLoginForm(false)} className="border rounded-xl shadow-inset-home-btn border-[rgba(12,12,12,0.19)] flex justify-center items-center py-3 px-4 enabled:hover:scale-105 enabled:hover:text-black text-neutral-500 duration-150 ease-linear">
                                😳 Change your mind?
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}