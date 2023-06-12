
import { Divider } from "$lib/utils/config";





export function featureOptionsResponseParser(response:string):string[]{
    if(!(typeof response === 'string'))
        return []
    
    let parts = response.split(Divider.featureOption)
        .filter(string => string.trim().length > 0);
    return parts
}
export function comparisonResponseParser(response:string):ComparisonCard[]{
    if(!(typeof response === 'string'))
        return []

    let parsedObjs:ComparisonCard[]=[];
    let parts = response.split("\n")
    parts.forEach(part => {
        if(part.includes(Divider.featureHeading)){
            parsedObjs.push({
                feature:part.trim().slice(Divider.featureHeading.length).trim(),
                keys:[],
                reason:""
            })
            return
        }
        if(part.includes(Divider.keys)){
            if(parsedObjs.length>0){
                part = part.trim().slice(Divider.keys.length).trim()
                parsedObjs.at(-1).keys = part
                    .split(Divider.keySperator)
                    .filter(string => string.trim().length > 0);
                return
            }
        }
        if(part.includes(Divider.reason)){
            if(parsedObjs.length>0){
                parsedObjs.at(-1).reason = part.trim().slice(Divider.reason.length).trim()
                return
            }
        }
    });

    return parsedObjs
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