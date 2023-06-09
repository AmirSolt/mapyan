import {describe, it, expect} from "vitest"
import * as comparisonDB from "./index"



const selectedAsins = ["asd","awe"]


describe("Get comparison page data", () => {

	it("keyword empty", ()=>{
        const result = comparisonDB.getComparisonPageData(selectedAsins)
        expect(result).toEqual({
            comparison: {key:"", body:"", features:[]},
            products: [],
        })
    })

    
});
