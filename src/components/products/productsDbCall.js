import { db } from '../../firebase-config';
import {
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore/lite';

const productsCol = collection(db, 'products');

/** GET ALL PRODUCTS */
const getProducts = async (dispatch, catId) => {
  dispatch({ type: 'PRODUCTS_LOADING' });
  const q = query(productsCol, catId && where('category', '==', catId));
  try {
    const data = await getDocs(q);
    dispatch({ type: 'PRODUCTS_READY', payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'ERROR', payload: { error: true } });
  }
};

/** DELETE  product */
const deleteProduct = async (dispatch, id) => {
  const ref = doc(db, 'products', id);
  try {
    await deleteDoc(ref);
    dispatch({ type: 'DELETED', payload: id });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'ERROR', payload: { error: true } });
  }
};

/** ADD new product */
const addProduct = async (dispatch, payload) => {
  try {
    const data = await addDoc(productsCol, {
      ...payload,
      dateCreated: serverTimestamp(),
    });

    dispatch({
      type: 'PRODUCT_ADDED',
      payload: { ...payload, id: data.id },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'ERROR', payload: { error: true } });
  }
};

/** UPDATE  product */
const updateProduct = async (dispatch, payload) => {
  const ref = doc(db, 'products', payload.id);
  try {
    /** TODO: timestamp geri gelmiyor ?? ? */
    // const dt = new Date();
    // const ms = Math.floor(dt.getTime() / 1000);

    await updateDoc(ref, {
      ...payload,
      dateUpdated: serverTimestamp(),
    });

    dispatch({
      type: 'PRODUCT_ADDED',
      payload: { ...payload },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'ERROR', payload: { error: true } });
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct };
