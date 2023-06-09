





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

enum Price{
	symbol="$",
	currency="USD",
}
enum Affiliate{
	code="mapyan-20"
}
enum Selection{
	min=2,
	max=3,
}
enum Divider{
	feature="$",
	asins="%",
	reason="@",
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

