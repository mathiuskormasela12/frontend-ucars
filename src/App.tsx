// ========== App
// import all modules
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import persistedStore from './redux/store';
import PrivateRoute from './PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

// import all components
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Detail from './views/Detail';
import AddCar from './views/Add';

function App() {
  const { store, persistor } = persistedStore;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
							)}
            />
            <Route
              path="/car/add"
              element={(
                <PrivateRoute>
                  <AddCar />
                </PrivateRoute>
							)}
            />
            <Route
              path="/:id"
              element={(
                <PrivateRoute>
                  <Detail />
                </PrivateRoute>
							)}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
