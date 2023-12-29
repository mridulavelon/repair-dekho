import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/counterSlice';
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
   key:'persist-key',
   storage
}
const persistedReducer = persistReducer(persistConfig,counterReducer);
export const store = configureStore({
    reducer: {
        counter: persistedReducer,
      },
})
const persistor = persistStore(store);
export {persistor}