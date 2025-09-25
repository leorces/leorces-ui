export default function format(value: any) {
    if (!value) return "";
    if (Array.isArray(value)) {
        const [year, month, day, hour, minute, second] = value;
        return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
    }
    return new Date(value).toLocaleString();
}