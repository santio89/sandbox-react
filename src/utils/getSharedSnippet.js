import { firebaseDb as db } from "../config/firebase";
import { ref, child, get } from "firebase/database";

const getSharedSnippet = (userId, snippetId, callback) => {
    let preset = null;

    get(child(ref(db), `presets/${userId}/${snippetId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            preset = snapshot.val()
            callback(preset)
        } else {
            callback(null)
        }
    }).catch((e) => {
        console.log("error retrieving from db: ", e);
    }).finally(() => {
        return preset
    });
}

export default getSharedSnippet