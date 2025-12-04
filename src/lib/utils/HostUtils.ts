export default function getBaseName(): string {
    const path = window.location.pathname
    const knownRoutes = ['definitions', 'processes']
    const segments = path.split('/').filter(Boolean)
    const index = segments.findIndex(s => knownRoutes.includes(s))

    if (index === -1 || index === 0) {
        return ''
    }

    const baseSegments = segments.slice(0, index)

    return '/' + baseSegments.join('/')
}
