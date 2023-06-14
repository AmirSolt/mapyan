






import * as supaDB from '$lib/funcs/server/supaDB/index'



export async function getSearch(keyword:string):Promise<Product[] | null>{
    return supaDB.getSearch(keyword);
}

export async function getProducts(keys:string[]):Promise<Product[] | null>{
    return supaDB.getProducts(keys)
}


