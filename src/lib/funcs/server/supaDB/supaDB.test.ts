import {describe, it, expect} from "vitest"
import * as supaDB from "./index"





// describe("Get search results from SupaDB", () => {

// 	it("keyword battery", async ()=>{
//         const result = await supaDB.getSearch("battery")
//         expect(result?.length).above(0)
//     })
//     it("keyword candy", async ()=>{
//         const result = await supaDB.getSearch("candy")
//         expect(result?.length).equal(0)
//     })
    
// });


// describe("Get product_info", () => {


//     it("asin 090909909", async ()=>{
//         const result = await supaDB.getProductInfo("090909909")
//         expect(Boolean(result)).equal(false)
//     })
// 	it("asin B07D29QNMJ", async ()=>{
//         const result = await supaDB.getProductInfo("B07D29QNMJ")
//         expect(Boolean(result)).equal(true)
//     })
    
// });



describe("Get getComparisonPageData", () => {


    it("comparisonKey B0791Y1WSQ-B07D29QNMJ", async ()=>{
        const result = await supaDB.getComparisonPageData("B0791Y1WSQ-B07D29QNMJ")
        expect(Boolean(result)).equal(false)
    })
    
});