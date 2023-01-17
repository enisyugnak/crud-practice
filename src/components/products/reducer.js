const PRODUCT_MODEL = {
  id: '',
  name: '',
  price: '',
  category: '',
  dateCreated: '',
  dateUpdated: '',
};
export const INITIAL_PRODUCT = {
  loading: false,
  error: false,
  temp: PRODUCT_MODEL,
  product: PRODUCT_MODEL,
  list: [],
};

export const reducer = (state, action) => {
  // console.log('state ', state);
  // console.log('action ', action);

  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };

    case 'PRODUCTS_LOADING':
      return {
        ...state,
        error: false,
        loading: true,
      };

    case 'PRODUCTS_READY':
      return {
        ...state,
        loading: false,
        error: false,
        list: action.payload.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      };
    case 'CHANGE_INPUT':
      // console.log('change: ', action.payload);

      return {
        ...state,
        product: {
          ...state.product,
          [action.payload.name]: action.payload.value,
        },
      };

    case 'SUBMIT_FORM':
      // console.log('submit ', action.payload);
      return { ...state, product: { ...action.payload } };

    case 'EDIT_PRODUCT':
      if (state.temp.id) {
        state.list = [state.temp, ...state.list];
      }
      return {
        ...state,
        temp: action.payload,
        product: action.payload,
        list: state.list.filter((item) => item.id !== action.payload.id),
      };

    case 'CANCEL_EDIT':
      return {
        ...state,
        list: [state.temp, ...state.list],
        temp: PRODUCT_MODEL,
        product: PRODUCT_MODEL,
      };

    case 'PRODUCT_ADDED':
      // console.log('product added state: ', state);
      // console.log('product added payload: ', action.payload);

      return {
        ...state,
        list: [action.payload, ...state.list],
        temp: PRODUCT_MODEL,
        product: PRODUCT_MODEL,
      };

    case 'DELETED':
      //alert('ürün başarıyla silinmiştir...');
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };

    default:
      break;
  }
};
