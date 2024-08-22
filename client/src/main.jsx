import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'; // Import the Toaster component
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store'; // Adjust the path if necessaryimport LoadingSpinner from './components/LoadingSpinner';
import GlobalsModal from './components/globalModal.jsx';
import LoadingSpinner from './components/LoadingSpinner';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={LoadingSpinner} persistor={persistor}>
        <App />
        <GlobalsModal />
        <Toaster closeButton richColors expand={true} position="top-right" duration={4000} /> 
        </PersistGate>
    </Provider>
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();