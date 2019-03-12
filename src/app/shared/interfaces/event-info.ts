export interface EventInfo {
    eventId: string,
    title: string,
    description: string,
    isEnable: boolean,
    place: boolean,
    type?: 'Campamento Regional' | 'Campamento Nacional' | 'Campamento Estatal',
    date: any,
    [key: string]: any
}