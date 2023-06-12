import {describe, it, expect} from "vitest"
import * as parser from "./index"
import { QrCode } from "lucide-svelte"



const featureResponse = "feature1|feature2|feature3"
const featureResponse2 = "feature1|fea||"
const featureResponse3 = ""
const featureResponse4 = null
const featureResponse5 = ["asd",'qwd','12']

const comparisonResponse = `
/f Feature1
/a asin1|asin2|asin3
/r reason`
const comparisonResponse2 = `
/f Feature1
/a asin1|asin2|asi`
const comparisonResponse3 = `
/f Feature1
/a asin1|asin2|asin3
/r reason
/f Feature1
/a asin1|asi`
const comparisonResponse4 = ``
const comparisonResponse5 = `wlqkd`
const comparisonResponse6 = `/f `
const comparisonResponse7 = undefined
const comparisonResponse8 = null
const comparisonResponse9 = 123
const comparisonResponse10 = `dqwd 
qwd wqdkq lwkd
q wdkqlw 
jkqwd 
qo
/f qwd`


describe("Parse feature options response", () => {

	it("featureResponse",()=>{
        let r = parser.streamingFeatureOptionsResponseParser(featureResponse)
        console.log(r)
        expect(r).eql(["feature1", "feature2", "feature3"])
    })
    it("featureResponse2",()=>{
        let r = parser.streamingFeatureOptionsResponseParser(featureResponse2)
        console.log(r)
        expect(r).eql(["feature1", "fea"])
    })
    it("featureResponse3",()=>{
        let r = parser.streamingFeatureOptionsResponseParser(featureResponse3)
        console.log(r)
        expect(r).eql([])
    })
    it("featureResponse4",()=>{
        let r = parser.streamingFeatureOptionsResponseParser(featureResponse4)
        console.log(r)
        expect(r).eql([])
    })
    it("featureResponse5",()=>{
        let r = parser.streamingFeatureOptionsResponseParser(featureResponse5)
        console.log(r)
        expect(r).eql([])
    })
    
});

describe("Parse comparison response", () => {
    it("comparisonResponse",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse)
        console.log(r)
        expect(r).eql([{
            feature:"Feature1",
            asins:["asin1","asin2","asin3"],
            reason:"reason"
        }])
    })
    it("comparisonResponse2",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse2)
        console.log(r)
        expect(r).eql([{
            feature:"Feature1",
            asins:["asin1","asin2","asi"],
            reason:""
        }])
    })
    it("comparisonResponse3",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse3)
        console.log(r)
        expect(r).eql([{
            feature:"Feature1",
            asins:["asin1","asin2","asin3"],
            reason:"reason"
        },{
            feature:"Feature1",
            asins:["asin1","asi"],
            reason:""
        }])
    })
    it("comparisonResponse4",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse4)
        console.log(r)
        expect(r).eql([])
    })
    it("comparisonResponse5",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse5)
        console.log(r)
        expect(r).eql([])
    })
    it("comparisonResponse6",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse6)
        console.log(r)
        expect(r).eql([
            {
                feature:"",
                asins:[],
                reason:""
            }
        ])
    })
    it("comparisonResponse7",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse7)
        console.log(r)
        expect(r).eql([])
    })
    it("comparisonResponse8",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse8)
        console.log(r)
        expect(r).eql([])
    })
    it("comparisonResponse9",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse9)
        console.log(r)
        expect(r).eql([])
    })
    it("comparisonResponse10",()=>{
        let r = parser.streamingComparisonResponseParser(comparisonResponse10)
        console.log(r)
        expect(r).eql([{
            feature:"qwd",
            asins:[],
            reason:""
        }])
    })

    
});