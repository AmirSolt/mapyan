
import { PRIVATE_OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { getTokens } from './tokenizer'
import { getFeaturesInstructions, getComparisonInstructions, TEMPRETURE } from './config'
import {error} from '@sveltejs/kit'




export function getOptionFeaturesStream(products:AIProduct[]):Function{
    let messages = getMessages(getFeaturesInstructions(products),products,null)
    return getChatGPTResponse(messages)
}

export function getComparisonStream(products:AIProduct[], selectedFeatures:string[]):Function{
    let messages = getMessages(getComparisonInstructions(products, selectedFeatures),products,selectedFeatures)
    return getChatGPTResponse(messages)
}








function getMessages(instructions:string|null, products:AIProduct[]|null, features:string[]|null):ChatCompletionRequestMessage[]{

    let messages:ChatCompletionRequestMessage[] = []

    if(instructions){
        messages.push({ role: ChatCompletionRequestMessageRoleEnum.System, content:instructions} as ChatCompletionRequestMessage)
    }
    if(products){
        messages.push({ role: ChatCompletionRequestMessageRoleEnum.User, content:"Products: "+JSON.stringify(products) } as ChatCompletionRequestMessage)
    }
    if(features){
        messages.push({ role: ChatCompletionRequestMessageRoleEnum.User, content:"Features: "+JSON.stringify(features) } as ChatCompletionRequestMessage)
    }

    return messages

}


function getChatGPTResponse(messages:ChatCompletionRequestMessage[])
:Function {    
    const chatRequestOpts: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: TEMPRETURE,
        stream:true
    }

    return async ():Promise<Response|null> =>{
            const chatResponse:Response = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(chatRequestOpts)
        })

        if (!chatResponse.ok) {
            const err = await chatResponse.json()
            console.log(err.error.message)
            return null
        }
        return chatResponse
    }
}













// =======================================Checks===================================================


export async function runChecks(products:AIProduct[]|null, features:string[]|null):Promise<boolean>{
    let messages = getMessages(null,products,features)
    if( tokenValidation(messages) &&
    await getOpenAIModeration(messages))
        return true
    return false    
}
function tokenValidation(messages:ChatCompletionRequestMessage[]):boolean{
    // =================== Validation ===================
    if (!messages) {
        console.log("No message were provided")
        return false
    }

    let tokenCount = 0

    messages.forEach((msg) => {
        const tokens = getTokens(msg.content)
        tokenCount += tokens
    })

    console.log("Final token Count:",tokenCount)

    if (tokenCount >= 4000) {
        console.log('Token exceeds 4000')
        return false
    }


    return true
}

async function getOpenAIModeration(messages:ChatCompletionRequestMessage[]):Promise<boolean>{
    // =================== OpenAI Moderation ===================

    const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            input: JSON.stringify(messages)
        })
    })
    if (!moderationRes.ok) {
        const err = await moderationRes.json()
        console.log(`Moderation req failed ${err.error.message}`)
        return false
    }

    const moderationData = await moderationRes.json()
    const [results] = moderationData.results

    if (results.flagged) {
        console.log('Query flagged by openai')
        return false
    }

    return true

}