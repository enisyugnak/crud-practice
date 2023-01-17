import { React, useEffect, useRef } from 'react';
/** API CALLS */
import { addProduct, updateProduct } from './productsDbCall';

const ProductForm = (props) => {
  const { dispatch, state } = props;
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  function cancelEdit() {
    dispatch({ type: 'CANCEL_EDIT' });
  }

  function submitClicked() {
    // console.log('submit clicked with : ', prodState);
    state.product.id
      ? updateProduct(dispatch, state.product)
      : addProduct(dispatch, state.product);
  }

  const submitForm = (e) => {
    e.preventDefault();

    //console.log('submit form : ', state);
    const { name, price } = state.product;
    if (name && price) {
      submitClicked();
    } else {
      alert('ürün ismi ve fiyatı yazmak lazım..');
    }
    nameRef.current.focus();
  };

  return (
    <div>
      <form className="product-form" onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="product name..."
          onChange={handleChange}
          value={state.product.name}
        ></input>

        <input
          type="number"
          name="price"
          placeholder="price"
          onChange={handleChange}
          value={state.product.price}
        ></input>

        <button> {state.product.id ? 'UPDATE' : 'ADD'} PRODUCT</button>
        {state.product.id && <button onClick={cancelEdit}>CANCEL</button>}
      </form>
    </div>
  );
};

export default ProductForm;
