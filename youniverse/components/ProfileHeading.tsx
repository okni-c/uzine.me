import Image from "next/image";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast'

export default function ProfileHeading({ isAdmin, user_data, supabase }: any) {
    const [newPicture, setNewPicture] = useState<any>(user_data.avatar_src || '/profile_picture.webp')
    const prevNewPictureRef = useRef<any>(newPicture);
    const uploadRef = useRef<HTMLInputElement | null>(null)

    const clickInput = () => {
        uploadRef.current && uploadRef.current.click()
    }

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            prevNewPictureRef.current = newPicture;
            setNewPicture(URL.createObjectURL(file));

            let tempUploadPath = user_data.id + '/' + uuidv4();

            const myPromise = new Promise(async (resolve, reject) => {
                try {
                    const { data, error } = await supabase
                        .storage
                        .from('profile_pictures')
                        .upload(tempUploadPath, file);

                    if (data) {
                        console.log(data);
                        getMedia(tempUploadPath);
                        resolve(data);
                    } else {
                        setNewPicture(prevNewPictureRef.current);
                        reject(error);
                    }
                } catch (error) {
                    setNewPicture(prevNewPictureRef.current);
                    console.error(error);
                    reject(error);
                }
            });

            // Display the toast notification
            toast.promise(
                myPromise,
                {
                    loading: 'Uploading...',
                    success: (data) => `Successfully uploaded!`,
                    error: (error) => (`Error: ${error.error == 'Payload too large' ? 'File size is too large.' : error.error}`),
                },
                {
                    className: 'border border-[rgba(12,12,12,0.19)]',
                    style: {
                        minWidth: '250px',
                    },
                    success: {
                        duration: 1000,
                    },
                }
            );
        }
    };

    const getMedia = async (tempUploadPath: string) => {
        const { data, error } = await supabase
            .storage
            .from('profile_pictures')
            .getPublicUrl(tempUploadPath)

        if (data) {
            console.log(data)
            setNewPicture(data.publicUrl)
            postNewPicture(data.publicUrl)
        } else {
            console.error(error)
        }
    }

    const postNewPicture = async (avatarSrc: string) => {
        const { error } = await supabase
            .from('user_sites')
            .update({ avatar_src: avatarSrc })
            .eq('id', user_data.id)
        if (error) {
            console.error(error)
        }
    }

    return (
        <>
            {!isAdmin ? (
                <>
                    <Image src={newPicture} alt={'Profile Picture'} height={184} width={184} className='rounded-full max-w-[184px] max-h-[184px] xl:h-full xl:w-full h-[100px] w-[100px] aspect-square object-cover' />
                    <h2 className='text-[36px] md:text-[44px] font-bold tracking-tighter'>{user_data.display_name}</h2>
                    <p className='text-[20px] text-[#454545]'>{user_data.description}<br />I do cool stuff with React.</p>
                </>
            ) : (
                <>
                    <Toaster />
                    <div className="relative group">
                        <input ref={uploadRef} onChange={handleFileUpload} type="file" accept="image/*" size={1048576} className="hidden m-0 p-0 h-0 w-0" />
                        <button className='group-hover:opacity-100 opacity-0 w-[30px] h-[30px] self-center rounded-lg absolute bottom-0 right-[-10px] z-[99999] flex items-center justify-center bg-[#FFFFFF] border border-[#4545453b] hover:bg-[#d9d9d9] delete-btn-hover transition-all duration-100 ease-linear' onClick={() => clickInput()}><img src='/upload-button.svg' className='h-[15px] opacity-0 group-hover:opacity-100' /></button>
                        <Image src={newPicture} alt={'Profile Picture'} height={184} width={184} className='rounded-full xl:h-[185px] xl:w-[185px] h-[100px] w-[100px] aspect-square object-cover' />
                    </div>
                    <h2 className='text-[36px] md:text-[44px] font-bold tracking-tighter'>{user_data.display_name}</h2>
                    <p className='text-[20px] text-[#454545]'>{user_data.description}<br />I do cool stuff with React.</p>
                </>
            )}
        </>
    )
}