import React from 'react'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="what happened today"
                    className="notes__textarea"
                ></textarea>

                <div className="notes__images">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBc4tC4hO2nZ6JMXbfVajq4Ia6nLZDqahKpg&usqp=CAU"
                        alt="Imagen de google"
                    />
                </div>
            </div>
        </div>
    )
}

export default NoteScreen
