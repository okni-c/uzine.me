import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'UserName',
}

export default function SlugLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}