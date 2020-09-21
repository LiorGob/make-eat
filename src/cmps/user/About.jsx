import React from 'react'

export function About({user}) {
    return (
        <div>
            <aside>
                <h2>About</h2>
                <div>{user.about}</div>
            </aside>
        </div>
    )
}
