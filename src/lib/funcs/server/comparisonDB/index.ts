

import * as supaDB from '$lib/funcs/server/supaDB/index'



export function getComparisonPageData():{comparison:Comparison, products:Product[]}{

    return supaDB.getComparisonPageData()
}
