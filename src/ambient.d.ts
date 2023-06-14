





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
	name: string
	url: string
	price: number | null
}
// ========================================


// interface Comparison {
// 	body: string
// 	features: string[]
// 	key: string
// }

interface ComparisonCard {
	feature: string
	keys: string[]
	reason: string
}

// ========================================


interface AIProduct {
	key:string
	title: string
	description: string
}

