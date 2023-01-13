import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  addDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  /** empty product object as a model */
  const productObj = {
    id: "",
    name: "",
    price: "",
    category: "",
  };

  const [newProduct, setNewProduct] = useState({ ...productObj });

  /** define and reference db collections */

  const productsCol = collection(db, "products");

  /********************************
   * HOOKS
   *******************************/

  useEffect(() => {
    getProducts();
    return () => {
      console.log("end");
    };
  }, []);

  /********************************
   * DATABASE  OPERATIONS (CRUD)
   *******************************/

  /** GET all products */

  const getProducts = async () => {
    try {
      const data = await getDocs(productsCol);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
    }
  };

  /** ADD new product */

  const addProduct = async (newProduct) => {
    try {
      const data = await addDoc(productsCol, newProduct);
      // success - add new item to the list with new id
      setProducts((oldProducts) => [
        ...oldProducts,
        { ...newProduct, id: data.id },
      ]);
      // reset new product object.. (and clear the form)
      setNewProduct(productObj);
    } catch (error) {
      console.log(error);
    }
  };

  /** UPDATE  product */

  const updateProduct = async (id) => {
    const ref = doc(db, "products", id);
    // new product - not writing id parameter
    const productRef = {
      name: newProduct.name,
      price: newProduct.price,
      category: newProduct.category,
    };
    // update to db
    try {
      await updateDoc(ref, productRef);
      clearUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  /** DELETE  product */

  const deleteProduct = async (id) => {
    const ref = doc(db, "products", id);
    try {
      await deleteDoc(ref);
      setProducts((oldProducts) =>
        oldProducts.filter((item) => item.id !== id)
      );
      alert("ürün silinmiştir");
    } catch (error) {
      console.log(error);
    }
  };

  /********************************
   * EVENT HANDLERS
   *******************************/

  /**  submit form - update or add product */

  function submitForm(e) {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      update ? updateProduct(newProduct.id) : addProduct(newProduct);
    } else {
      alert("formu eksiksiz doldurun");
    }
  }

  /** Handle form changes
   * set new product values from form inputs
   */

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setNewProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  /********************************
   * BUTTON EVENTS (Interaction)
   *******************************/

  /** UPDATE clicked
   * find and set new product to fill form
   * remove the product from main list
   */

  function productClicked(id) {
    setNewProduct(products.find((item) => item.id === id));
    setProducts((oldProducts) => oldProducts.filter((item) => item.id !== id));
    setUpdate(true);
  }

  /** CANCEL update
   * repopulate main list with update product
   * reset new product
   * clear the form
   */

  function clearUpdate() {
    setProducts((oldProducts) => [newProduct, ...oldProducts]);
    setNewProduct(productObj);
    setUpdate(false);
  }

  /** delete clicked */
  function deleteClicked(id) {
    if (window.confirm("bu ürünü silmek istediğinizden emin misiniz")) {
      deleteProduct(id);
    }
  }
  /********************************
   * VIEWS
   *******************************/

  /** SHOW VIEW  */

  return (
    <div>
      <form
        className="product-form"
        onSubmit={submitForm}
      >
        <input
          type="text"
          name="name"
          placeholder="product name..."
          onChange={handleChange}
          value={newProduct.name}
        ></input>
        <input
          type="number"
          name="price"
          placeholder="price"
          onChange={handleChange}
          value={newProduct.price}
        ></input>

        <button> {update ? "UPDATE" : "ADD"} PRODUCT</button>
        {update && <button onClick={clearUpdate}>CANCEL</button>}
      </form>

      <div className="product-page">
        <div className="product-content">
          {products.map((item, index) => {
            return (
              <div
                key={index}
                className="product-row"
              >
                <div className="product-id">{item.id}</div>
                <div className="product-cat">{item.category}</div>
                <div className="product-name">{item.name}</div>
                <div className="product-price">{item.price}</div>
                {!update && (
                  <div>
                    <button onClick={() => deleteClicked(item.id)}>
                      DELETE
                    </button>
                    <button onClick={() => productClicked(item.id)}>
                      UPDATE
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
