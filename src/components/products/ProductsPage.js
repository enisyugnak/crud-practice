import React, { createContext } from 'react';
import { useEffect, useReducer } from 'react';
/** VIEWS */
import ProductForm from './ProductForm';
import ProductsList from './ProductsList';

/** API CALLS */
import * as db from './productsDbCall';
import { reducer, INITIAL_PRODUCT } from './reducer';

export const ProductContext = createContext();

function ProductsPage() {
  const [state, dispatch] = useReducer(reducer, INITIAL_PRODUCT);

  useEffect(() => {
    /** add category to fetch category products */
    // getProducts('meyve');
    db.getProducts(dispatch);
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
      <ProductContext.Provider value={{ dispatch: dispatch, state: state }}>
        <ProductForm />
        <ProductsList />
      </ProductContext.Provider>
    </div>
  );
}

export default ProductsPage;
