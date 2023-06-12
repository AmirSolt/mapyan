
import { Divider } from "$lib/utils/config";





export function streamingFeatureOptionsResponseParser(response:string){
    
    let parts = response.split(Divider.featureOption)
        .filter(string => string.trim().length > 0);
    return parts
}
export function streamingComparisonResponseParser(response:string):ComparisonCard[]{
    let parsedObj:ComparisonCard[]=[];
    let parts = response.split("\n")
    parts.forEach(part => {
        if(part.includes(Divider.featureHeading)){
            parsedObj.push({
                feature:part.slice(Divider.featureHeading.length).trim(),
                asins:[],
                reason:""
            })
            return
        }
        if(part.includes(Divider.asins)){
            parsedObj.at(-1).asins = part
                .slice(Divider.asins.length)
                .trim()
                .split(Divider.asinSperator)
                .filter(string => string.trim().length > 0);
            return
        }
        if(part.includes(Divider.reason)){
            parsedObj.at(-1).reason = part.slice(Divider.reason.length).trim()
            return
        }
    });

    return parsedObj
}

function getElementsWithIndex(arr:any[]) {
    var result = [];
    for (var i = 1; i < arr.length; i += 2) {
      result.push(arr[i]);
    }
    return result;
  }

function getMatches(text:string, regex:RegExp):number[]{
    let matches: number[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
        matches.push(match.index + match[0].length);
    }
    return matches;
}