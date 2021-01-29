import { db } from "../firebase/firebase-config";

export const loadNotes = async uid => {

    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    let notes = [];

    notesSnap.forEach(snapHijo => {
        notes = [
            ...notes,
            {
                id: snapHijo.id,
                ...snapHijo.data()
            }
        ];
    });

    return notes;
}