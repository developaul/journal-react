import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

// active: null || { id: 'sad12f13fvds123123', title: '', body: '', imageUrl: '', date: 2131231212},

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            };

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            };

        default:
            return state;
    }

}