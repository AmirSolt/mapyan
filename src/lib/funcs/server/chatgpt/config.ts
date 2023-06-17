
import {Divider} from '$lib/utils/config'

// export const FEATURES_INSTRUCTIONS = "Based on the given products come up with 15 features that can be compared "
// export const COMPARISON_INSTRUCTIONS = "Compare products based on given features"
export const TEMPRETURE = 0.42


export function getFeaturesInstructions(products:AIProduct[]){

    return `You are given ${products.length} products. Come up with 10 features that can be compared between these products. Each feature must be a short phrase hat represents product's quality. Example of some features: Charging||Texture||Capacity||Cores||Speed||....  Only respond in a list of features. Use "${Divider.featureOption}" as seperator. Only use Use "${Divider.featureOption}" to seperate each feature. Each feature must be a short phrase hat represents product's feature. Use this Template: Feature${Divider.featureOption}Feature${Divider.featureOption}Feature${Divider.featureOption}...`
}

export function getComparisonInstructions(products:AIProduct[], features:string[]){

    return `You are given ${products.length} products and ${features.length} features. For every feature compare all products, rank them and give the reason for your ranking.
    To rank each product put the key in order of best to worst.
    In ${Divider.keys} only use the "key" column.
    When Explaining your reason for ranking each product refer to them by their title.
    Use the title in ${Divider.reason} line and, use the key to identify each product in ${Divider.keys} line. 
    Seperate to new lines. Use this template to respond for every feature: 
    ${Divider.featureHeading} feature
    ${Divider.keys} key1${Divider.keySperator}key2${Divider.keySperator}key3
    ${Divider.reason} reason
    `
}