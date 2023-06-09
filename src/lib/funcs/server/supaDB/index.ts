
import { createClient } from '@supabase/supabase-js'
import type {Database} from '$lib/funcs/server/supaDB/types'
import {PUBLIC_SUPABASE_URL} from '$env/static/public';
import {PRIVATE_SERVICE_ROLE_KEY_SUPABASE} from '$env/static/private';


const supabase = ()=> createClient<Database>(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
)


export function getSearch():Product[]{

    return []
}


export function getProductInfo():ProductInfo{

    return {
        desc: "",
        key: "",
    }
}


export function getComparisonPageData():{comparison:Comparison, products:Product[]}{

    return {
        comparison: {key:"", body:"", features:[]},
        products: [],
    }
}

