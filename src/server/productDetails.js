import { DOWNLOADABLE_PRODUCT, GET_PRODUCT, ROUTE } from "@/lib/graphql/queries/products";
import { getDynamicData } from "@/components/Util/commonGraphQuery";

export const getRoute = async (slug = []) => {
  let productLoaing = true; // Start with productLoaing as true

  if (slug) {
    const url = slug.filter(item => !item.includes('undefined', null)).join('/');
    const result = await fetchRouteData(url);

    try {
      if (result?.route?.type !== 'CATEGORY' && result?.route?.sku) {
        const products = await getDynamicData(GET_PRODUCT, { sku: result?.route?.sku });
        productLoaing = false; // Set productLoaing to false after data is fetched
        return { route: result.route, products, productLoaing };
      } else if (result?.route?.__typename === 'GroupedProduct' && !result?.route?.sku) {
        const products = await getDynamicData(GET_PRODUCT, { sku: result?.route?.relative_url?.replace('.html', '') });
        productLoaing = false;
        return { route: result.route, products, productLoaing };
      } else if (result?.route?.__typename === 'DownloadableProduct' && !result?.route?.sku) {
        const products = await getDynamicData(DOWNLOADABLE_PRODUCT, { url_key: result?.route?.relative_url?.replace('.html', '') });
        productLoaing = false;
        return { route: result.route, products, productLoaing };
      }
      productLoaing = false;
      return { route: result.route, products: null, productLoaing };
    } catch (error) {
      productLoaing = false; // Set productLoaing to false in case of error
      return { route: result.route, products: null, productLoaing };
    }
  }

  return { route: null, products: null, productLoaing };
};

export const fetchRouteData = async (url) => {
  return await getDynamicData(ROUTE, { url });
};