import BaseProperty from "./BaseProperty.tsx";
import format from "../../../../lib/utils/DateFormatUtils.ts";

interface TimePropertyProps {
    property: any
    value: any
}

export default function TimeProperty({property, value}: TimePropertyProps) {
    return (
        <BaseProperty property={property} value={value ? format(value) : "-"}/>
    )
}