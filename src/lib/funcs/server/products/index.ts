






import * as supaDB from '$lib/funcs/server/supaDB/index'



export function getSearch(keyword:string):Product[]{
    return supaDB.getSearch(keyword);
}

export function getProductInfo(asin:string):ProductInfo{
    return supaDB.getProductInfo(asin)
}




