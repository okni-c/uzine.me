import { useEffect, createRef, useRef, useState } from 'react'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/gridstack-extra.min.css'
import { GridStack } from 'gridstack'
import React from 'react'
import { Sketch } from '@uiw/react-color'
import ComponentLoader from './widgets/utils/ComponentLoader'
import _debounce from 'lodash.debounce'

export default function WidgetGridAdmin({ widgets, supabase, slug }: any) {
    const gridRef = useRef<any>(null);
    const refs = useRef<any>([])
    const [widgetArray, setWidgetArray] = useState<any>(widgets)

    useEffect(() => {
        // Initialize GridStack when the component mounts
        gridRef.current = GridStack.init({
            column: 4,
            maxRow: 6,
            resizable: {
                handles: 'n,s,e,w'
            },
            animate: true
        });

        return () => {
            // Cleanup GridStack when the component unmounts
            gridRef.current.destroy();
        };
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

    async function saveFullGrid() {
        // This will run instantly always
        const grid = gridRef.current;
        let serializedFull = grid.save(false, true);
        console.log(serializedFull.children)

        setWidgetArray(serializedFull.children)

        // I want to debounce this await only
        const { error } = await supabase
            .from('user_sites')
            .update({ widget_data: serializedFull.children })
            .eq('slug', slug)
        return console.log(error)
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
                grid.removeWidget(refs.current[item.id].current)
                grid.addWidget(refs.current[item.id].current, item)
            }
        })

        addEvents(grid)
    }, [widgetArray])

    function addWidget(type: string) {
        if (type == 'Paragraph') {
            const newItem = {
                id: Math.random(),
                "w": 1,
                "h": 1,
                'maxH': 2,
                'maxW': 2,
                component_data: {
                    type: type,
                    bg_color: '#FFFFFF'
                },
            };
            setWidgetArray([...widgetArray, newItem]);
        } else {
            const newItem = {
                id: Math.random(),
                "w": 1,
                "h": 1,
                'maxH': 2,
                'maxW': 2,
                component_data: {
                    type: type,
                },
            };
            setWidgetArray([...widgetArray, newItem]);
        }
    }

    function removeWidget(id: any) {
        const grid = gridRef.current;
        let newArr = widgetArray.filter((item: any) => item.id !== id)
        setWidgetArray([...newArr]);
        grid.removeWidget(refs.current[id].current, false);
    }

    const Widget = ({ item }: any) => {
        const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
        const [optionsDialog, setOptionsDialog] = useState<boolean>(false);
        const [showColor, setShowColor] = useState<boolean>(false);
        const [hex, setHex] = useState<any>(item.component_data.bg_color);

        // const debouncedSaveFullGrid = _debounce(saveFullGrid, 10000);

        // const [timerRunning, setTimerRunning] = useState(false);

        // useEffect(() => {
        //     if (hex && !timerRunning) {
        //         // Start the timer only if hex is truthy and the timer is not already running
        //         const timerId = setTimeout(() => {
        //             // After 10 seconds, run the save function and stop the timer
        //             // saveFullGrid();
        //             console.log('Saving!')
        //             setTimerRunning(false);
        //         }, 10000);

        //         // Set the timerRunning state to true
        //         setTimerRunning(true);

        //         // Cleanup function to clear the timer if hex changes before the 10 seconds elapse
        //         return () => clearTimeout(timerId);
        //     }
        // }, [hex, timerRunning]);

        return (
            <>

                <button onClick={() => setDeleteDialog(true)} className='group-hover:opacity-100 opacity-0 w-[30px] h-[30px] self-center rounded-full absolute top-0 right-1 z-[99999] flex items-center justify-center bg-[#454545] hover:bg-[#d9d9d9] delete-btn-hover transition-colors duration-100 ease-linear'>
                    <svg className='h-[14px] w-[12px] fill-[#D9D9D9] transition-colors duration-100 ease-linear' height="14" viewBox="0 0 12 14" width="12" xmlns="http://www.w3.org/2000/svg"><path d="m11.5714.875004h-3.21426l-.25178-.511327c-.05334-.109317-.1355-.201272-.23724-.2655195-.10174-.064248-.21902-.0982403-.33866-.09815271h-3.0616c-.11937-.00046841-.23644.03339711-.33782.09771661-.10138.0643196-.18296.1564916-.2354.2659556l-.25178.511327h-3.214289c-.113664 0-.222673.046094-.303045.128146-.0803731.08204-.125526.19332-.125526.30935v.875c0 .11604.0451529.22732.125526.30936.080372.08205.189381.12814.303045.12814h11.142829c.1137 0 .2227-.04609.3031-.12814.0803-.08204.1255-.19332.1255-.30936v-.875c0-.11603-.0452-.22731-.1255-.30935-.0804-.082052-.1894-.128146-.3031-.128146zm-10.1464 11.894496c.02044.3332.16451.646.40287.8746.23837.2286.55311.3559.88017.3559h6.58392c.32706 0 .6418-.1273.88014-.3559.2384-.2286.3825-.5414.4029-.8746l.5679-9.2695h-10.285757z" /></svg>
                </button>
                <div className="grid-stack-item-content shadow-md !overflow-y-hidden">
                    {/* Deletion confirmation dialog */}
                    {deleteDialog ? (
                        <div className='h-full w-full bg-[#454545] flex flex-col gap-3 justify-center items-center rounded-3xl'>
                            <p className='self-center text-center text-sm text-white font-semibold'>Delete this widget?</p>
                            <div className='flex gap-5'>
                                <button onClick={() => removeWidget(item.id)} className='px-2 py-1 border border-red-400 bg-red-950 text-white rounded-lg'>Yes</button>
                                <button onClick={() => setDeleteDialog(false)} className='px-2 py-1 border border-neutral-300 bg-neutral-800 text-white rounded-lg'>No</button>
                            </div>
                        </div>
                    ) : null}
                    <ComponentLoader component={item} hex={hex} />
                </div>
                {/* Paragraph Widget Formatting */}
                {item.component_data.type === 'Paragraph' ? (
                    <>
                        <button onClick={() => optionsDialog ? setOptionsDialog(false) : setOptionsDialog(true)} className='group-hover:opacity-100 opacity-0 w-[30px] h-[30px] self-center rounded-lg absolute bottom-0 right-1 z-[99999] flex items-center justify-center bg-[#454545] hover:bg-[#d9d9d9] delete-btn-hover transition-colors duration-100 ease-linear'><svg className='h-[17px] fill-[#D9D9D9] transition-colors duration-100 ease-linear' width="17" height="5" viewBox="0 0 17 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9677 2.5C10.9677 3.88194 9.86411 5 8.5 5C7.13589 5 6.03226 3.88194 6.03226 2.5C6.03226 1.11806 7.13589 0 8.5 0C9.86411 0 10.9677 1.11806 10.9677 2.5ZM14.5323 0C13.1681 0 12.0645 1.11806 12.0645 2.5C12.0645 3.88194 13.1681 5 14.5323 5C15.8964 5 17 3.88194 17 2.5C17 1.11806 15.8964 0 14.5323 0ZM2.46774 0C1.10363 0 0 1.11806 0 2.5C0 3.88194 1.10363 5 2.46774 5C3.83185 5 4.93548 3.88194 4.93548 2.5C4.93548 1.11806 3.83185 0 2.46774 0Z" />
                        </svg>
                        </button>
                        {optionsDialog ? (
                            <>
                                <div className='bg-[#454545] rounded-xl w-[130px] h-[35px] absolute z-[999] bottom-[-40px] left-1/4 flex flex-row items-center justify-start gap-3 px-3'>
                                    <button><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.515491 12.8571H11.0559C11.1236 12.8572 11.1907 12.8439 11.2533 12.818C11.3158 12.7921 11.3727 12.7542 11.4206 12.7063C11.4684 12.6584 11.5064 12.6016 11.5323 12.539C11.5582 12.4764 11.5715 12.4094 11.5714 12.3417V10.8012C11.5715 10.7335 11.5582 10.6664 11.5323 10.6039C11.5064 10.5413 11.4684 10.4845 11.4206 10.4366C11.3727 10.3887 11.3158 10.3507 11.2533 10.3248C11.1907 10.299 11.1236 10.2857 11.0559 10.2857H0.515491C0.447781 10.2857 0.380725 10.299 0.318159 10.3248C0.255593 10.3507 0.198744 10.3887 0.150866 10.4366C0.102988 10.4845 0.0650191 10.5413 0.039132 10.6039C0.0132448 10.6664 -5.26798e-05 10.7335 1.56839e-07 10.8012V12.3417C-5.26798e-05 12.4094 0.0132448 12.4764 0.039132 12.539C0.0650191 12.6016 0.102988 12.6584 0.150866 12.7063C0.198744 12.7542 0.255593 12.7921 0.318159 12.818C0.380725 12.8439 0.447781 12.8572 0.515491 12.8571ZM0.515491 2.57143H11.0559C11.1236 2.57148 11.1907 2.55818 11.2533 2.5323C11.3158 2.50641 11.3727 2.46844 11.4206 2.42056C11.4684 2.37268 11.5064 2.31584 11.5323 2.25327C11.5582 2.1907 11.5715 2.12365 11.5714 2.05594V0.515491C11.5715 0.447781 11.5582 0.380725 11.5323 0.318159C11.5064 0.255593 11.4684 0.198744 11.4206 0.150866C11.3727 0.102988 11.3158 0.065019 11.2533 0.0391319C11.1907 0.0132448 11.1236 -5.26798e-05 11.0559 1.5684e-07H0.515491C0.447781 -5.26798e-05 0.380725 0.0132448 0.318159 0.0391319C0.255593 0.065019 0.198744 0.102988 0.150866 0.150866C0.102988 0.198744 0.0650191 0.255593 0.039132 0.318159C0.0132448 0.380725 -5.26798e-05 0.447781 1.56839e-07 0.515491V2.05594C-5.26798e-05 2.12365 0.0132448 2.1907 0.039132 2.25327C0.0650191 2.31584 0.102988 2.37268 0.150866 2.42056C0.198744 2.46844 0.255593 2.50641 0.318159 2.5323C0.380725 2.55818 0.447781 2.57148 0.515491 2.57143ZM17.3571 5.14286H0.642857C0.472361 5.14286 0.308848 5.21059 0.188289 5.33115C0.0677296 5.4517 1.56839e-07 5.61522 1.56839e-07 5.78571V7.07143C1.56839e-07 7.24192 0.0677296 7.40544 0.188289 7.526C0.308848 7.64656 0.472361 7.71429 0.642857 7.71429H17.3571C17.5276 7.71429 17.6912 7.64656 17.8117 7.526C17.9323 7.40544 18 7.24192 18 7.07143V5.78571C18 5.61522 17.9323 5.4517 17.8117 5.33115C17.6912 5.21059 17.5276 5.14286 17.3571 5.14286ZM17.3571 15.4286H0.642857C0.472361 15.4286 0.308848 15.4963 0.188289 15.6169C0.0677296 15.7374 1.56839e-07 15.9009 1.56839e-07 16.0714V17.3571C1.56839e-07 17.5276 0.0677296 17.6912 0.188289 17.8117C0.308848 17.9323 0.472361 18 0.642857 18H17.3571C17.5276 18 17.6912 17.9323 17.8117 17.8117C17.9323 17.6912 18 17.5276 18 17.3571V16.0714C18 15.9009 17.9323 15.7374 17.8117 15.6169C17.6912 15.4963 17.5276 15.4286 17.3571 15.4286Z" fill="#D9D9D9" />
                                    </svg></button>
                                    <button><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.3571 5.14286H0.642857C0.472361 5.14286 0.308848 5.21059 0.188289 5.33115C0.0677294 5.4517 0 5.61522 0 5.78571L0 7.07143C0 7.24192 0.0677294 7.40544 0.188289 7.526C0.308848 7.64656 0.472361 7.71429 0.642857 7.71429H17.3571C17.5276 7.71429 17.6912 7.64656 17.8117 7.526C17.9323 7.40544 18 7.24192 18 7.07143V5.78571C18 5.61522 17.9323 5.4517 17.8117 5.33115C17.6912 5.21059 17.5276 5.14286 17.3571 5.14286ZM17.3571 15.4286H0.642857C0.472361 15.4286 0.308848 15.4963 0.188289 15.6169C0.0677294 15.7374 0 15.9009 0 16.0714L0 17.3571C0 17.5276 0.0677294 17.6912 0.188289 17.8117C0.308848 17.9323 0.472361 18 0.642857 18H17.3571C17.5276 18 17.6912 17.9323 17.8117 17.8117C17.9323 17.6912 18 17.5276 18 17.3571V16.0714C18 15.9009 17.9323 15.7374 17.8117 15.6169C17.6912 15.4963 17.5276 15.4286 17.3571 15.4286ZM4.3433 2.57143H13.6571C13.7209 2.57143 13.7841 2.55885 13.8431 2.53441C13.902 2.50998 13.9556 2.47416 14.0007 2.42901C14.0458 2.38386 14.0816 2.33026 14.106 2.27128C14.1304 2.2123 14.1429 2.14909 14.1429 2.08527V0.485759C14.1429 0.421968 14.1303 0.358802 14.1059 0.299867C14.0815 0.240932 14.0457 0.187383 14.0006 0.142276C13.9555 0.0971688 13.9019 0.061388 13.843 0.0369763C13.7841 0.0125647 13.7209 1.6618e-07 13.6571 1.6618e-07H4.3433C4.27948 -5.2625e-05 4.21627 0.0124729 4.15729 0.0368609C4.09831 0.061249 4.04471 0.0970213 3.99956 0.142133C3.95441 0.187246 3.91859 0.240813 3.89416 0.299774C3.86972 0.358736 3.85714 0.421934 3.85714 0.485759V2.08527C3.85714 2.21421 3.90836 2.33786 3.99954 2.42904C4.09071 2.52021 4.21437 2.57143 4.3433 2.57143ZM13.6571 12.8571C13.7209 12.8571 13.7841 12.8446 13.8431 12.8201C13.902 12.7957 13.9556 12.7599 14.0007 12.7147C14.0458 12.6696 14.0816 12.616 14.106 12.557C14.1304 12.498 14.1429 12.4348 14.1429 12.371V10.7715C14.1429 10.6426 14.0917 10.5191 14.0006 10.428C13.9095 10.3369 13.7859 10.2857 13.6571 10.2857H4.3433C4.27948 10.2857 4.21627 10.2982 4.15729 10.3226C4.09831 10.347 4.04471 10.3827 3.99956 10.4278C3.95441 10.473 3.91859 10.5265 3.89416 10.5855C3.86972 10.6445 3.85714 10.7076 3.85714 10.7715V12.371C3.85714 12.4348 3.86972 12.498 3.89415 12.557C3.91858 12.616 3.95439 12.6696 3.99954 12.7147C4.04468 12.7599 4.09827 12.7957 4.15726 12.8201C4.21624 12.8446 4.27946 12.8571 4.3433 12.8571H13.6571Z" fill="#D9D9D9" />
                                    </svg></button>
                                    <button><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.642857 7.71429H17.3571C17.5276 7.71429 17.6912 7.64656 17.8117 7.526C17.9323 7.40544 18 7.24192 18 7.07143V5.78571C18 5.61522 17.9323 5.4517 17.8117 5.33115C17.6912 5.21059 17.5276 5.14286 17.3571 5.14286H0.642857C0.472361 5.14286 0.308848 5.21059 0.188289 5.33115C0.0677294 5.4517 0 5.61522 0 5.78571L0 7.07143C0 7.24192 0.0677294 7.40544 0.188289 7.526C0.308848 7.64656 0.472361 7.71429 0.642857 7.71429ZM17.3571 15.4286H0.642857C0.472361 15.4286 0.308848 15.4963 0.188289 15.6169C0.0677294 15.7374 0 15.9009 0 16.0714L0 17.3571C0 17.5276 0.0677294 17.6912 0.188289 17.8117C0.308848 17.9323 0.472361 18 0.642857 18H17.3571C17.5276 18 17.6912 17.9323 17.8117 17.8117C17.9323 17.6912 18 17.5276 18 17.3571V16.0714C18 15.9009 17.9323 15.7374 17.8117 15.6169C17.6912 15.4963 17.5276 15.4286 17.3571 15.4286ZM17.4845 1.5684e-07H6.94406C6.87635 -5.26798e-05 6.8093 0.0132448 6.74673 0.0391319C6.68416 0.065019 6.62732 0.102988 6.57944 0.150866C6.53156 0.198744 6.49359 0.255593 6.4677 0.318159C6.44182 0.380725 6.42852 0.447781 6.42857 0.515491V2.05594C6.42852 2.12365 6.44182 2.1907 6.4677 2.25327C6.49359 2.31584 6.53156 2.37268 6.57944 2.42056C6.62732 2.46844 6.68416 2.50641 6.74673 2.5323C6.8093 2.55818 6.87635 2.57148 6.94406 2.57143H17.4845C17.5522 2.57148 17.6193 2.55818 17.6818 2.5323C17.7444 2.50641 17.8013 2.46844 17.8491 2.42056C17.897 2.37268 17.935 2.31584 17.9609 2.25327C17.9868 2.1907 18.0001 2.12365 18 2.05594V0.515491C18.0001 0.447781 17.9868 0.380725 17.9609 0.318159C17.935 0.255593 17.897 0.198744 17.8491 0.150866C17.8013 0.102988 17.7444 0.065019 17.6818 0.0391319C17.6193 0.0132448 17.5522 -5.26798e-05 17.4845 1.5684e-07ZM17.4845 10.2857H6.94406C6.87635 10.2857 6.8093 10.299 6.74673 10.3248C6.68416 10.3507 6.62732 10.3887 6.57944 10.4366C6.53156 10.4845 6.49359 10.5413 6.4677 10.6039C6.44182 10.6664 6.42852 10.7335 6.42857 10.8012V12.3417C6.42852 12.4094 6.44182 12.4764 6.4677 12.539C6.49359 12.6016 6.53156 12.6584 6.57944 12.7063C6.62732 12.7542 6.68416 12.7921 6.74673 12.818C6.8093 12.8439 6.87635 12.8572 6.94406 12.8571H17.4845C17.5522 12.8572 17.6193 12.8439 17.6818 12.818C17.7444 12.7921 17.8013 12.7542 17.8491 12.7063C17.897 12.6584 17.935 12.6016 17.9609 12.539C17.9868 12.4764 18.0001 12.4094 18 12.3417V10.8012C18.0001 10.7335 17.9868 10.6664 17.9609 10.6039C17.935 10.5413 17.897 10.4845 17.8491 10.4366C17.8013 10.3887 17.7444 10.3507 17.6818 10.3248C17.6193 10.299 17.5522 10.2857 17.4845 10.2857Z" fill="#D9D9D9" />
                                    </svg>
                                    </button>
                                    <button onClick={() => setShowColor(true)}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.78418 11.7158C1.3623 12.1376 1.125 12.71 1.125 13.3069V14.9062L0 16.8749L1.125 17.9999L3.09375 16.8749H4.69301C5.28961 16.8749 5.86195 16.638 6.28383 16.2161L10.736 11.7646L6.23602 7.26462L1.78418 11.7158ZM17.0114 0.988525C15.6941 -0.329834 13.5562 -0.329834 12.2389 0.988525L9.52875 3.69872L9.0682 3.23817C8.73633 2.9063 8.2016 2.91087 7.875 3.23817L6.43465 4.67853C6.10523 5.00794 6.10523 5.54232 6.43465 5.87173L12.1279 11.5649C12.4597 11.8968 12.9945 11.8922 13.3211 11.5649L14.7614 10.1249C15.0908 9.79552 15.0908 9.26114 14.7614 8.93173L14.3009 8.47118L17.0111 5.76099C18.3298 4.44333 18.3298 2.30653 17.0114 0.988525Z" fill="#D9D9D9" />
                                    </svg></button>
                                </div>
                                {showColor ? <Sketch className='absolute z-[9999999] bottom-[-330px]'
                                    color={hex}
                                    onChange={(color) => {
                                        setHex(color.hex);
                                    }}
                                    disableAlpha={true}
                                /> : null}
                            </>
                        ) : null}
                    </>
                ) : null}
            </>
        )
    }

    return (
        <>
            <div className='flex flex-row gap-3 my-1 rounded-xl border border-[rgba(12, 12, 12, 0.50)] bg-[rgba(0, 0, 0, 0.12)] p-2 w-min items-center shadow-sm'>
                <button className='bg-green-400 rounded-lg text-sm px-4 py-1 h-[32px] text-white font-semibold'>Share</button>
                <div className='h-[20px] w-[2px] bg-neutral-200 rounded-full'></div>
                <button className='edit-tray-btn'><img src='/link-button.svg' className='h-[15px]' /></button>
                <button className='edit-tray-btn' onClick={() => addWidget('Image')}><img src='/img-button.svg' className='h-[15px]' /></button>
                <button className='edit-tray-btn' onClick={() => addWidget('Paragraph')}><img src='/text-button.svg' className='h-[15px]' /></button>
                <button className='edit-tray-btn'><img src='/map-button.svg' className='h-[15px]' /></button>
                <button className='edit-tray-btn'><img src='/github-button.svg' className='h-[20px]' /></button>
            </div>

            <div className="grid-stack">
                {widgetArray.map((item: any) => {
                    return (
                        <div
                            ref={refs.current[item.id]}
                            key={item.id}
                            className={'grid-stack-item relative group'}
                        >
                            <Widget item={item} />
                        </div>
                    )
                })}
            </div>

        </>
    )
}