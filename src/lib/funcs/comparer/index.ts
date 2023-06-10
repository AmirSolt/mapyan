import * as AI from "$lib/funcs/server/AI/index"
import { SSE } from 'sse.js';
import {toastError} from '$lib/utils/toast'

export function createOptionFeatures(productInfos:ProductInfo[]):string[]{
    return AI.createOptionFeatures(productInfos)
}

export function createComparison(productInfos:ProductInfo[], selectedFeatures:string[]):string{
    return AI.createComparison(productInfos, selectedFeatures)
}






async function getChatResponse(productInfos: ProductInfo[]) {
    function handleError<T>(err: T) {
        chatResponse = 'Something went wrong!';
        console.error(err);
    }

    const eventSource = new SSE('/api/chat', {
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ productInfos })
    });

    eventSource.addEventListener('error', handleError);
    eventSource.addEventListener('message', (e) => {
        try {
            if (e.data === '[DONE]') {
                saveCompare();
                isStreaming = false;
                return;
            }

            const completionResponse = JSON.parse(e.data);
            const [{ delta }] = completionResponse.choices;

            if (delta.content) {
                chatResponse = (chatResponse ?? '') + delta.content;
            }
        } catch (err) {
            handleError(err);
        }
    });
    eventSource.stream();
}





async function saveCompare() {
    const response = await fetch('/api/db/save-compare', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            tableKey,
            tableData,
            chatResponse
        })
    });

    if (!response.ok) {
        const data = await response.json();
        toastError(data.message, true)
    }
}