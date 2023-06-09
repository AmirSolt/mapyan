
import { createClient } from '@supabase/supabase-js'
import type {Database} from '$lib/funcs/server/supaDB/types'
import {PUBLIC_SUPABASE_URL} from '$env/static/public';
import {PRIVATE_SERVICE_ROLE_KEY_SUPABASE} from '$env/static/private';
import * as keyMaker from "$lib/utils/keyMaker"

const supabase = ()=> createClient<Database>(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
)


// npx supabase gen types typescript --project-id "elznvxsklkeoszuzoqpg" --schema public > ./src/lib/funcs/server/supaDB/index.ts



export function getSearch(keyword:string):Product[]{
    return []
}


export function getProductInfo(asin:string):ProductInfo{


    const key = keyMaker.structProductInfoKey(asin)

    return {
        desc: "",
        key: "",
    }
}


export function getComparisonPageData(selectedAsins:string[]):{comparison:Comparison, products:Product[]}{

    const key = keyMaker.structComparisonKey(selectedAsins)

//     const { data, error } = await supabase
//   .from('products')
//   .select(`
//     id,
//     supplier:supplier_id ( name ),
//     purchaser:purchaser_id ( name )
//   `)

    return {
        comparison: {key:"", body:"", features:[]},
        products: [],
    }
}





