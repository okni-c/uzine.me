'use client'
import DnDProvider from '@/components/DnDProvider';
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation"
import { useEffect } from 'react';
import { useState } from 'react';
import addEvents from '@/utils/supabase/gridstack';
import WidgetGrid from '@/components/WidgetGrid';

export default function Page() {
    const supabase = createClient()
    const params = useParams()
    const [stores, setStores] = useState<any>()
    const items = [
        {
            "x": 0,
            "y": 0,
            "w": 1,
            "h": 1,
            "id": "0",
            "component_data": {
                'type': 'Paragraph',
                'props': {text: 'I am X 0'},
            }
        },
        {
            "x": 2,
            "y": 0,
            "w": 1,
            "h": 1,
            "id": "1",
            "component_data": {
                'type': 'Button',
                'props': {text: 'I am X 1'},
            }
        },
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

    // function saveFullGrid() {
    //     var grid = GridStack.init();
    //     let serializedFull = grid.save(true, true);
    //     console.log(serializedFull)
    //     setSavedGrid(serializedFull)
    // }

    return (
        <>
            <div className='flex flex-row gap-24 w-full justify-center'>
                {stores &&
                    <div className='flex flex-col gap-3 my-5'>
                        <h2 className='text-3xl font-black tracking-tighter'>{stores.full_name}</h2>
                        <p>{stores.description}</p>
                    </div>
                }
                <div>
                    {/* <DnDProvider data={stores.components} /> */}
                </div>
            </div>
            {/* <button onClick={saveFullGrid}>Save grid</button> */}
            <div className='w-full p-6'>
                <WidgetGrid someArray={items} />
            </div>
        </>
    )

}