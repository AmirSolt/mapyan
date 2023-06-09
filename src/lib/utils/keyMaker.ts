export function structProductKey(asin:string):string{
    return asin
}
export function structProductInfoKey(asin:string):string{
    return asin
}
export function structComparisonKey(asins:string[]):string{
    let sortedAsins = asins.sort((one, two) => (one > two ? -1 : 1));
    sortedAsins = sortedAsins.map((item)=>item.replace(" ",""))
    return sortedAsins.join('-')
}
export function destructComparisonKey(keyTable:string):string[]{
    const asins = keyTable.split("-")
    return asins
}