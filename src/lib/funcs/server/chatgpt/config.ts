
import {Divider} from '$lib/utils/config'

// export const FEATURES_INSTRUCTIONS = "Based on the given products come up with 15 features that can be compared "
// export const COMPARISON_INSTRUCTIONS = "Compare products based on given features"
export const TEMPRETURE = 0.5


export function getFeaturesInstructions(products:AIProduct[]){

    return `You are given ${products.length} products. Generate 10 features to compare these products. Only respond in a list of features. Use "|" as seperator. Use this Template: Feature|Feature|Feature|...`
}

export function getComparisonInstructions(products:AIProduct[], features:string[]){

    return `You are given ${products.length} products and ${features.length} features. For every feature compare all products, rank them and give the reason for your ranking.
    To rank each product put the key in order of best to worst.
    Use their title to refer to them in your reason.
    Seperate to new lines. Use this template to respond for every feature: 
    ${Divider.featureHeading} feature
    ${Divider.keys} key1${Divider.keySperator}key2${Divider.keySperator}key3
    ${Divider.reason} reason
    `
}