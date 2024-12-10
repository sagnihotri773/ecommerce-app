import { GET_PRODUCTS } from "@/lib/graphql/queries/products";
import { getDynamicData } from "@/components/Util/commonGraphQuery";

export default async function getCategoryData({ searchParamsValue = {} }) {
    let loading = true;
    const searchQuery = searchParamsValue.search || '';
    const page = searchParamsValue.page || 1;
    const sort = searchParamsValue.sort ;
    const excludedKeys = ['page', 'sort', 'search'];

    const convertedParams = Object.entries(searchParamsValue).reduce((acc, [key, value]) => {
        if (excludedKeys.includes(key)) {
            return acc;
        }
        if (key === 'price') {
            const [from, to] = value.split('-');
            acc.price = { from, to };
        } else {
            acc[key] = { eq: value };
        }
        return acc;
    }, {});
    const [key, value] = sort?.split('_') || ['name' , 'ASC'];
    const values = {
        search: searchQuery,
        filters: convertedParams || {},
        pageSize: 30,
        currentPage: page,
        sortField: {[key]:value},
    };

    try {
        const result = await getDynamicData(GET_PRODUCTS, values);
        const products = result?.products?.items || [];
        const data = result?.products || {};

        loading = false;
        return { categoryProducts: data, categoryItems: products, loading };
    } catch (error) {
        loading = false;
        console.error("Error fetching category data:", error);
        return { categoryProducts: {}, categoryItems: [], loading };
    }
}
