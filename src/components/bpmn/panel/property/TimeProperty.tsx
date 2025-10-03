import BaseProperty from './BaseProperty.tsx'
import format from '../../../../lib/utils/DateFormatUtils.ts'

interface TimePropertyProps {
    property: string
    value: string | number | Date | [number, number, number, number, number, number] | null | undefined
}

export default function TimeProperty({property, value}: TimePropertyProps) {
    return (
        <BaseProperty property={property} value={value ? format(value) : '-'}/>
    )
}