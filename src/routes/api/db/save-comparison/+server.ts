import { json } from '@sveltejs/kit';
import { saveComparison } from '$lib/funcs/server/supaDB/index.js';


export const POST = async ({request}) => {

    let {comparison} = await request.json()

    await saveComparison(comparison)
    
    return json({success:true})
};