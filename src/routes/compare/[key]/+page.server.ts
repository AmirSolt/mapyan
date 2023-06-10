

import { getComparisonPageData } from '$lib/funcs/server/comparisonDB/index.js';

export const load = async ({params}) => {
    
    const {key} = params;

    let comparison:Comparison|null = null
    let products:Product[] | null = null
    let productInfos:ProductInfo[] | null = null

    const result = await getComparisonPageData(key)

    if(result){
        comparison = result.comparison
        products = result.products
    }

    return{
        comparisonKey:key,
        comparison,
        products,
    }

};