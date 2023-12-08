export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center my-12">
      {/* <div className="flex gap-8 justify-center items-center my-4">
        <span className="border-l rotate-45 h-6" />
        <a href="/">
          Back to homepage
        </a>
        <span className="border-l rotate-45 h-6" />
      </div> */}
      <h1 className="sr-only">Bento Clone</h1>
      <p className="text-3xl lg:text-4xl tracking-tighter mx-auto max-w-xl font-bold text-center text-neutral-500">
      Bento Clone
      </p>

      <hr className="h-2 my-8 w-full rounded-xl bg-gray-200 border-0 dark:bg-neutral-500" />
      
    </div>
  )
}
