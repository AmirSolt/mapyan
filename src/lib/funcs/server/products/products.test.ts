import {describe, it, expect} from "vitest"
import * as productsAPI from "./index"




describe("Get search results", () => {



    it("keyword battery", async ()=>{
        const result = await productsAPI.getSearch("battery")
        expect(result?.length).above(0)
    })
    it("keyword empty", async ()=>{
        const result = await productsAPI.getSearch("")
        expect(result?.length).eq(0)
    })
    it("keyword candy", async ()=>{
        const result = await productsAPI.getSearch("candy")
        expect(result?.length).eq(0)
    })

    
});
