
import { createClient } from '@supabase/supabase-js'
import type {Database} from '$lib/funcs/server/supaDB/types'
import {PUBLIC_SUPABASE_URL} from '$env/static/public';
import {PRIVATE_SERVICE_ROLE_KEY_SUPABASE} from '$env/static/private';
import * as keyMaker from "$lib/utils/keyMaker"
import { error } from '@sveltejs/kit';
import {SEARCH_COUNT_LIMIT} from "$lib/utils/config"

// to generate types
// npx supabase gen types typescript --project-id "elznvxsklkeoszuzoqpg" --schema public > ./src/lib/funcs/server/supaDB/types.ts


const supabase = ()=> createClient<Database>(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
    {auth:{persistSession:false}}
)





export async function getSearch(keyword:string):Promise<Product[] | null>{
    const {data, error:err} = await supabase()
        .from('product')
        .select('brand, image_url, key, cheapest_price, rating, rating_total, title')
        .textSearch('fts', keyword,
        {type:"websearch",
        config:"english"})
        .limit(SEARCH_COUNT_LIMIT)



    if(err){
        console.log(`Failed to getSearch SupaDB: ${err.message}`)
        return null
    }
    return data
}


export async function getProducts(keys:string[]):Promise<Product[] | null>{
    const productKeys = keys.map(key=>keyMaker.structProductKey(key))
    const {data, error:err} = await supabase()
    .from('product')
    .select('brand, image_url, key, cheapest_price, rating, rating_total, title, sellers(name,url,price), productInfo(key,description)')
    .in('key',productKeys)

    if(err){
        console.log(`Failed to getProducts SupaDB: ${err.message}`)
        return null
    }
    

    return data
}




// =============================================================================================



async function getProduct(key:string):Promise<Product | null>{
    const productKey = keyMaker.structProductKey(key)
    const {data, error:err} = await supabase()
    .from('product')
    .select('brand, image_url, key, cheapest_price, rating, rating_total, title, sellers(name,url,price), productInfo(key,description)')
    .eq('key',productKey)
    .single()

    if(err){
        console.log(`Failed to getProduct SupaDB: ${err.message}`)
        return null
    }
    return data
}



async function getProductInfo(key:string):Promise<ProductInfo | null>{
    const productKey = keyMaker.structProductInfoKey(key)
    const {data, error:err} = await supabase()
    .from('productInfo')
    .select('description, key')
    .eq('key',productKey)
    .single()

    if(err){
        console.log(`Failed to getProductInfo SupaDB: ${err.message}`)
        return null
    }
    return data
}
