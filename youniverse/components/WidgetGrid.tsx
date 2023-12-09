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
        const [value, setValue] = useState(text || 'Default Props');

        // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //     setValue(event.target.value);
        //     let tempObj = widgetArray.filter(item => item.id == id)
        //     tempObj[0].component_data.props.text = event.target.value
        //     console.log(tempObj[0])
        //     // Need to Update the exact object in the widgetArray
        //   };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const newValue = event.target.value;
          
            // Update the state
            setValue(newValue);
          
            // Update the corresponding object in widgetArray
            // const updatedWidgetArray = widgetArray.map((item: any) =>
            //   item.id === id ? { ...item, component_data: { type: item.component_data.type, props: { text: newValue } } } : item
            // );

            // console.log(updatedWidgetArray)
          
            // Assuming you have a function to update widgetArray in the parent component
            //setTimeout(() => setWidgetArray([...updatedWidgetArray]), 10000)
          };

        return (
            <div className='w-full h-full flex flex-col relative group grid-stack-border'>
                <button onClick={() => removeWidget(id)} className='group-hover:opacity-100 opacity-0 border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md absolute top-1 right-1'>🗑️</button>
                <textarea className='font-bold text-xl break-words overscroll-x-none w-full h-full resize-none p-1 focus-visible:outline-neutral-400 rounded-lg' value={value} onChange={handleChange} />
                    
            </div>
        );
    };

    const ButtonComponent = ({ text, id }: any) => {

        return (
            <div className='w-full h-full flex flex-col relative group grid-stack-border'>
                <button onClick={() => removeWidget(id)} className='group-hover:opacity-100 opacity-0 border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md absolute top-1 right-1'>🗑️</button>
                <button className='border border-bule-500 bg-blue-300 text-white p-3 rounded-lg'>
                    Props: {text ? text : 'placeholder'}
                </button>
            </div>
        )
    }

    const ImageComponent = ({ src, id }: any) => {
        return (
            <div className='w-full h-full flex flex-col relative group rounded-2xl'>
                <button onClick={() => removeWidget(id)} className='group-hover:opacity-100 opacity-0 border border-red-500 bg-red-100 max-w-[30px] self-center rounded-md absolute top-1 right-1'>🗑️</button>
                <img src={src ? src : '/mountains_placeholder.png'} className='h-full w-full object-cover rounded-2xl' />
                <p className='bg-white py-1 px-2 rounded-md absolute bottom-4 left-4 text-sm font-semibold drop-shadow-md border border-neutral-300 group'>Caption text goes here</p>
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