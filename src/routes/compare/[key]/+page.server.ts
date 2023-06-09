

import {getCompare} from '$lib/server/supabase/supaDB'
import {getSBService} from '$lib/server/supabase/init'

export const load = async ({params}) => {
    
    const {key} = params;



    let sbService = getSBService()
    let {tableData, chatResponse} = await getCompare(sbService, key)

    return{
        tableKey:key,
        tableData,
        chatResponse
    }

};