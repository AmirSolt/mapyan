

import { getComparisonPageData } from '$lib/funcs/server/comparisonDB/index.js';

export const load = async ({params}) => {
    
    const {key} = params;

    const {comparison, products, productInfos} = getComparisonPageData(key)

    return{
        comparisonKey:key,
        comparison,
        products,
        productInfos,
    }

};