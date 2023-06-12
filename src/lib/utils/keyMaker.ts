export function structProductKey(key:string):string{
    return key
}
export function structProductInfoKey(key:string):string{
    return key
}
export function structComparisonKey(keys:string[]):string{
    let sortedkeys = keys.sort((one, two) => (one > two ? -1 : 1));
    sortedkeys = sortedkeys.map((item)=>item.replace(" ",""))
    return sortedkeys.join('-')
}
export function destructComparisonKey(keyTable:string):string[]{
    const keys = keyTable.split("-")
    return keys
}