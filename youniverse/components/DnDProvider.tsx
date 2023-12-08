'use client'

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ButtonComponent = ({ label }: any) => (
    <div className='border border-emerald-500 p-5'>
        <button className='border rounded-lg border-blue-500 p-2'>{label}</button>
    </div>
);

const TextComponent = ({ placeholder }: any) => (
    <div className='border border-emerald-500 p-5'>
        <p className='p-2'>{placeholder}</p>
    </div>
);

const componentMappings: any = {
    Button: ButtonComponent,
    Text: TextComponent,
    // Add other mappings as needed
};

const ComponentLoader = ({ component }: any) => {
    const ComponentType = componentMappings[component.type];
    const componentProps = component.props || {};

    return <ComponentType {...componentProps} />;
};

export default function DnDProvider({ data }: any) {
    const [stores, setStores] = useState(data);

    const handleDragDrop = (results: any) => {
        const { source, destination, type } = results;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if (type === 'group') {
            const reorderedStores = [...stores];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;

            const [removedStore] = reorderedStores.splice(sourceIndex, 1);
            reorderedStores.splice(destinationIndex, 0, removedStore);

            setStores(reorderedStores);
        }
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId="ROOT" type="group" direction='horizontal'>
                    {(provided) => (
                        <div className='flex items-center' {...provided.droppableProps} ref={provided.innerRef}>
                            {stores.map((component: any, index: number) => (
                                <Draggable draggableId={component.type} key={component.type} index={index}>
                                    {(provided) => (
                                        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <ComponentLoader component={component} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}