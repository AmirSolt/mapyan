
import { createClient } from '@supabase/supabase-js'
import type {Database} from '$lib/funcs/server/supaDB/types'
import {PUBLIC_SUPABASE_URL} from '$env/static/public';
import {PRIVATE_SERVICE_ROLE_KEY_SUPABASE} from '$env/static/private';
import * as keyMaker from "$lib/utils/keyMaker"

// npx supabase gen types typescript --project-id "elznvxsklkeoszuzoqpg" --schema public > ./src/lib/funcs/server/supaDB/index.ts
const supabase = ()=> createClient<Database>(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
)





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


export function getComparisonPageData(comparisonKey:string)
:{comparison:Comparison, products:Product[], productInfos:ProductInfo[]}{

    const asins = keyMaker.destructComparisonKey(comparisonKey)

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
        productInfos: [],
    }
}


export function saveComparisonPage(comparison:Comparison)
:boolean{


//     const { data, error } = await supabase
//   .from('products')
//   .select(`
//     id,
//     supplier:supplier_id ( name ),
//     purchaser:purchaser_id ( name )
//   `)

    return false
}





