import Image from "next/image"

export default function Header() {
  return (
    <div className="flex flex-col gap-2 items-center my-12">
      <div className="flex flex-col items-center gap-3">
        <h1 className="sr-only">Widget Alpha</h1>
        <Image src={'/widget.png'} alt={''} width={20} height={20} className="animate-spin antialiased duration-[2000]" />
        <p className="text-3xl md:text-4xl tracking-tighter mx-auto max-w-xl font-extrabold text-center text-neutral-600 antialiased">
          <span className="text-emerald-500 font-black">you</span>niverse <span className="font-mono text-sm align-super">Alpha</span>
        </p>
      </div>
      <hr className="h-[5px] w-full rounded-xl border-0 bg-neutral-500" />
    </div>
  )
}
