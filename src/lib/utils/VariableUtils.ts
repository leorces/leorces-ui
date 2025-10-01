export function convertStringToValue(value: string): any {
    if (!value) return null;

    const trimmed = value.trim();

    // boolean
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;

    // number
    const num = Number(trimmed);
    if (!isNaN(num) && trimmed !== '') return num;

    // JSON object or array
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        try {
            return JSON.parse(trimmed);
        } catch {
        }
    }

    return value;
}
