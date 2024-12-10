'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

import { buildQueryString } from './Extra';
import {stopLoading } from '@/lib/redux/slices/loadingSlice';

const ShopPageSidebarThree = dynamic(() => import("@/components/Common/ShopPageSideFilter/ShopPageSidebarSix"), { ssr: false });

export default function MobileFilter({ isOpen, onClose, data, filterValue, page, sort, setPage,attributesData=[], FilterVisible=false }) {
  const [selectedFilters, setSelectedFilters] = useState(filterValue || {});
  const [filter, setFilter] = useState({});
  const [search, setSearch] = useState('');
  const pathname = usePathname();
  const { push, router } = useRouter();
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (filter && Object.entries(filter)?.length) {
      filterPassInUrl();
    }
  }, [filter])

  useEffect(() => {
    filterPassInUrl();
  }, [search, sort, page])

  const filterPassInUrl = useDebouncedCallback((term) => {
    const queryString = buildQueryString(filter,page, search, sort);
    push(`${pathname}?${queryString}`);

  }, 1);


  const removeAllFilter = () => {
    push(pathname);
    setFilter({});
    setSelectedFilters({});
    dispatch(stopLoading())
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);



  return (
    <div className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50   ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ zIndex: "999" }}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Filter</h2>
          <button className="p-2" aria-label="Close filter" onClick={(e) => { onClose(false); removeAllFilter(); }}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <ShopPageSidebarThree 
         filterValue={filterValue}
         sort={sort}
         page={page}
         setPage={setPage}
         attributesData={attributesData}
         FilterVisible={FilterVisible}
        />

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex justify-between">
          <button
            onClick={(e) => { onClose(false); removeAllFilter(); }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
          >
            Clear ({Object.values(selectedFilters)?.length})
          </button>
          <button
            onClick={(e) => onClose(false)}
            className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
