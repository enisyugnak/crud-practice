import React from 'react';
import { useContext } from 'react';
import { ProductContext } from './ProductsPage';

/** UTILS */
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import * as getDate from '../../utils/dateUtil';

/** API CALLS */
import * as db from './productsDbCall';
// TODO: spinner for loader state...

export default function ProductsList() {
  const { dispatch, state } = useContext(ProductContext);

  function editClicked(item) {
    dispatch({ type: 'EDIT_PRODUCT', payload: item });
  }
  function deleteClicked(id) {
    if (window.confirm('bu ürünü silmek istediğinizden emin misiniz')) {
      db.deleteProduct(dispatch, id);
    }
  }
  // sort list alphabetacilly
  state.list.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="product-page">
      {
        state.loading ? (
          <div>loading</div>
        ) : (
          <div className="product-content">
            <div className="product-row product-head">
              <div className="product-name">Product Name</div>
              <div className="product-price">Price</div>
              <div className="product-buttons">actions</div>
            </div>
            {state.list.length ? (
              state.list.map((item, index) => {
                const created = getDate.getLocalDate(item.dateCreated);
                const updated = getDate.getLocalDate(item.dateUpdated);
                return (
                  <div key={index} className="product-row">
                    <div className="product-id">{item.id}</div>
                    <div className="product-id">{created}</div>
                    <div className="product-id">{updated}</div>
                    <div className="product-name">{item.name}</div>
                    <div className="product-price">{item.price}</div>
                    <div className="product-buttons">
                      <button onClick={() => deleteClicked(item.id)}>
                        <FaTrashAlt />
                      </button>
                      <button onClick={() => editClicked(item)}>
                        <FaRegEdit />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>no products found</div>
            )}
          </div>
        ) /** product-content end*/
      }
    </div> /** product-page end*/
  );
}
