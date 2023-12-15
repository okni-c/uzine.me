import ParagraphWDG from "../ParagraphWDG";
import ImageWDG from "../ImageWDG";
import GitHubWDG from "../GitHubWDG";

export default function ComponentLoader ({ component, hex, supabase, isAdmin, userId, saveFullGrid }: any) {
    const componentMappings: any = {
        Paragraph: ParagraphWDG,
        Image: ImageWDG,
        GitHub: GitHubWDG,
        // Add other mappings as needed
    };

    const ComponentType = componentMappings[component.component_data.type];
    const componentProps = component.component_data.props || {};
    return <ComponentType {...componentProps} id={component.id} userId={userId} hex={hex} supabase={supabase} isAdmin={isAdmin} saveFullGrid={saveFullGrid} />;
}