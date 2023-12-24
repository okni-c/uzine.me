import toast, { Toaster } from "react-hot-toast"

export default function SignUpForm({ potentialSlug, supabase }: any) {
    const signUp = async (formData: FormData) => {

        let email = formData.get('email') as string
        let password = formData.get('password') as string
        const origin = window.location.origin

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

        if (error) {
            return toast.error('There was an error: ' + error)
        }
        addSlug(email)
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
            .eq('email', email )

        if (error) {
            return toast.error('There was an error with adding your slug: ' + error)
        }

        return toast.success('Your slug has been added.')
    }

    return (
        <>
            <Toaster />
            <p className="font-mono">Reserving uzine.me/{potentialSlug}</p>
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={signUp}
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button className="bg-green-700 rounded-md px-4 py-2 text-white mb-2">
                    Sign up
                </button>
            </form>
        </>
    )
}