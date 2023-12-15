import { useState } from "react";

export default function ParagraphWDG({ text, id, hex, isUser }: any) {
    const [value, setValue] = useState(text || 'Default Props');

    const handleChange = (event: any) => {
        event.preventDefault();
        const newValue = event.target.value;
        // Update the state
        setValue(newValue);
    };

    return (
        <>
            {/* Are we the Author? */}
            {isUser ? (<div className='w-full h-full flex flex-col relative grid-stack-border hover:cursor-move' style={{ backgroundColor: hex }}>

                <textarea className='bg-transparent font-bold text-xl break-words overscroll-x-none w-full h-full resize-none p-1 focus-visible:outline-neutral-400 rounded-lg !overflow-y-auto' value={value} onChange={handleChange} />

            </div>
            ) :
                <div className='w-full h-full flex flex-col relative grid-stack-border' style={{ backgroundColor: hex }}>
                    <p className='bg-transparent font-bold text-xl break-words overscroll-x-none w-full h-full resize-none p-1 focus-visible:outline-neutral-400 rounded-lg !overflow-y-auto'>{value}</p>
                </div>
            }
        </>
    );
}