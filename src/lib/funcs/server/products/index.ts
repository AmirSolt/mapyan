






import * as supaDB from '$lib/funcs/server/supaDB/index'



export function getSearch():Product[]{
    return supaDB.getSearch();
}

export function getProductInfo():ProductInfo{
    return supaDB.getProductInfo()
}




