import React from 'react'

const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://earthsky.org/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg)'
                }}
            ></div>

            <div className="journal__entry-body" >
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum es el texto que se usa habitualmente en diseño
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>23/01/2021</h4>
            </div>
        </div>
    )
}

export default JournalEntry
