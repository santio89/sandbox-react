import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import ThemeReducer from './reducers/theme.reducer'
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist"; 
import localStorage from "redux-persist/es/storage";

const RootReducer = combineReducers({
    theme: ThemeReducer,
})

const persistConfig = {
    key: 'root',
    storage: localStorage,
    whitelist: ["theme"],
    timeout: 0
}

const PersistedReducer = persistReducer(persistConfig, RootReducer)

export const store = createStore(PersistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)