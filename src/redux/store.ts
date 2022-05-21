// ========== Store
// import all modules
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistedReducer = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
  });

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

export default persistedReducer();
