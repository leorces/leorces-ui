import BaseProperty from "@/components/bpmn/panel/property/BaseProperty";
import format from "@/lib/utils/DateFormatUtils";

interface TimePropertyProps {
    property: any
    value: any
}

export default function TimeProperty({property, value}: TimePropertyProps) {
    return (
        <BaseProperty property={property} value={value ? format(value) : "-"}/>
    )
}