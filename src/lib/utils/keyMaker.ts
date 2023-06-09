export function structProductKey(asin:string):string{
    return asin
}
export function structProductInfoKey(asin:string):string{
    return asin
}
export function structComparisonKey(asins:string[]):string{
    const sortedAsins = asins.sort((one, two) => (one > two ? -1 : 1));
    return sortedAsins.join('-')
}
export function destructTableKey(keyTable:string):string[]{
    const asins = keyTable.split("-")
    return asins
}