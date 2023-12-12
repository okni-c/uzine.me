import ProfileList from '@/components/ProfileList'
import AuthButton from '../components/AuthButton'
import Header from '@/components/Header'

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <Header />
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-center items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <ProfileList />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase and Next.js
          </a>
        </p>
      </footer>
    </div>
  )
}
