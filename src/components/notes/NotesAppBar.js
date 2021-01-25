import React from 'react'

const NotesAppBar = () => {
    return (
        <div className="notes__appbar">
            <span>23/01/2021</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}

export default NotesAppBar