
import { createClient } from '@supabase/supabase-js'
import type {Database} from '$lib/funcs/server/supaDB/types'
import {PUBLIC_SUPABASE_URL} from '$env/static/public';
import {PRIVATE_SERVICE_ROLE_KEY_SUPABASE} from '$env/static/private';


const supabase = ()=> createClient<Database>(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
)


// npx supabase gen types typescript --project-id "elznvxsklkeoszuzoqpg" --schema public > ./src/lib/funcs/server/supaDB/index.ts



export function getSearch(keyword:string):Product[]{
    return []
}


export function getProductInfo(asin:string):ProductInfo{


    const key = structProductInfoKey(asin)

    return {
        desc: "",
        key: "",
    }
}


export function getComparisonPageData(selectedAsins:string[]):{comparison:Comparison, products:Product[]}{

    const key = structComparisonKey(selectedAsins)

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




function structProductKey(asin:string):string{
    return asin
}
function structProductInfoKey(asin:string):string{
    return asin
}
function structComparisonKey(asins:string[]):string{
    const sortedAsins = asins.sort((one, two) => (one > two ? -1 : 1));
    return sortedAsins.join('-')
}
function destructTableKey(keyTable:string):string[]{
    const asins = keyTable.split("-")
    return asins
}
