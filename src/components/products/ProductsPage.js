import React from 'react';
import { useEffect, useReducer } from 'react';
/** VIEWS */
import ProductForm from './ProductForm';
import ProductsList from './ProductsList';

/** API CALLS */
import { getProducts } from './productsDbCall';
import { reducer, INITIAL_PRODUCT } from './reducer';

const ProductsPage = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_PRODUCT);

  useEffect(() => {
    /** add category to fetch category products */
    // getProducts('meyve');
    getProducts(dispatch);
    return () => {
      console.log('end');
    };
  }, []);

  /** check for errors */
  if (state.error) {
    alert('bir arıza çıktı... console da yazıyor olabilir. ');
  }

  /** VIEWS */
  return (
    <div>
      <ProductForm state={state} dispatch={dispatch} />
      <div className="product-page">
        {state.loading ? (
          <div>loading</div>
        ) : (
          <ProductsList state={state} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
