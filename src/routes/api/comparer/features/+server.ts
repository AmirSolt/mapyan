
import * as AI from '$lib/funcs/server/AI/index'


export const POST = async ({request}) => {

    let {products} = await request.json()

    if(products.length <= 0 ){
        return new Response("Products empty",{status:400})
    }


    let streamFunction = await AI.createOptionFeaturesStream(products)
    if(!streamFunction){
        return new Response("AI response Failed",{status:400})
    }
    let response = await streamFunction()



    
    return new Response(response.body, {
        headers: {
            'Content-Type': 'text/event-stream'
        }
    });
};




