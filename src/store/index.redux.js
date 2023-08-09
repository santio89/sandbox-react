import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import ThemeReducer from './reducers/theme.reducer'
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const RootReducer = combineReducers({
    theme: ThemeReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["theme"],
    timeout: 0,
    stateReconciler: hardSet,
}

const PersistedReducer = persistReducer(persistConfig, RootReducer)

export const store = createStore(PersistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)