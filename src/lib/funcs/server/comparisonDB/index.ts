

import * as supaDB from '$lib/funcs/server/supaDB/index'



export async function getComparisonPageData(comparisonKey:string)
:Promise<{comparison:Comparison|null, products:Product[]} | null>{

    return await supaDB.getComparisonPageData(comparisonKey)
}


export async function saveComparison(comparison:Comparison)
:Promise<boolean>{

    return supaDB.saveComparison(comparison)
}
