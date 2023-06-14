

import { getProducts } from '$lib/funcs/server/products/index.js';
import { destructComparisonKey } from '$lib/utils/keyMaker.js';

export const load = async ({params}) => {
    
    const {comparisonKey} = params;

    const  productKeys = destructComparisonKey(comparisonKey)

    let products:Product[]=[];

    products = await getProducts(productKeys) || []


    return{
        products,
    }

};