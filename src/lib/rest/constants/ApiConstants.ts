import getBaseName from '../../utils/HostUtils.ts'

export const API_URL = import.meta.env.VITE_API_URL
    || `${window.location.protocol}//${window.location.host}${getBaseName()}`
