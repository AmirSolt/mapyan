

import * as supaDB from '$lib/funcs/server/supaDB/index'



export function getComparisonPageData(asins:string[]):{comparison:Comparison, products:Product[]}{

    return supaDB.getComparisonPageData(asins)
}
