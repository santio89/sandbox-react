import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import ThemeReducer from './reducers/theme.reducer'
import PresetReducer from "./reducers/preset.reducer";
import CodeReducer from "./reducers/code.reducer";
import ModalReducer from './reducers/modal.reducer'
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const RootReducer = combineReducers({
    theme: ThemeReducer,
    preset: PresetReducer,
    code: CodeReducer,
    modal: ModalReducer,
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["theme", "preset", "code"],
    timeout: 0,
}

const PersistedReducer = persistReducer(persistConfig, RootReducer)

export const store = createStore(PersistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)