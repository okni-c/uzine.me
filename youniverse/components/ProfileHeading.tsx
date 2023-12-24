import Image from "next/image";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast'
import Textarea from 'react-expanding-textarea'

export default function ProfileHeading({ isAdmin, user_data, supabase }: any) {
    const [newPicture, setNewPicture] = useState<any>(user_data.avatar_src || '/no-picture.jpg');
    const [displayNameState, setDisplayNameState] = useState<string>(user_data.display_name || 'Type your name.');
    const [descState, setDescState] = useState<string>(user_data.description || 'Type your description.');

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

    const handleDisplayNameChange = (e: any) => {
        e.preventDefault()
        console.log(e.currentTarget.value)
        setDisplayNameState(e.currentTarget.value)
    }

    const handleDescChange = (e: any) => {
        e.preventDefault()
        setDescState(e.currentTarget.value)
    }

    const handleBlurDisplayName = async () => {
        console.log('Blurred Display name')
        console.log(displayNameState)
        const { error } = await supabase
            .from('user_sites')
            .update({ display_name: displayNameState })
            .eq('id', user_data.id)

        if (error) {
            console.error(error)
        }
    }

    const handleBlurDesc = async () => {
        console.log('Blurred description')
        const { error } = await supabase
            .from('user_sites')
            .update({ description: descState })
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
                    <p className='text-[20px] text-[#454545]'>{user_data.description}</p>
                </>
            ) : (
                <>
                    <Toaster />
                    <div className="relative group">
                        <input ref={uploadRef} onChange={handleFileUpload} type="file" accept="image/*" size={1048576} className="hidden m-0 p-0 h-0 w-0" />
                        <button className='group-hover:opacity-100 opacity-0 w-[30px] h-[30px] self-center rounded-lg absolute bottom-0 right-[-10px] z-[99999] flex items-center justify-center bg-[#FFFFFF] border border-[#4545453b] hover:bg-[#d9d9d9] delete-btn-hover transition-all duration-100 ease-linear' onClick={() => clickInput()}><img src='/upload-button.svg' className='h-[15px] opacity-0 group-hover:opacity-100' /></button>
                        <Image src={newPicture} alt={'Profile Picture'} height={184} width={184} className='rounded-full xl:h-[185px] xl:w-[185px] h-[100px] w-[100px] aspect-square object-cover' />
                    </div>
                    <Textarea className='text-[36px] md:text-[44px] font-bold tracking-tighter text-center xl:text-left xl:max-w-[350px] resize-none hover:bg-[rgba(12,12,12,0.06)] transition-colors duration-100 ease-linear focus-visible:outline-dotted focus-visible:outline-neutral-500 focus-visible:outline-2 rounded-xl pl-2 -ml-2' onChange={handleDisplayNameChange} onBlur={handleBlurDisplayName} value={displayNameState} maxLength={25} />
                    <Textarea
                        className='text-[20px] text-[#454545] text-center xl:text-left min-h-[30px] resize-none overflow-y-hidden hover:bg-[rgba(12,12,12,0.06)] transition-colors duration-100 ease-linear focus-visible:outline-dotted focus-visible:outline-neutral-500 focus-visible:outline-2 rounded-md pl-2 -ml-2'
                        onChange={handleDescChange}
                        onBlur={handleBlurDesc}
                        value={descState}
                        maxLength={60}
                    />
                </>
            )}
        </>
    )
}