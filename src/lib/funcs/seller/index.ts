

const DEFAULT_SELLERS = [
    {name:"Amazon", url:"https://www.amazon.com/s", price:null},
    {name:"Walmart", url:"https://www.walmart.com/search", price:null},
    {name:"Ebay", url:"https://www.ebay.com/sch/i.html", price:null},
]

const MIN_SELLERS = 3;

export function cleanSellers(product:Product, sellers:Seller[]):Seller[]{


    if(!Array.isArray(sellers))
        return []

    // ================Add default sellers====================
    if(sellers.length<MIN_SELLERS){
        const toAddCount = MIN_SELLERS - sellers.length;
        const usedSellersDomains:string[] = sellers.map(seller=>{
            return getDomain(seller.url)
        })
        const notUsedSellers:Seller[] = DEFAULT_SELLERS.filter(seller=>{
            return !(usedSellersDomains.includes(getDomain(seller.url)))
        })
        for (let index = 0; index < toAddCount; index++) {
            notUsedSellers[index].url = cleanSearch(notUsedSellers[index].url, product)
            sellers.push(notUsedSellers[index])
        }
    }

    // ================Add Affiliate====================
    sellers.forEach(seller=>{
        seller.url = addAffiliateCode(seller.url)
    })


    return sellers
}





        
const DOMAIN_INFO:{[domain:string]:DomainInfo} = {
    "www.amazon.com":{
        "searchQuery":"k",
        "affiliateQuery":"tag",
        "affiliateCode":"mapyan-20"
    }as DomainInfo,
    "www.walmart.com":{
        "searchQuery":"q",
        "affiliateQuery":"",
        "affiliateCode":""
    }as DomainInfo,
    "www.ebay.com":{
        "searchQuery":"_nkw",
        "affiliateQuery":"",
        "affiliateCode":""
    }as DomainInfo,
}

interface DomainInfo{
    searchQuery:string
    affiliateQuery:string
    affiliateCode:string
}


function getDomain(url:string):string{
    return new URL(url).hostname
}

function cleanSearch(url:string, product:Product):string{
    const urlObj = new URL(url)
  
    if(DOMAIN_INFO[urlObj.hostname]){
        const domainInfo = DOMAIN_INFO[urlObj.hostname]
        urlObj.searchParams.set(domainInfo["searchQuery"], product.title)
    }
    return urlObj.toString()
}


function addAffiliateCode(url:string):string{
    const urlObj = new URL(url)
    if(DOMAIN_INFO[urlObj.hostname]){
        const domainInfo = DOMAIN_INFO[urlObj.hostname]
        urlObj.searchParams.set(domainInfo["affiliateQuery"], domainInfo["affiliateCode"])
    }
    return urlObj.toString()
}
