import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import ThemeReducer from './reducers/theme.reducer'
import PresetReducer from "./reducers/preset.reducer";
import AuthReducer from "./reducers/auth.reducer";
import ModalReducer from './reducers/modal.reducer'
import LoaderReducer from "./reducers/loader.reducer";
import { HtmlReducer, CssReducer, JsReducer } from "./reducers/code.reducer";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import undoable from "redux-undo"

const RootReducer = combineReducers({
    theme: ThemeReducer,
    preset: PresetReducer,
    modal: ModalReducer,
    html: undoable(HtmlReducer, {
        limit: 1000,
    }),
    css: undoable(CssReducer, {
        limit: 1000,
    }),
    js: undoable(JsReducer, {
        limit: 1000,
    }),
    auth: AuthReducer,
    loader: LoaderReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["theme", "html", "css", "js", "auth"],
    timeout: 0,
}

const PersistedReducer = persistReducer(persistConfig, RootReducer)

export const store = createStore(PersistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)