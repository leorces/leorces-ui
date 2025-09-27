export interface BpmnCanvas {
    zoom(value?: number | 'fit-viewport', position?: { x?: number; y?: number } | 'auto'): number;

    scroll(delta: { dx: number; dy: number }): void;
}