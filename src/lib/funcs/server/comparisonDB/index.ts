

import * as supaDB from '$lib/funcs/server/supaDB/index'



export function getComparisonPageData(comparisonKey:string)
:{comparison:Comparison, products:Product[], productInfos:ProductInfo[] | null}{

    return supaDB.getComparisonPageData(comparisonKey)
}
