import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { types } from '../../types'

export const Navbar = () => {
    const context = useContext(AuthContext)
    const { user, dispatch } = context

    const navigate = useNavigate()
    const action = { type: types.logout }
    const handleLogout = () => {
        dispatch(action)
        navigate('/login', { replace: true })
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link
                className="navbar-brand"
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className={(navData) => 'nav-item nav-link ' + (navData.isActive ? 'active' : '')}
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        className={(navData) => 'nav-item nav-link ' + (navData.isActive ? 'active' : '')}
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink
                        className={(navData) => 'nav-item nav-link ' + (navData.isActive ? 'active' : '')}
                        to="/search"
                    >
                        search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nac-item nav-link text-info'>{user.name}</span>
                    <button
                        className="nav-item nav-link btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}