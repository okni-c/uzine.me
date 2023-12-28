import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthButton = ({ style }: any) => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUserData();
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (style === "profile") {
    return user ? (
      <button onClick={signOut} className="border rounded-xl shadow-inset-home-btn border-[rgba(12,12,12,0.19)] flex justify-center items-center py-1 px-2 w-[110px] hover:scale-105 duration-150 ease-linear group">
        <p className="text-lg text-neutral-500 tracking-tight font-semibold group-hover:text-black transition-colors duration-100 ease-linear">Logout</p>
      </button>
    ) : (
      <Link href={'/login'} className="border rounded-xl shadow-inset-home-btn border-[rgba(12,12,12,0.19)] flex justify-center items-center py-1 px-2 w-[110px] hover:scale-105 duration-150 ease-linear group">
        <p className="text-lg text-neutral-500 tracking-tight font-semibold group-hover:text-black transition-colors duration-100 ease-linear">Login</p>
      </Link>
    );
  }

  if (!style) {
    return user ? (
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <button
          onClick={signOut}
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Logout
        </button>
      </div>
    ) : (
      <Link href="/login" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Login
      </Link>
    );
  }
};

export default AuthButton;
