'use client'
import toast, { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react";

export default function SignUpForm({ potentialSlug, supabase }: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleChangeEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (email !== '' && password !== '' && password.length >= 6) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    },[email, password])



    const signUp = async (formData: FormData) => {

        let email = formData.get('email') as string
        let password = formData.get('password') as string
        let origin = window.location.origin

        console.log(email, password)

        const { error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    emailRedirectTo: `${origin}/auth/callback?slug=${potentialSlug}`,
                },
            }
        )
        console.log(`${origin}/auth/callback?slug=${potentialSlug}`)

        if (error) {
            return toast.error('There was an error: ' + error)
        }
        await addSlug(email)
        return toast.success('Please check your email to finish setup.')
    }

    const addSlug = async (email: string) => {
        let slug = potentialSlug as string;

        console.log(slug)

        const newItem = {
            id: Math.random(),
            "w": 2,
            "h": 2,
            'maxH': 4,
            'maxW': 4,
            'minH': 2,
            'minW': 2,
            component_data: {
                type: 'Paragraph',
                bg_color: '#fc4903',
                props: {
                    text: 'Welcome to uzine!'
                }
            },
        };

        const { error } = await supabase
            .from('user_sites')
            .update({ slug: slug, widget_data: [newItem] })
            .eq('email', email)

        if (error) {
            return toast.error('There was an error with adding your slug: ' + error)
        }
    }

    return (
        <>
            <Toaster />
            <p className="tracking-tight text-2xl mb-12 font-semibold">Almost done!</p>
            <p className="tracking-tight text-xl mb-12 border rounded-2xl p-3 animate-bounce w-min"><span className="font-bold">uzine.me/{potentialSlug}</span></p>
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-5 text-foreground"
                action={signUp}
            >
                <div className="flex flex-col">
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className='bg-neutral-100 p-3 rounded-lg invalid:outline-red-500'
                        name="email"
                        placeholder="you@example.com"
                        type="email"
                        onChange={handleChangeEmail}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-md" htmlFor="password">
                        Password <span className="text-xs text-neutral-500">(must be 6 characters)</span>
                    </label>
                    <input
                        className='bg-neutral-100 p-3 rounded-lg invalid:outline-red-500'
                        type="password"
                        minLength={6}
                        name="password"
                        placeholder="••••••••"
                        onChange={handleChangePassword}
                        required
                    />
                </div>

                <button className="border rounded-xl shadow-inset-home-btn border-[rgba(12,12,12,0.19)] flex justify-center items-center py-3 px-4 enabled:hover:scale-105 enabled:hover:text-black text-neutral-500 duration-150 ease-linear group disabled:cursor-not-allowed disabled:opacity-50" disabled={!isValid}>
                    Sign up
                </button>
            </form>
        </>
    )
}