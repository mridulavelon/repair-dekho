import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userobj:{},
  productobj:{},
  modelsobj:{},
  modelobj:{},
  billingdetails:{},
  shippingdetails:{},
  cart:[],
  checkout:{}
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addproductobj: (state,action) => {
        state.productobj = action.payload
    },
    addmodelsobj: (state,action) => {
        state.modelsobj = action.payload
    },
    addmodelobj: (state,action) => {
        state.modelobj = action.payload
    },
    addShippingdetails: (state,action) => {
       state.shippingdetails = action.payload
    },
    addbillingdetails: (state,action) => {
       state.billingdetails = action.payload
    },
    addtocart: (state,action) => {
      state.cart.push(action.payload);
    },
    setCart: (state,action) => {
      state.cart = action.payload;
    },
    adduserobj: (state,action) => {
      state.userobj = action.payload;
    },
    addCheckout:() => {
      state.checkout = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addproductobj,addmodelsobj,addmodelobj,addShippingdetails,addbillingdetails,addtocart,setCart,adduserobj,addCheckout } = counterSlice.actions

export default counterSlice.reducer