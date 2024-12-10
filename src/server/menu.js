import { GET_CATEGORY } from "@/lib/graphql/queries/category";
import { getDynamicData } from "@/components/Util/commonGraphQuery";

export default async function getNavbarData() {
    const data  = await getDynamicData(GET_CATEGORY);
    return { categoryData: data?.categoryList?.[0]?.children }
}