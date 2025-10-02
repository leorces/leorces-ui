import type {ErrorItem} from "../../../../lib/model/definition/ErrorItem.ts";
import BaseProperty from "./BaseProperty.tsx";

interface ErrorPropertyProps {
    error: ErrorItem
}

export default function ErrorProperty({error}: ErrorPropertyProps) {
    return (
        <>
            <BaseProperty property="Name" value={error.name}/>
            <BaseProperty property="Code" value={error.errorCode}/>
            {error.message && <BaseProperty property="Message" value={error.message}/>}
        </>
    )
}
