 interface ISaleHistory{
    itemName: string|undefined
    itemPrice: number
    itemAmount: number
    itemSubtotal:number
}

interface ISummary{
    grandTotal: number
    itemDate: string
}

export {ISaleHistory,ISummary};