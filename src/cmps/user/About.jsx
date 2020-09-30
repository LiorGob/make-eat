import React from 'react'
export function About({ user }) {
    return (
        <aside>
            <div className="aside-inner">
                <div className="about-name padding-15"><h1>{user.fullName}</h1></div>
                <div className="about-img" style={{ backgroundImage: `url(${user.imgUrl}` }}></div>
                <div className="about-content padding-15">
                    <div className="user-about-text">
                        {user.about && user.about.map((aboutLine, ind) => {
                            return <p key={`p${ind}`}>{aboutLine}</p>
                        })}
                        <ul className="user-stats">
                            {
                                user.userStats.map((stat, ind) => {
                                    return (stat.val > 0 && <li key={`${ind}-stat`}>{stat.txt}: {stat.val}</li>)
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}
