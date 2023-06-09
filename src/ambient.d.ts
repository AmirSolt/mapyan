





interface Product{
	brand: string | null
    image_url: string
    key: string
    price: number | null
    rating: number | null
    title: string
    url: string | null
}

interface ProductInfo {
  desc: string
  key: string
}



// ========================================

interface Comparison{
	body: string
	features: string[]
	key: string
}

interface ComparisonCard{
	feature: string
	asins: string[]
	reason: string
}

