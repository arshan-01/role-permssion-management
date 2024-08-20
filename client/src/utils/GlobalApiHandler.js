// src/utils/GlobalApiHandler.js
import { useEffect } from 'react';

export const useGlobalDeleteHandler = ({ thunkFunction, fetchFunction, fetchParams, dispatch, openModal, componentName, componentProps }) => {
  
  const handleDeleteClick = (id) => {
    console.log("🚀 ~ handleDeleteClick ~ id:", id)
    openModal({
      componentName,
      componentProps: {
        ...componentProps,
        onDelete: async () => {
          await dispatch(thunkFunction(id));
          dispatch(fetchFunction(fetchParams));
        },
      },
    });
  };

  return {
    handleDeleteClick,
  };
}; 

// src/utils/useDebouncedEffect.js 
// This hook is used to debounce the API calls when the user types in the search box
const useDebouncedEffect = (callback, dependencies, delay = 1000) => {
  useEffect(() => {
    if (dependencies.some(dep => dep !== '')) {
      const handler = setTimeout(() => {
        callback();
      }, delay);

      // Cleanup function to cancel the timeout if the effect is called again before the delay
      return () => clearTimeout(handler);
    }
  }, dependencies);
};

export default useDebouncedEffect;
