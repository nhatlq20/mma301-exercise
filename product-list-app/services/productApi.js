export const fetchProducts = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await response.json();
        return data.products;
    } catch (error) {

        console.error("Loi fetch API:", error);

        return [];
    }

}