
import { PRIVATE_OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { getTokens } from './tokenizer'
import { ChatGPTInstructions, ChatGPTTemprature } from './config'
import {error} from '@sveltejs/kit'





export function createOptionFeatures(productInfos:ProductInfo[]):string[]{
    return []
}

export function createComparison(productInfos:ProductInfo[], selectedFeatures:string[]):string{
    return ""
}
















// export const getResponse = async (cleanInputProducts) => {


//     const messages: ChatCompletionRequestMessage[] = [
//         { role: ChatCompletionRequestMessageRoleEnum.System, content:ChatGPTInstructions},
//         { role: ChatCompletionRequestMessageRoleEnum.User, content:"Products: "+JSON.stringify(cleanInputProducts) }
//     ]

//     const chatResponse = getChatGPTResponse(messages)

//     return chatResponse
// }




// async function getChatGPTResponse(messages) {
    

//     // =================== Validation ===================
//     if (!messages) {
//         throw error(400, "No message were provided")
//     }

//     let tokenCount = 0

//     messages.forEach((msg) => {
//         const tokens = getTokens(msg.content)
//         tokenCount += tokens
//     })

//     console.log("Final token Count:",tokenCount)

//     if (tokenCount >= 4000) {
//         throw error(400, {message: 'Token exceeds 4000'})
//     }



//     // =================== Moderation =================== 
//     await getOpenAIModeration(JSON.stringify(messages))

//     // =================== Chat ===================
//     const chatRequestOpts: CreateChatCompletionRequest = {
//         model: 'gpt-3.5-turbo',
//         messages: messages,
//         temperature: ChatGPTTemprature,
//         stream:true
//     }

//     const chatResponse:Response = await fetch('https://api.openai.com/v1/chat/completions', {
//         headers: {
//             Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify(chatRequestOpts)
//     })

//     if (!chatResponse.ok) {
//         const err = await chatResponse.json()
//         throw error(400, err.error.message)
//     }



//     return chatResponse
// }





// const getOpenAIModeration = async (text:string) => {

//     const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             input: text
//         })
//     })
//     if (!moderationRes.ok) {
//         const err = await moderationRes.json()
//         throw error(400, err.error.message)
//     }

//     const moderationData = await moderationRes.json()
//     const [results] = moderationData.results

//     if (results.flagged) {
//         throw error(400, 'Query flagged by openai')
//     }

// }