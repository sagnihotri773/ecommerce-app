export const SelectStore=({selectedStore,handleStoreChange,storeConfigData})=>{
    return(
        <select
                value={selectedStore}
                onChange={handleStoreChange}
                className={`block cursor-pointer w-full px-3 py-2 text-white border bg-primary hover:bg-primary border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary ${storeConfigData?.availableStores?.length === 1 ? "!cursor-not-allowed" : ""}`}
                disabled={storeConfigData?.availableStores?.length === 1}
              >
                <option
                  value=""
                  disabled
                  className="text-white cursor-pointer hover:bg-primary focus:border-primary"
                >
                  Select a store
                </option>
                {storeConfigData?.availableStores?.map((item, i) => (
                  <option
                    key={i}
                    value={item.id}
                    className="text-white hover:bg-primary focus:border-primary"
                  >
                    {item?.store_code}
                  </option>
                ))}
              </select>
    )
}