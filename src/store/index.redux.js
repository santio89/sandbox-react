import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import ThemeReducer from './reducers/theme.reducer'
import PresetReducer from "./reducers/preset.reducer";
import { HtmlReducer, CssReducer, JsReducer } from "./reducers/code.reducer";
import ModalReducer from './reducers/modal.reducer'
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import undoable from "redux-undo"

const RootReducer = combineReducers({
    theme: ThemeReducer,
    preset: PresetReducer,
    modal: ModalReducer,
    html: undoable(HtmlReducer, {
        limit: 100,
        undoType: 'HTML_UNDO',
        redoType: 'HTML_REDO',
    }),
    css: undoable(CssReducer, {
        limit: 100,
        undoType: 'CSS_UNDO',
        redoType: 'CSS_REDO',
    }),
    js: undoable(JsReducer, {
        limit: 100,
        undoType: 'JS_UNDO',
        redoType: 'JS_REDO',
    }),
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["theme", "preset", "html", "css", "js"],
    timeout: 0,
}

const PersistedReducer = persistReducer(persistConfig, RootReducer)

export const store = createStore(PersistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)