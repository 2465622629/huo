import './MenuItem.scss'

import React from 'react'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
                    icon, title, action, isActive = null,
                }) => (
    <button
        className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
        onClick={action}
        title={title}
    >
        <svg className="remix">
            <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
        </svg>
    </button>
)