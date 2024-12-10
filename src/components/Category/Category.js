import React from 'react';
import dynamic from 'next/dynamic';
const CategoryCards = dynamic(() => import('./squareCards'), { ssr: false });

const Category = React.memo(({ categories, loading = true }) => {
    return (
        <CategoryCards data={categories} loading={loading} />
    );
});

export default Category;
