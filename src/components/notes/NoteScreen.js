import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);

    const [formValues, handleInputChange, reset] = useForm(note);

    const { title, body, url } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {

        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset]);

    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }));

    }, [formValues, dispatch]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="what happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (url) &&
                    (
                        <div className="notes__images">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBc4tC4hO2nZ6JMXbfVajq4Ia6nLZDqahKpg&usqp=CAU"
                                alt="Imagen de google"
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default NoteScreen
