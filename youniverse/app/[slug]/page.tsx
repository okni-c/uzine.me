'use client'
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation"
import { useEffect } from 'react';
import { useState } from 'react';
import WidgetGrid from '@/components/WidgetGrid';

export default function Page() {
    const supabase = createClient()
    const params = useParams()
    const [stores, setStores] = useState<any>()
    
    // const items = [
    //     {
    //         "id": 0.07586734971435094,
    //         "component_data": {
    //             "type": "Paragraph"
    //         },
    //         "x": 0,
    //         "y": 0,
    //         "w": 3,
    //         'maxH': 4
    //     },
    //     {
    //         "id": 0.5167937156313944,
    //         "component_data": {
    //             "type": "Image"
    //         },
    //         "x": 3,
    //         "y": 0,
    //         'maxH': 4
    //     },
    //     {
    //         "id": 0.6024000610105686,
    //         "component_data": {
    //             "type": "Image"
    //         },
    //         "x": 0,
    //         "y": 1,
    //         "h": 2,
    //         'maxH': 4
    //     },
    //     {
    //         "id": 0.7025744087659613,
    //         "component_data": {
    //             "type": "Image"
    //         },
    //         "x": 1,
    //         "y": 1,
    //         "w": 2,
    //         "h": 2,
    //         'maxH': 4
    //     },
    //     {
    //         "id": 0.9848143362916137,
    //         "component_data": {
    //             "type": "Image"
    //         },
    //         "x": 3,
    //         "y": 1,
    //         'maxH': 4
    //     },
    //     {
    //         "id": 0.6409952662360476,
    //         "component_data": {
    //             "type": "Button"
    //         },
    //         "x": 3,
    //         "y": 2,
    //         'maxH': 4
    //     }
    // ]

    const items = [
        {
            "id": 0.07586734971435094,
            "component_data": {
                "type": "Paragraph",
                "bg_color": "#D9D9D9",
            },
            "x": 1,
            "y": 0,
            "maxH": 4
        }
    ]

    useEffect(() => {
        async function getProfileData() {
            const { data: profile } = await supabase
                .from('user_profiles')
                .select()
                .eq('slug', params.slug)
                .single()

            return setStores(profile)
        }
        getProfileData()
    }, [params.slug])

    return (
        <>
            <div className='flex md:flex-row w-full justify-between p-5 flex-col max-w-7xl'>
                {stores &&
                    <div className='flex flex-col gap-3 my-5'>
                        <h2 className='text-5xl font-black tracking-tighter'>{stores.full_name}</h2>
                        <p className='text-2xl'>{stores.description}</p>
                    </div>
                }
                <div className='flex-grow max-w-[600px]'>
                    <div className='w-full'>
                        <WidgetGrid someArray={items} />
                    </div>
                </div>
            </div>


        </>
    )

}