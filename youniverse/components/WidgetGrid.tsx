import { useEffect, createRef, useRef, useState } from 'react'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/gridstack-extra.min.css'
import { GridStack } from 'gridstack'
import React from 'react'
// import addEvents from '@/utils/supabase/gridstack'

export default function WidgetGrid({ someArray }: any) {
    const gridRef = useRef(null);
    const refs = useRef([])
    const [widgetArray, setWidgetArray] = useState<any>(someArray)

    useEffect(() => {
        // Initialize GridStack when the component mounts
        gridRef.current = GridStack.init({
            column: 4
        });

        // return () => {
        //     // Cleanup GridStack when the component unmounts
        //     gridRef.current.destroy();
        // };
    }, []);

    if (Object.keys(refs.current).length !== widgetArray.length) {
        //console.log('Running the if');

        // Clear existing refs
        refs.current = [];

        // Recreate refs for all widgets in the updated widgetArray
        widgetArray.forEach(({ id }: any) => {
            refs.current[id] = createRef();
        });
    }

    function saveFullGrid() {
        const grid = gridRef.current;
        let serializedFull = grid.save(false, true);
        console.log(serializedFull.children)

        setWidgetArray(serializedFull.children)

    }

    function addEvents(grid: any) {
        grid.on('resizestop', function () {
            saveFullGrid()
        }).on('dragstop', function () {
            saveFullGrid()
        });
    }

    useEffect(() => {
        const grid = gridRef.current;
        widgetArray.forEach((item: any) => {
            if (refs.current[item.id].current) {
                //console.log('running useeffect')
                grid.removeWidget(refs.current[item.id].current)
                grid.addWidget(refs.current[item.id].current, item)
            }
        })

        addEvents(grid)
    }, [widgetArray])

    function addWidget(type: string) {
        //const id = widgetArray.length; // Use the length of the existing array as the new id
        const newItem = {
            id: Math.random(),
            "w": 1,
            "h": 1,
            component_data: {
                type: type,
            },
        };
        setWidgetArray([...widgetArray, newItem]);
    }

    function removeWidget(id: any) {
        const grid = gridRef.current;
        let newArr = widgetArray.filter(item => item.id !== id)
        //console.log('removed from state', newArr)

        setWidgetArray([...newArr]);
        grid.removeWidget(refs.current[id].current, false);
    }


    const ParagraphComponent = ({ text, id }: any) => {

        return (
            <div className='w-full h-full flex flex-col relative group grid-stack-border'>
                <button onClick={() => removeWidget(id)} className='group-hover:opacity-100 opacity-0 border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md absolute top-0 right-0'>🗑️</button>
                <p className='font-bold text-xl'>
                    Props: {text ? text : 'placeholder'}
                </p>
            </div>
        );
    };

    const ButtonComponent = ({ text, id }: any) => {

        return (
            <div className='w-full h-full flex flex-col relative group grid-stack-border'>
                <button onClick={() => removeWidget(id)} className='group-hover:opacity-100 opacity-0 border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md absolute top-0 right-0'>🗑️</button>
                <button className='border border-bule-500 bg-blue-300 text-white p-3 rounded-lg'>
                    Props: {text ? text : 'placeholder'}
                </button>
            </div>
        )
    }

    const ImageComponent = ({ src, id }: any) => {
        return (
            <div className='w-full h-full flex flex-col relative group grid-stack-border'>
                <button onClick={() => removeWidget(id)} className='group-hover:opacity-100 opacity-0 border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md absolute top-0 right-0'>🗑️</button>
                <img src={src ? src : 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'} className='h-full w-full object-cover rounded-lg' />
            </div>
        )
    }

    const ComponentLoader = ({ component }: any) => {
        const componentMappings: any = {
            Paragraph: ParagraphComponent,
            Button: ButtonComponent,
            Image: ImageComponent,
            // Add other mappings as needed
        };

        const ComponentType = componentMappings[component.component_data.type];
        const componentProps = component.component_data.props || {};
        return <ComponentType {...componentProps} id={component.id} />;
    };

    return (
        <>
            <div className='flex flex-row gap-5 my-12'>
                <button onClick={saveFullGrid} className='border-4 border-black p-3 rounded-xl'>Save Full Grid</button>
                <button onClick={() => addWidget('Paragraph')} className='border-4 border-black p-3 rounded-xl'>Add Paragraph</button>
                <button onClick={() => addWidget('Button')} className='border-4 border-black p-3 rounded-xl'>Add Button</button>
                <button onClick={() => addWidget('Image')} className='border-4 border-black p-3 rounded-xl'>Add Image</button>
            </div>
            <div className="grid-stack">
                {widgetArray.map((item: any) => {
                    return (
                        <div
                            ref={refs.current[item.id]}
                            key={item.id}
                            className={'grid-stack-item'}
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