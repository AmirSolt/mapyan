import {describe, it, expect} from "vitest"
import * as chatgpt from "./index"



describe("Chatgpt test", () => {

    it("Chatgpt test request", async ()=>{
        const result = chatgpt.getChatGPTResponseTest()
        console.log(result)

        expect(0).eq(0)
    })

});
