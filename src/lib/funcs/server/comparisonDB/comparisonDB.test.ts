import {describe, it, expect} from "vitest"
import * as comparisonDB from "./index"



const selectedAsins = ["asd","awe"]


describe("Get comparison page data", () => {

    it("comparisonKey B0791Y1WSQ-B07D29QNMJ", async ()=>{
        const result = await comparisonDB.getComparisonPageData("B0791Y1WSQ-B07D29QNMJ")
        expect(result?.comparison?.body?.length).above(5)
    })

    it("comparisonKey B0BSL5GWFN-B097M9R9CT", async ()=>{
        const result = await comparisonDB.getComparisonPageData("B0BSL5GWFN-B097M9R9CT")
        expect(result?.comparison?.body?.length).eq(0)
    })
    
    
});
