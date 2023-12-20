export default function GitHubWDG() {
    return (
        <div className='w-full h-full flex flex-col justify-between gap-4 relative rounded-2xl p-4 bg-white border border-[rgba(12, 12, 12, 0.19)]'>
            <img src={'/github-button.svg'} className='h-[40px] w-[40px] pointer-events-none select-none rounded-[8px] border-2 border-black shadow-md' />
            <p className="text-[#454545] tracking-tighter font-extrabold text-lg flex-grow">@okni-c</p>
            <button className="flex justify-center items-center border border-[#C9C9C9] bg-[#EAEAEA] font-bold text-xs rounded-md max-w-[74px] px-[21px] py-[7px] tracking-tight">Follow</button>
        </div>
    )
}