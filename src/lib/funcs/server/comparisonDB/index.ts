

import * as supaDB from '$lib/funcs/server/supaDB/index'



export async function getComparisonPageData(comparisonKey:string)
:Promise<{comparison:Comparison, products:Product[], productInfos:ProductInfo[] | null}>{

    return supaDB.getComparisonPageData(comparisonKey)
}


export async function saveComparison(comparison:Comparison)
:Promise<boolean>{

    return supaDB.saveComparison(comparison)
}
