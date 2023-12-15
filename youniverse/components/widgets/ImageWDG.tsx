export default function ImageWDG ({ src, id, caption }: any) {
    return (
        <div className='w-full h-full flex flex-col relative rounded-2xl'>
            <img src={src ? src : '/mountains_placeholder.png'} className='h-full w-full object-cover rounded-2xl pointer-events-none select-none border border-[rgba(12, 12, 12, 0.19)]' />
            <p className='bg-white py-1 px-2 rounded-md absolute bottom-4 left-4 text-sm font-semibold drop-shadow-md border border-neutral-300 group'>Caption text goes here</p>
        </div>
    )
}