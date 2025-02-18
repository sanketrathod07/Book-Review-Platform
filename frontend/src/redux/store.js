import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import bookReducer from './slices/bookSlice';  // Import your book slice reducer
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        books: bookReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };
