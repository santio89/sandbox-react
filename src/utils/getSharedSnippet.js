import { firebaseDb as db } from "../config/firebase";
import { ref, child, get } from "firebase/database";
import { toast } from "sonner";

const getSharedSnippet = (userId, snippetId, callback) => {
    let preset = null;

    get(child(ref(db), `snippets/${userId}/${snippetId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            preset = snapshot.val()
            callback(preset)

            toast.message('Snippets', {
                description: `Snippet loaded: ${preset.name}`,
            })
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