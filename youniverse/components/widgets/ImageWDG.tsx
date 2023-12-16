import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function ImageWDG({ src, userId, caption, supabase, isAdmin, saveFullGrid, setWidgetArray, widgetArray, id }: any) {

    const [newPicture, setNewPicture] = useState<any>(src || '/mountains_placeholder.png')
    const [captionState, setCaptionState] = useState<string>(caption || '')

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

            let tempUploadPath = userId + '/' + uuidv4();

            const myPromise = new Promise(async (resolve, reject) => {
                try {
                    const { data, error } = await supabase
                        .storage
                        .from('widget_images')
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
                    error: (error) => (`Error: ${error.error == 'Payload too large' ? 'File size is too large (> 2MB)' : error.error}`),
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
            .from('widget_images')
            .getPublicUrl(tempUploadPath)

        if (data) {
            console.log(data)
            setNewPicture(data.publicUrl)
            // Find the widget with the given id
            let thisWidgetIndex = widgetArray.findIndex((widget: any) => widget.id === id);

            if (thisWidgetIndex !== -1) {
                // Create a new object to avoid modifying the existing one
                let updatedWidget = { ...widgetArray[thisWidgetIndex] };

                // Check if the 'props' property exists
                if (!updatedWidget.component_data.props) {
                    // If it doesn't exist, create it
                    updatedWidget.component_data.props = {};
                }

                // Update the 'src' property
                updatedWidget.component_data.props.src = data.publicUrl;

                // Create a new array with the updated widget
                let updatedWidgetArray = [...widgetArray];
                updatedWidgetArray[thisWidgetIndex] = updatedWidget;

                console.log(updatedWidgetArray);

                // Update state with the new array
                setWidgetArray(updatedWidgetArray);
                setTimeout(() => saveFullGrid(), 500);

            } else {
                console.error("Widget with ID not found");
            }
        }
    }

    const saveCaption = (newCaption: string) => {
        // Find the widget with the given id
        let thisWidgetIndex = widgetArray.findIndex((widget: any) => widget.id === id);

        if (thisWidgetIndex !== -1) {
            // Create a new object to avoid modifying the existing one
            let updatedWidget = { ...widgetArray[thisWidgetIndex] };

            // Check if the 'props' property exists
            if (!updatedWidget.component_data.props) {
                // If it doesn't exist, create it
                updatedWidget.component_data.props = {};
            }

            // Update the 'src' property
            updatedWidget.component_data.props.caption = newCaption;

            // Create a new array with the updated widget
            let updatedWidgetArray = [...widgetArray];
            updatedWidgetArray[thisWidgetIndex] = updatedWidget;

            console.log(updatedWidgetArray);

            // Update state with the new array
            setWidgetArray(updatedWidgetArray);
            setTimeout(() => saveFullGrid(), 500);

        } else {
            console.error("Widget with ID not found");
        }
    }

    const handleCaptionChange = (e: any) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        setCaptionState(newValue);  
    }

    const handleBlur = () => {
        saveCaption(captionState);
    }

    return (
        <>
            {!isAdmin ? (
                <div className='w-full h-full flex flex-col relative rounded-2xl'>
                    <img src={src ? src : '/mountains_placeholder.png'} className='h-full w-full object-cover rounded-2xl pointer-events-none select-none border border-[rgba(12, 12, 12, 0.19)]' />
                    {caption ? (
                        <p className='bg-white py-1 px-2 rounded-md mt-[-45px] mx-[15px] w-auto max-w-[300px] text-ellipsis text-sm font-semibold drop-shadow-md border border-neutral-300 group max-h-[30px]'>{caption}</p>
                    ) : (
                        null
                    )}

                </div>
            ) : (
                <>
                    <Toaster />
                    <div className='w-full h-full flex flex-col relative rounded-2xl'>
                        <input ref={uploadRef} onChange={handleFileUpload} type="file" accept="image/*" size={1048576} className="hidden m-0 p-0 h-0 w-0" />
                        <button className='group-hover:opacity-100 opacity-0 w-[30px] h-[30px] self-center rounded-lg absolute top-[10px] left-[10px] z-[99999] flex items-center justify-center bg-[#FFFFFF] border border-[#4545453b] hover:bg-[#d9d9d9] delete-btn-hover transition-all duration-100 ease-linear' onClick={() => clickInput()}><img src='/upload-button.svg' className='h-[15px] opacity-0 group-hover:opacity-100' /></button>
                        <img src={newPicture} className='h-full w-full object-cover rounded-2xl pointer-events-none select-none border border-[rgba(12, 12, 12, 0.19)]' />
                        <input onChange={handleCaptionChange} onBlur={handleBlur} className={`bg-white py-1 px-2 rounded-md mt-[-45px] mx-[15px] w-auto max-w-[300px] text-ellipsis text-sm font-semibold drop-shadow-md border border-neutral-300 group hover:border-neutral-500 ${captionState === '' ? `opacity-0 group-hover:opacity-100` : null}`} value={captionState} placeholder="Type something!" />
                    </div>
                </>
            )}
        </>
    )
}