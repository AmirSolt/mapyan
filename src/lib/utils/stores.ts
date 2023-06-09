import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import {SelectionLimit} from "$lib/utils/config"



export const selectedProducts: Writable<Product[]> = writable([]);






export function addToSelected(product:Product){
    selectedProducts.update((list)=>{
        if(list.length>=SelectionLimit.max){
            return list;
        }
        return list.find((item:Product) => item.key === product.key) ? list : [...list, product]
    })
}
export function removeCompareProduct(product:Product) {
    selectedProducts.update((list) => {
        return list.filter((item:Product) => item.key !== product.key)
    });
}