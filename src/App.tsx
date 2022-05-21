// ========== App
// import all modules
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import persistedStore from './redux/store';

// import all components
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';

function App() {
  const { store, persistor } = persistedStore;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
