
import { PRIVATE_OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { getTokens } from './tokenizer'
import { FEATURES_INSTRUCTIONS, COMPARISON_INSTRUCTIONS, TEMPRETURE } from './config'
import {error} from '@sveltejs/kit'




export function getOptionFeaturesStream(products:AIProduct[]):Function{
    let messages = getMessages(FEATURES_INSTRUCTIONS,products,null)
    return getChatGPTResponse(messages)
}

export function getComparisonStream(products:AIProduct[], selectedFeatures:string[]):Function{
    let messages = getMessages(FEATURES_INSTRUCTIONS,products,selectedFeatures)
    return getChatGPTResponse(messages)
}








function getMessages(instructions:string|null, products:AIProduct[]|null, features:string[]|null):ChatCompletionRequestMessage[]{

    let messages:ChatCompletionRequestMessage[] = []

    if(instructions){
        messages.push({ role: ChatCompletionRequestMessageRoleEnum.System, content:instructions})
    }
    if(products){
        messages.push({ role: ChatCompletionRequestMessageRoleEnum.User, content:"Products: "+JSON.stringify(products) })
    }
    if(features){
        messages.push({ role: ChatCompletionRequestMessageRoleEnum.User, content:"Features: "+JSON.stringify(features) })
    }

    return messages

}


function getChatGPTResponse(messages:ChatCompletionRequestMessage[]) {    
    const chatRequestOpts: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: TEMPRETURE,
        stream:true
    }

    return async ()=>{
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
            throw error(400, err.error.message)
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
        throw error(400, "No message were provided")
    }

    let tokenCount = 0

    messages.forEach((msg) => {
        const tokens = getTokens(msg.content)
        tokenCount += tokens
    })

    console.log("Final token Count:",tokenCount)

    if (tokenCount >= 4000) {
        throw error(400, {message: 'Token exceeds 4000'})
    }

    return true
}

async function getOpenAIModeration(messages:ChatCompletionRequestMessage[]){
    // =================== OpenAI Moderation ===================

    const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            input: messages
        })
    })
    if (!moderationRes.ok) {
        const err = await moderationRes.json()
        throw error(400, err.error.message)
    }

    const moderationData = await moderationRes.json()
    const [results] = moderationData.results

    if (results.flagged) {
        throw error(400, 'Query flagged by openai')
    }

    return true

}