<script lang="ts">
	import CompareTable from '$lib/comp/compare/CompareTable.svelte'
	import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';
	import BarLoading from '$lib/comp/general/loading/BarLoading.svelte';
	import LoadingContainer from '$lib/comp/general/loading/LoadingContainer.svelte';
	import ResponseGrid from '$lib/comp/compare/ResponseGrid.svelte';
	import { destructTableKey } from '$lib/utils/keyMaker';
	import {convertToTableData} from '$lib/utils/table/init'
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { SSE } from 'sse.js'
	import { checkProductInfosStore, queryStoresProductInfo } from '$lib/utils/products/api';
	export let data;
	let { chatResponse, tableKey, tableData } = data;
	const { asins } = destructTableKey(tableKey);
	let isProductInfosReady: boolean = false;
	let isStreaming:boolean = true;
	let compMounted:boolean = false;

	import { onMount } from 'svelte';

	// ============= on load tableData is fetched from db if it doesn't exist generate it =========
	onMount(async () => {
		compMounted = true;
		if(chatResponse && chatResponse.length>0){
			isStreaming = false
		}else{
			awaitProductInfos();
		}

	});

	// ============== waits for productinfos to download then starts the process ====================
	function awaitProductInfos() {
		if (!checkProductInfosStore(asins, $userCountry)) {
			window.setTimeout(awaitProductInfos, 100);
		} else {
			isProductInfosReady = true;
			console.log("product infos loaded")

			let productInfos:ProductInfo[] = asins.map((asin) => queryStoresProductInfo(asin, $userCountry));
			

			getTableData(productInfos);
			getChatResponse(productInfos);
		}
	}

	// ============== title ====================
	async function saveCompare(){
		const response = await fetch('/api/db/save-compare', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            tableKey,
            tableData,
            chatResponse,
        })
		});
		
		if (!response.ok) {
			const data = await response.json();
			const t: ToastSettings = {
				message: data.message,
			};
			toastStore.trigger(t);
		}
	}

	// ============== generates tabledata from prodocts and saves it ====================
	function getTableData(productInfos:ProductInfo[]) {
		tableData = convertToTableData(productInfos)

	}


	// ============== streams chatgpt response ====================
	async function getChatResponse(productInfos:ProductInfo[]){

		function handleError<T>(err: T) {
			chatResponse = "Something went wrong!"
			console.error(err)
		}

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ productInfos})
		})

		eventSource.addEventListener('error', handleError)
		eventSource.addEventListener('message', (e) => {
			try {
				if (e.data === '[DONE]') {
					saveCompare()
					isStreaming = false
					return
				}
				
				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices
				
				if (delta.content) {
					chatResponse = (chatResponse ?? '') + delta.content

				}
			} catch (err) {
				handleError(err)
			}
		})
		eventSource.stream()
	}




</script>







{#if !(chatResponse && chatResponse.length>0) }

	<LoadingContainer >
		<LoadingAnim />
		<br>
		<BarLoading>
			<br />
			<div class="flex flex-col justify-center items-center text-center">
				<p class="text-2xl">Generating a comparison table</p>
				<br />
				<p>We are working to improve the loading speed.</p>
				<p>Thank you for being patient.</p>
			</div>
		</BarLoading>
	</LoadingContainer>

{:else}
	<p class="text-sm badge variant-soft-warning p-4 rounded-lg mb-2">
		*This information has been generated with the help of AI, and has not been confirmed by a human.
	</p>
	

	<br />
	<hr />
	<br />
	<br />


	<h1 class="text-4xl md:text-5xl badge variant-soft-primary my-2 p-4 rounded-lg">Summary Table:</h1>
	<br>

	<div class="">
		<CompareTable {tableData} />
	</div>

	<br>
	<br>
	<br>
	<br>


	<h1 class="text-4xl md:text-5xl badge variant-soft-primary my-2 p-4 rounded-lg">Comparison Table:</h1>
	<br>
	<div class="">
		{#if chatResponse && compMounted}
			<ResponseGrid rawResponse={chatResponse} {tableData} {isStreaming}/>
		{/if}
	</div>

{/if}
