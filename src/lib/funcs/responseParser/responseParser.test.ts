import {describe, it, expect} from "vitest"
import * as parser from "./index"



const featureResponse = "feature1|feature2|feature3"

const comparisonResponse = `
/f Feature1
/a asin1|asin2|asin3
/r reason`

describe("Parse feature options response", () => {

	it("Sample",()=>{
        let r = parser.streamingFeatureOptionsResponseParser(featureResponse)
        console.log(r)
        expect(r).eql(["feature1", "feature2", "feature3"])
    })
    
});

describe("Parse comparison response", () => {
    it("Sample",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse)
        console.log(r)
        expect(r).eql([{
            feature:"Feature1",
            asins:["asin1","asin2","asin3"],
            reason:"reason"
        }])
    })
    
});