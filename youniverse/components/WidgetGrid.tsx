import { useEffect, createRef, useRef, useState } from 'react'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import React from 'react'
import addEvents from '@/utils/supabase/gridstack'

export default function WidgetGrid({ someArray }: any) {
    const gridRef = useRef(null);
    const refs = useRef({})
    const [savedGrid, setSavedGrid] = useState<any>()
    const [widgetArray, setWidgetArray] = useState<any>(someArray)

    useEffect(() => {
        // Initialize GridStack when the component mounts
        gridRef.current = GridStack.init();

        // return () => {
        //     // Cleanup GridStack when the component unmounts
        //     gridRef.current.destroy();
        // };
    }, []);

    if (Object.keys(refs.current).length !== widgetArray.length) {
        widgetArray.forEach(({ id }: any) => {
            refs.current[id] = refs.current[id] || createRef()
        })
    }

    useEffect(() => {
        console.log("Running")
        const grid = gridRef.current;
        widgetArray.forEach((item: any) => {
            grid.removeWidget(refs.current[item.id].current)
            grid.addWidget(refs.current[item.id].current, item)
        })

        //addEvents(grid)
    }, [widgetArray])

    function saveFullGrid() {
        const grid = gridRef.current;
        let serializedFull = grid.save(false, true);
        setSavedGrid(serializedFull)
        console.log(savedGrid)
    }

    function generateUUID() {
        return Math.random()
    }

    function addWidget(type: string) {
        const id = generateUUID();
        const newItem = {
            id: id,
            "w": 3,
            "h": 3,
            component_data: {
                type: type,
            }
        };
        setWidgetArray([...widgetArray, newItem])
    }

    function removeWidget(id: any) {
        const grid = gridRef.current;
        const widgetRef = refs.current[id];

        // Remove the widget from the grid
        grid.removeWidget(widgetRef.current);

        // // Remove the reference from the refs object
        // const updatedRefs = { ...refs.current };
        // delete updatedRefs[id];
        // refs.current = updatedRefs;

        // // Create a new array with the widget removed
        // const updatedWidgetArray = widgetArray.filter(item => item.id !== id);

        // // Set the new array as the state
        // setWidgetArray(updatedWidgetArray);
    }



    const ParagraphComponent = ({ text, id }: any) => {

        return (
            <div className='w-full h-full flex flex-col'>
                <button onClick={() => removeWidget(id)} className='border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md'>🗑️</button>
                <p className='font-bold text-xl'>
                    Props: {text ? text : 'placeholder'}
                </p>
            </div>
        );
    };

    const ButtonComponent = ({ text, id }: any) => {

        return (
            <div className='w-full h-full flex flex-col'>
                <button onClick={() => removeWidget(id)} className='border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md'>🗑️</button>
                <button className='border border-bule-500 bg-blue-300 text-white p-3 rounded-lg'>
                    Props: {text ? text : 'placeholder'}
                </button>
            </div>
        )
    }

    const ComponentLoader = ({ component }: any) => {
        const componentMappings: any = {
            Paragraph: ParagraphComponent,
            Button: ButtonComponent
            // Add other mappings as needed
        };

        const ComponentType = componentMappings[component.component_data.type];
        const componentProps = component.component_data.props || {};
        console.log(component.id)
        return <ComponentType {...componentProps} id={component.id} />;
    };

    return (
        <>
            <div className='flex flex-row gap-5 my-12'>
                <button onClick={saveFullGrid} className='border-4 border-black p-3 rounded-xl'>Save the grid</button>
                <button onClick={() => addWidget('Paragraph')} className='border-4 border-black p-3 rounded-xl'>Add Paragraph</button>
                <button onClick={() => addWidget('Button')} className='border-4 border-black p-3 rounded-xl'>Add Button</button>
            </div>
            <div className="grid-stack">
                {widgetArray.map((item: any) => {
                    return (
                        <div
                            ref={refs.current[item.id]}
                            key={item.id}
                            className={'grid-stack-item'}
                            gs-w="12"
                        >
                            <div className="grid-stack-item-content">
                                <ComponentLoader component={item} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}