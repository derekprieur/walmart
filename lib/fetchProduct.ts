import { ProductContent } from "@/types/productTypes";

async function fetchProduct(url: string) {
    const username = process.env.OXYLABS_USERNAME;
    const password = process.env.OXYLABS_PASSWORD;

    const newUrl = new URL(`https://www.walmart.com${url}`);

    const body = {
        source: "universal_commerce",
        url: newUrl.toString(),
        geo_locations: "United States",
        parse: true,
    }

    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: Buffer.from(`${username}:${password}`).toString("base64")
        },
        next: {
            revalidate: 60 * 60 * 24
        }
    }).then((response) => response.json())
        .then((data) => {
            if (data.results.length === 0) return
            const result: ProductContent = data.results[0]

            const product = result.content

            return product
        })
        .catch((error) => {
            console.error(error)
        })
}

export default fetchProduct;