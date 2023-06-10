
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
)





export async function getSearch(keyword:string):Promise<Product[]>{

    const {data, error:err} = await supabase()
        .from('products')
        .select('brand,image_url,key,price,rating,title,url')
        .textSearch('title', keyword,
        {type:"websearch",
        config:"english"})

    if(err){
        throw new Error(`Failed to search SupaDB: ${err}`)
    }
    


    return data
}


export async function getProductInfo(asin:string):Promise<ProductInfo>{


    const key = keyMaker.structProductInfoKey(asin)

    const {data, error:err} = await supabase()
    .from('product_infos')
    .select('description, key')
    .eq('key',asin)
    .single()

    if(err){
        throw new Error(`Failed to getProductInfo SupaDB: ${err}`)
    }

    return data
}


export async function getComparisonPageData(comparisonKey:string)
:Promise<{comparison:Comparison, products:Product[], productInfos:ProductInfo[] | null}>{

    const asins = keyMaker.destructComparisonKey(comparisonKey)

    const { data, error:err } = await supabase()
    .rpc('get_comparison_page_data', 
        { comparisonkey, asins })
    

    if(err){
        throw new Error(`Failed to getComparisonPageData SupaDB: ${err}`)
    }

    // convert


    return data
}


export async function saveComparison(comparison:Comparison)
:Promise<boolean>{


    const {data, error:err} = await supabase()
    .from('comparisons')
    .insert({body:comparison.body, 
        key:comparison.key, 
        features:comparison.features, })
    

    if(err){
        console.log(`Failed to saveComparison SupaDB: ${err}`)
        return false
    }


    return true
}





