

import * as ChatGPT from "$lib/funcs/server/chatgpt/index"









export async function createOptionFeaturesStream(products:Product[]):Promise<Function>{

    let AIproducts = productParser(products)
    await ChatGPT.runChecks(AIproducts, null)
    return ChatGPT.getOptionFeaturesStream(AIproducts)

}

export async function createComparisonStream(products:Product[], selectedFeatures:string[]):Promise<Function>{

    let AIproducts = productParser(products)
    await ChatGPT.runChecks(AIproducts, selectedFeatures)
    return ChatGPT.getComparisonStream(AIproducts, selectedFeatures)
}



export function productParser(products:Product[]):AIProduct[]{
    let r:AIProduct[] = []
    products.forEach(product=>{
        r.push({
            "title":product.title,
            "description":product.productInfo?.description
        }as AIProduct)
    })
    return r
}