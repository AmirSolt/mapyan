

import * as ChatGPT from "$lib/funcs/server/chatgpt/index"









export async function createOptionFeaturesStream(products:Product[]):Promise<Function|null>{

    let AIproducts = productParser(products)
    if(! await ChatGPT.runChecks(AIproducts, null))
        return null
    return ChatGPT.getOptionFeaturesStream(AIproducts)

}

export async function createComparisonStream(products:Product[], selectedFeatures:string[]):Promise<Function|null>{

    let AIproducts = productParser(products)
    if(! await ChatGPT.runChecks(AIproducts, null))
        return null
    return ChatGPT.getComparisonStream(AIproducts, selectedFeatures)
}



export function productParser(products:Product[]):AIProduct[]{
    let r:AIProduct[] = []
    products.forEach(product=>{
        r.push({
            "key":product.key,
            "title":product.title,
            "description":product.productInfo?.description
        }as AIProduct)
    })
    return r
}