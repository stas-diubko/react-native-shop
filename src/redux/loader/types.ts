export enum LoaderActions {
    ON_LOADER = 'ON_LOADER',
    // DEACTIVATE_LOADER = 'DEACTIVATE_LOADER'
}

export interface LoaderState {
    isActiveLoader: boolean;
}