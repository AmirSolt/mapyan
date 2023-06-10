






import * as supaDB from '$lib/funcs/server/supaDB/index'



export async function getSearch(keyword:string):Promise<Product[]>{
    return supaDB.getSearch(keyword);
}

export async function getProductInfo(asin:string):Promise<ProductInfo>{
    return supaDB.getProductInfo(asin)
}




