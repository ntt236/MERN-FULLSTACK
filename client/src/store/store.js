import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductReducer from './admin/product-slice'
import fetchProductReducer from './shop/product-slice'
import shopCartReducer from './shop/cart-slice'
import shopAddressReducer from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'
import adminOrderSlice from './admin/order-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductReducer,
        adminOrder: adminOrderSlice,


        shopProducts: fetchProductReducer,
        shopCart: shopCartReducer,
        shopAddress: shopAddressReducer,
        shopOrder: shopOrderSlice,
    },
})

export default store;