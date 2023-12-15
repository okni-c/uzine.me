import Image from "next/image";
import { useRef, useState } from "react";

export default function ProfileHeading({ isAdmin, data, supabase }: any) {
    const [newPicture, setNewPicture] = useState<any>('/profile_picture.webp')
    const uploadRef = useRef(null)

    const uploadPicture = () => {
        uploadRef.current.click()
    }

    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // Do something with the file, for example, upload it to a server
            console.log('Selected file:', file);
            setNewPicture(URL.createObjectURL(file));

            const { data, error } = await supabase
                .storage
                .from('profile_pictures')
                .upload(file, {
                    cacheControl: '3600',
                    upsert: false
            })

            console.log(data)
        }
    };

    return (
        <>
            {!isAdmin ? (
                <>
                    <Image src={newPicture} alt={'Profile Picture'} height={184} width={184} className='rounded-full max-w-[184px] max-h-[184px] xl:h-full xl:w-full h-[100px] w-[100px] aspect-square object-cover' />
                    <h2 className='text-[36px] md:text-[44px] font-bold tracking-tighter'>{data.display_name}</h2>
                    <p className='text-[20px] text-[#454545]'>{data.description}<br />I do cool stuff with React.</p>
                </>
            ) : (
                <>
                    <div className="relative group">
                        <input ref={uploadRef} onChange={handleFileChange} type="file" accept="image/*" size={1048576} className="hidden m-0 p-0 h-0 w-0" />
                        <button className='group-hover:opacity-100 opacity-0 w-[30px] h-[30px] self-center rounded-lg absolute bottom-0 right-1 z-[99999] flex items-center justify-center bg-[#FFFFFF] border border-[#4545453b] hover:bg-[#d9d9d9] delete-btn-hover transition-all duration-100 ease-linear' onClick={() => uploadPicture()}><img src='/img-button.svg' className='h-[15px] opacity-0 group-hover:opacity-100' /></button>
                        <Image src={newPicture} alt={'Profile Picture'} height={184} width={184} className='rounded-full xl:h-[185px] xl:w-[185px] h-[100px] w-[100px] aspect-square object-cover' />
                    </div>
                    <h2 className='text-[36px] md:text-[44px] font-bold tracking-tighter'>{data.display_name}</h2>
                    <p className='text-[20px] text-[#454545]'>{data.description}<br />I do cool stuff with React.</p>
                </>
            )}
        </>
    )
}