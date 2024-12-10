import { FourBlockGridIcon, GridMatrixIcon, SimpleGridIcon } from "../SvgFiles/SvgFile";
import { filterClass } from "./FilterProduct";

export default function SortAndViewToggle({data,handleSortByFilter,setGridView}) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex space-x-2 justify-end">
                <select className={filterClass} onChange={(e) => handleSortByFilter(e.target.value)} aria-label="Sort by price or name">
                    <option value=""> Sort Filter </option>
                    {data?.sort_fields?.options.map((option) => (
                        <>
                            <option key={`${option.value}_ASC`} value={`${option.value}_ASC`}>
                                {option.label} , {option.value == 'price' ? "low to high" : 'A-Z'}
                            </option>
                            <option key={`${option.value}_DESC`} value={`${option.value}_DESC`}>
                                {option.label} , {option.value == 'price' ? "high to low" : 'A-Z'}
                            </option>
                        </>
                    ))}
                </select>
            </div>
            <div className="flex space-x-4">

                <div className="cursor-pointer" variant="outline" size="icon" onClick={() => setGridView('grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
                    <GridMatrixIcon size={20} />
                </div>
                <div className="cursor-pointer" variant="outline" size="icon" onClick={() => setGridView('grid-cols-1 md:grid-cols-2')}>
                    <FourBlockGridIcon size={20} />
                </div>
                <div className="cursor-pointer" variant="outline" size="icon" onClick={() => setGridView('grid-cols-1')}>
                    <SimpleGridIcon size={20} />
                </div>
            </div>
        </div>
    )
}