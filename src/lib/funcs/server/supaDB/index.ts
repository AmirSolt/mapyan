
import { createClient } from '@supabase/supabase-js'
import type {Database} from '$lib/funcs/server/supaDB/types'
import {PUBLIC_SUPABASE_URL} from '$env/static/public';
import {PRIVATE_SERVICE_ROLE_KEY_SUPABASE} from '$env/static/private';
import * as keyMaker from "$lib/utils/keyMaker"
import { error } from '@sveltejs/kit';

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
        .select('brand,image_url,key,price,rating,title,url')
        .textSearch('title', keyword,
        {type:"websearch",
        config:"english"})

    if(err){
        console.log(`Failed to getSearch SupaDB: ${err.message}`)
        return null
    }
    return data
}




export async function getComparisonPageData(comparisonKey:string)
:Promise<{comparison:Comparison | null, products:Product[]} | null>{

    const asins = keyMaker.destructComparisonKey(comparisonKey)


    let result = await Promise.all([getProducts(asins), getComparison(comparisonKey)])

    let products:Product[] | null = result[0]
    let comparison:Comparison | null = result[1]

    if(!products){
        console.log(`Failed to getComparisonPageData fetch`)
        return null
    }



    return {products, comparison}
}






export async function saveComparison(comparison:Comparison)
:Promise<boolean>{


    const {data, error:err} = await supabase()
    .from('comparisons')
    .insert({body:comparison.body, 
        key:comparison.key, 
        features:comparison.features, })
    

    if(err){
        console.log(`Failed to saveComparison SupaDB: ${err.message}`)
        return false
    }


    return true
}



async function getComparison(comparisonKey:string):Promise<Comparison | null>{
    const {data, error:err} = await supabase()
    .from('comparison')
    .select('body, key, features')
    .eq('key',comparisonKey)
    .single()

    if(err){
        console.log(`Failed to getComparison SupaDB: ${err.message}`)
        return null
    }
    return data
}

async function getProducts(asins:string[]):Promise<Product[] | null>{
    const keys = asins.map(asin=>keyMaker.structProductKey(asin))
    const {data, error:err} = await supabase()
    .from('product')
    .select('brand,image_url,key,price,rating,title,url,productInfo(description, key)')
    .in('key',keys)

    if(err){
        console.log(`Failed to getProducts SupaDB: ${err.message}`)
        return null
    }
    return data
}


async function getProduct(asin:string):Promise<Product | null>{
    const key = keyMaker.structProductKey(asin)
    const {data, error:err} = await supabase()
    .from('product')
    .select('brand,image_url,key,price,rating,title,url,productInfo(description, key)')
    .eq('key',key)
    .single()

    if(err){
        console.log(`Failed to getProduct SupaDB: ${err.message}`)
        return null
    }
    return data
}



async function getProductInfo(asin:string):Promise<ProductInfo | null>{
    const key = keyMaker.structProductInfoKey(asin)
    const {data, error:err} = await supabase()
    .from('productInfo')
    .select('description, key')
    .eq('key',key)
    .single()

    if(err){
        console.log(`Failed to getProductInfo SupaDB: ${err.message}`)
        return null
    }
    return data
}
