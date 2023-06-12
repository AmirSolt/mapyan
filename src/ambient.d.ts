





interface Product {
	brand: string | null
	image_url: string
	key: string
	cheapest_price: number | null
	rating: number | null
	rating_total: number | null
	title: string
	sellers?: Seller[]
	productInfo?: ProductInfo
}

interface ProductInfo {
	description: string
	key: string
}

interface Seller {
	name: string | null
	url: string | null
	price: string | null
}
// ========================================


interface Comparison {
	body: string
	features: string[]
	key: string
}

interface ComparisonCard {
	feature: string
	asins: string[]
	reason: string
}

// ========================================


interface AIProduct {
	title: string
	description: string
}

