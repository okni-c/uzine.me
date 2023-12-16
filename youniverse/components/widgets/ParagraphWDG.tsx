import { useState } from "react";

export default function ParagraphWDG({ text, id, hex, isAdmin, widgetArray, setWidgetArray, saveFullGrid }: any) {
    const [textState, setTextState] = useState<string>(text || 'Default Props');

    const handleChange = (e: any) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        // Update the state
        setTextState(newValue);
    };

    const saveText = (newText: string) => {
        // Find the widget with the given id
        let thisWidgetIndex = widgetArray.findIndex((widget: any) => widget.id === id);

        if (thisWidgetIndex !== -1) {
            // Create a new object to avoid modifying the existing one
            let updatedWidget = { ...widgetArray[thisWidgetIndex] };

            // Check if the 'props' property exists
            if (!updatedWidget.component_data.props) {
                // If it doesn't exist, create it
                updatedWidget.component_data.props = {};
            }

            // Update the 'text' property
            updatedWidget.component_data.props.text = newText;

            // Create a new array with the updated widget
            let updatedWidgetArray = [...widgetArray];
            updatedWidgetArray[thisWidgetIndex] = updatedWidget;

            console.log(updatedWidgetArray);

            // Update state with the new array
            setWidgetArray(updatedWidgetArray);
            setTimeout(() => saveFullGrid(), 500);

        } else {
            console.error("Widget with ID not found");
        }
    }

    const handleBlur = () => {
        saveText(textState);
    }

    return (
        <>
            {/* Are we the Author? */}
            {isAdmin ? (
                <div className='w-full h-full flex flex-col relative grid-stack-border hover:cursor-move' style={{ backgroundColor: hex }}>
                    <textarea className='hover:bg-[rgba(12,12,12,0.09)] bg-transparent font-bold text-xl break-words overscroll-x-none w-full h-full resize-none p-1 focus-visible:outline-neutral-400 rounded-lg !overflow-y-auto text-center' onChange={handleChange} onBlur={handleBlur} value={textState} />
                </div>
            ) :
                <div className='w-full h-full flex flex-col relative grid-stack-border !border-[rgba(12, 12, 12, 0.19)]' style={{ backgroundColor: hex }}>
                    <p className='bg-transparent font-bold text-xl break-words overscroll-x-none w-full h-full resize-none p-1 focus-visible:outline-neutral-400 rounded-lg !overflow-y-auto'>{textState}</p>
                </div>
            }
        </>
    );
}