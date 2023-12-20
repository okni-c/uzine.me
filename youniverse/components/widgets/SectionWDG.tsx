import { useState } from "react"

export default function SectionWDG({ widgetArray, id, isAdmin, setWidgetArray, saveFullGrid, section_text }: any) {

    const [textState, setTextState] = useState<string>(section_text || '');

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
            updatedWidget.component_data.props.section_text = newText;

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
            {!isAdmin ? (
                <div className="w-full h-full flex justify-start items-center bg-white px-2">
                    <h3 className="font-extrabold tracking-tighter text-2xl">Section Title</h3>
                </div>
            ) : (
                <div className="w-full h-full flex justify-start items-center bg-white hover:bg-neutral-100 transition-colors duration-100 ease-linear cursor-move px-2">
                    <input onChange={handleChange} onBlur={handleBlur} value={textState} placeholder="New title" className="font-extrabold tracking-tighter text-2xl cursor-text rounded-md bg-transparent hover:bg-white focus-visible:outline-transparent focus-visible:bg-white" />
                </div>
            )}
        </>
    )
}