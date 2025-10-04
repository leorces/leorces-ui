export default function format(
    value?: string | number | Date | [number, number, number, number, number, number] | null
) {
    if (!value) return ''
    if (Array.isArray(value)) {
        const [year, month, day, hour, minute, second] = value
        return new Date(year, month - 1, day, hour, minute, second).toLocaleString()
    }
    return new Date(value).toLocaleString()
}