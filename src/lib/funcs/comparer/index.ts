import { SSE } from 'sse.js';







export function createOptionFeaturesStream(products: Product[], newContentCallback:Function=()=>{}, overCallback:Function=()=>{}, errorCallback:Function=()=>{}): SSE | null {
	try{
		return getAIResponse(products, null, newContentCallback, overCallback, errorCallback)
	}catch(err){
		console.log(err)
		return null
	}
}

export function createComparisonStream(products: Product[], selectedFeatures: string[], newContentCallback: Function=()=>{}, overCallback: Function=()=>{}, errorCallback: Function=()=>{}): SSE|null {
	
	try{
		return getAIResponse(products, selectedFeatures, newContentCallback, overCallback, errorCallback)
	}catch(err){
		console.log(err)
		return null
	}

}



function getAIResponse(products: Product[], selectedFeatures: string[] | null, newContentCallback: Function, overCallback: Function, errorCallback: Function): SSE  {


	let comparerSlug: string = selectedFeatures === null ? "features" : "comparison";

	function handleError<T>(err: T) {
		errorCallback(err)
	}

	const eventSource = new SSE(`/api/comparer/${comparerSlug}`, {
		headers: {
			'Content-Type': 'application/json'
		},
		payload: JSON.stringify({
			products,
			selectedFeatures
		})
	})

	eventSource.addEventListener('error', handleError)
	eventSource.addEventListener('message', (e) => {
		try {
			if (e.data === '[DONE]') {
				overCallback()
				return
			}

			const completionResponse = JSON.parse(e.data)
			const [{ delta }] = completionResponse.choices

			if (delta.content) {
				newContentCallback(delta.content)
			}
		} catch (err) {
			handleError(err)
		}
	})

	// eventSource.stream()
	return eventSource
}



// async function getChatResponse(productInfos: ProductInfo[]) {
//     function handleError<T>(err: T) {
//         chatResponse = 'Something went wrong!';
//         console.error(err);
//     }

//     const eventSource = new SSE('/api/chat', {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         payload: JSON.stringify({ productInfos })
//     });

//     eventSource.addEventListener('error', handleError);
//     eventSource.addEventListener('message', (e) => {
//         try {
//             if (e.data === '[DONE]') {
//                 saveCompare();
//                 isStreaming = false;
//                 return;
//             }

//             const completionResponse = JSON.parse(e.data);
//             const [{ delta }] = completionResponse.choices;

//             if (delta.content) {
//                 chatResponse = (chatResponse ?? '') + delta.content;
//             }
//         } catch (err) {
//             handleError(err);
//         }
//     });
//     eventSource.stream();
// }





// async function saveCompare() {
//     const response = await fetch('/api/db/save-compare', {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             tableKey,
//             tableData,
//             chatResponse
//         })
//     });

//     if (!response.ok) {
//         const data = await response.json();
//         toastError(data.message, true)
//     }
// }



