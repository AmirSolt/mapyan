

import * as ChatGPT from "$lib/funcs/server/chatgpt/index"

export function createOptionFeatures(productInfos:ProductInfo[]):string[]{
    return ChatGPT.createOptionFeatures(productInfos)
}

export function createComparison(productInfos:ProductInfo[], selectedFeatures:string[]):string{
    return ChatGPT.createComparison(productInfos, selectedFeatures)
}