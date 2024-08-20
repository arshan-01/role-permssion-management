import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store'; // Adjust the path if necessary
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoadingSpinner from './components/LoadingSpinner';
import { Toaster } from 'sonner'; // Import the Toaster component
import GlobalModal from './components/globalModal';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={LoadingSpinner} persistor={persistor}>
        <App />
        <GlobalModal />
        <Toaster expand={true} position="top-right" duration={4000} /> 
        </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
