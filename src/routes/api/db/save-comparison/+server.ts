import { json } from '@sveltejs/kit';
import { saveComparisonPage } from '$lib/funcs/server/supaDB/index.js';


export const POST = async ({request}) => {

    let {comparison} = await request.json()

    await saveComparisonPage(comparison)
    
    return json({success:true})
};