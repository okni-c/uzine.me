import ParagraphWDG from "../ParagraphWDG";
import ImageWDG from "../ImageWDG";

export default function ComponentLoader ({ component, hex, isAuth }: any) {
    const componentMappings: any = {
        Paragraph: ParagraphWDG,
        Image: ImageWDG,
        // Add other mappings as needed
    };

    const ComponentType = componentMappings[component.component_data.type];
    const componentProps = component.component_data.props || {};
    return <ComponentType {...componentProps} id={component.id} hex={hex} isAuth={isAuth} />;
}