
import { getSearch } from '$lib/funcs/server/products/index.js';




export const load = async ({params}) => {
    const {keyword} = params;
    
    const products:Product[] = await getSearch(keyword);
    
    return{
        searchTerm: keyword,
        products,
    }
};