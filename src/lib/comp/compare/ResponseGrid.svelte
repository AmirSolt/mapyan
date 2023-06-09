<script lang="ts">

	import ResponseCard from "./ResponseCard.svelte";
	import {convertXMLtoObj} from '$lib/utils/xml/init'
	import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';

	export let isStreaming: boolean = true;
	export let tableData:{[key:string]:CompactProductInfo};
	export let rawResponse: string='';

	const closeRegex:RegExp =  /<\/[i, f]>/g
	let closeCount:number = 0;

	let cards:CompareCard[] = []
	
	$: if (!isStreaming) cards = convertXMLtoObj(rawResponse)
	$: if(isStreaming) streamedConverter(rawResponse)
	
	
	function streamedConverter(streamedResponse:string){
		let matches = getMatches(streamedResponse, closeRegex)
		if(matches.length > closeCount  ){

			let inputXML = streamedResponse.slice(0, matches.at(-1))
			cards = convertXMLtoObj(inputXML)

			closeCount = matches.length
		}
	}


	function getMatches(text:string, regex:RegExp):number[]{
		let matches: number[] = [];
		let match: RegExpExecArray | null;
		while ((match = regex.exec(text)) !== null) {
			matches.push(match.index + match[0].length);
		}
		return matches;
	}


</script>






{#each cards as card}
	<ResponseCard {card} {tableData} />
{/each}


{#if isStreaming }
	<div class="card flex justify-center items-center p-4">
		<LoadingAnim />
	</div>
{/if}
