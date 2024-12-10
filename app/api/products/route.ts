export async function GET() {
    return fetch('https://deisishop.pythonanywhere.com/#/shop/getProducts')
        .then(res => res.json())
        .then(data => Response.json(data))
}