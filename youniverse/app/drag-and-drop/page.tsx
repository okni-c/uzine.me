'use client'

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Button = ({ label }: any) => <button className='border rounded-lg border-blue-500 p-2'>{label}</button>;

const Text = ({ placeholder }: any) => <input type="text" placeholder={placeholder} />;

const ComponentLoader = ({ jsonComponents }: any) => {
  return (
    <>
      {jsonComponents.components.map((component: any, index: any) => {
        const ComponentType = component.type;
        const componentProps = component.props || {};

        return <ComponentType key={index} {...componentProps} />;
      })}
    </>
  );
};

export default function Page() {
  const [stores, setStores] = useState(jsonData);

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
    <div className="mt-12">
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className='flex flex-col'>
              {stores.map((data: any, index: number) => (
                <Draggable draggableId={data.title} key={data.title} index={index}>
                  {(provided) => (
                    <div className='pl-12 my-12 border-l border-green-500' {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                      <ComponentLoader jsonComponents={data} />
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