import * as AI from "$lib/funcs/server/AI/index"

export function createOptionFeatures(productInfos:ProductInfo[]):string[]{
    return AI.createOptionFeatures(productInfos)
}

export function createComparison(productInfos:ProductInfo[], selectedFeatures:string[]):string{
    return AI.createComparison(productInfos, selectedFeatures)
}