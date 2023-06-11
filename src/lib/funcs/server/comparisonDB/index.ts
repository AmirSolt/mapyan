

import * as supaDB from '$lib/funcs/server/supaDB/index'



export async function getComparisonPageData(comparisonKey:string)
:Promise<{comparison:Comparison | null, products:Product[]} | null>{

    let r =  await supaDB.getComparisonPageData(comparisonKey)

    if(r && !r?.comparison)
        r.comparison = {body:"", features:[], key:""}  as Comparison


    return r
}


export async function saveComparison(comparison:Comparison)
:Promise<boolean>{

    return supaDB.saveComparison(comparison)
}
