





interface Product {
	brand: string | null
	image_url: string
	key: string
	price: number | null
	rating: number | null
	title: string
	url: string | null
	productInfo?: ProductInfo
}

interface ProductInfo {
	description: string
	key: string
}


// ========================================


interface Comparison {
	body: string | null
	features: string[] | null
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

