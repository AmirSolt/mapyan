

import { getComparisonPageData } from '$lib/funcs/server/comparisonDB/index.js';

export const load = async ({params}) => {
    
    const {key} = params;

    let comparison:Comparison = {body:"", features:[], key:""}  as Comparison;
    let products:Product[]=[];

    const result = await getComparisonPageData(key)

    if(result){
        if(result.comparison)
            comparison = result.comparison
        products = result.products
    }

    return{
        comparisonKey:key,
        comparison,
        products,
    }

};