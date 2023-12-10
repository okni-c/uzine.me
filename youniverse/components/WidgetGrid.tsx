import { useEffect, createRef, useRef, useState } from 'react'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/gridstack-extra.min.css'
import { GridStack } from 'gridstack'
import React from 'react'
// import addEvents from '@/utils/supabase/gridstack'

export default function WidgetGrid({ someArray }: any) {
    const gridRef = useRef<any>(null);
    const refs = useRef<any>([])
    const [widgetArray, setWidgetArray] = useState<any>(someArray)

    useEffect(() => {
        // Initialize GridStack when the component mounts
        gridRef.current = GridStack.init({
            column: 4,
            resizable: {
                handles: 'n,s,e,w'
            },
            animate: true
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
        const newItem = {
            id: Math.random(),
            "w": 1,
            "h": 1,
            'maxH': 4,
            component_data: {
                type: type,
            },
        };
        setWidgetArray([...widgetArray, newItem]);
    }

    function removeWidget(id: any) {
        const grid = gridRef.current;
        let newArr = widgetArray.filter((item: any) => item.id !== id)
        setWidgetArray([...newArr]);
        grid.removeWidget(refs.current[id].current, false);
    }


    const ParagraphComponent = ({ text, id }: any) => {
        const [value, setValue] = useState(text || 'Default Props');

        const handleChange = (event: any) => {
            event.preventDefault();
            const newValue = event.target.value;
            // Update the state
            setValue(newValue);
        };

        return (
            <div className='w-full h-full flex flex-col relative grid-stack-border'>
                <textarea className='font-bold text-xl break-words overscroll-x-none w-full h-full resize-none p-1 focus-visible:outline-neutral-400 rounded-lg' value={value} onChange={handleChange} />

            </div>
        );
    };

    const TestComponent = ({ text, id }: any) => {

        return (
            <div className='w-full h-full flex flex-col relative grid-stack-border'>
                <p>Hello test</p>
            </div>
        );
    };

    const ButtonComponent = ({ text, id }: any) => {

        return (
            <div className='w-full h-full flex flex-col relative grid-stack-border'>
                <button className='border border-bule-500 bg-blue-300 text-white p-3 rounded-lg'>
                    Props: {text ? text : 'placeholder'}
                </button>
            </div>
        )
    }

    const ImageComponent = ({ src, id }: any) => {
        return (
            <div className='w-full h-full flex flex-col relative rounded-2xl'>
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
            Test: TestComponent,
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
                            className={'grid-stack-item relative group'}
                        >
                            <button onClick={() => removeWidget(item.id)} className='group-hover:opacity-100 opacity-0 w-[30px] h-[30px] self-center rounded-full absolute top-0 right-1 z-[99999] flex items-center justify-center bg-[#454545] hover:bg-[#d9d9d9] delete-btn-hover transition-colors duration-100 ease-linear'>
                                <svg className='h-[14px] w-[12px] fill-[#D9D9D9] transition-colors duration-100 ease-linear' height="14" viewBox="0 0 12 14" width="12" xmlns="http://www.w3.org/2000/svg"><path d="m11.5714.875004h-3.21426l-.25178-.511327c-.05334-.109317-.1355-.201272-.23724-.2655195-.10174-.064248-.21902-.0982403-.33866-.09815271h-3.0616c-.11937-.00046841-.23644.03339711-.33782.09771661-.10138.0643196-.18296.1564916-.2354.2659556l-.25178.511327h-3.214289c-.113664 0-.222673.046094-.303045.128146-.0803731.08204-.125526.19332-.125526.30935v.875c0 .11604.0451529.22732.125526.30936.080372.08205.189381.12814.303045.12814h11.142829c.1137 0 .2227-.04609.3031-.12814.0803-.08204.1255-.19332.1255-.30936v-.875c0-.11603-.0452-.22731-.1255-.30935-.0804-.082052-.1894-.128146-.3031-.128146zm-10.1464 11.894496c.02044.3332.16451.646.40287.8746.23837.2286.55311.3559.88017.3559h6.58392c.32706 0 .6418-.1273.88014-.3559.2384-.2286.3825-.5414.4029-.8746l.5679-9.2695h-10.285757z"/></svg>
                            </button>
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