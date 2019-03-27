export interface PaymentInfo {
    name: string,
    path: string,
    cant: number, 
    downloadUrl: string,
    date?: string,
    verified: boolean,
    disposed?: boolean,
    note?: string,
    [key: string]: any
}

export interface PaymentDetails {
    totalCost?: number,
    paid: number,
    status: 'PENDING_VERIFICATION' | 'HAS_DEBT' | 'NO_PAYMENTS' | 'NO_DEBT'
    [key: string]: any
}
