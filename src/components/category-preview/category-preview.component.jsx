import React from 'react';
import ProductCard from '../product-card/product-card.component';

import {CategoryPreviewCont, CategoryTitle, Preview} from './category-preview.styles.jsx'

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewCont>
      <CategoryTitle as='h2' to={title}>
        {title.toUpperCase()}
      </CategoryTitle>
      <Preview>
          {
              products.filter((_, idx) => idx < 4)
              .map((product) => 
              <ProductCard key={product.id} product={product}/>)
          }
      </Preview>
    </CategoryPreviewCont>
  )
}

export default CategoryPreview