import { useEffect, createRef, useRef, useState } from 'react'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/gridstack-extra.min.css'
import { GridStack } from 'gridstack'
import React from 'react'
import ComponentLoader from './widgets/utils/ComponentLoader'
import _debounce from 'lodash.debounce'

export default function WidgetGridGuest({ widgets, isAuth }: any) {
    const gridRef = useRef<any>(null);
    const refs = useRef<any>([])
    const [widgetArray] = useState<any>(widgets)

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

    useEffect(() => {
        const grid = gridRef.current;
        widgetArray.forEach((item: any) => {
            if (refs.current[item.id].current) {
                grid.removeWidget(refs.current[item.id].current)
                grid.addWidget(refs.current[item.id].current, item)
            }
        })
    }, [widgetArray])

    const Widget = ({ item }: any) => {
        return (
            <div className="grid-stack-item-content !overflow-y-hidden">
                <ComponentLoader component={item} hex={item.component_data.bg_color} isAuth={isAuth} />
            </div>
        )
    }

    return (
        <>
            <div className="grid-stack">
                {widgetArray.map((item: any) => {
                    return (
                        <div
                            ref={refs.current[item.id]}
                            key={item.id}
                            className={'grid-stack-item relative group'}
                            gs-no-resize="true"
                            gs-no-move="true"

                        >
                            <Widget item={item} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}