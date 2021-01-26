import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { login } from '../../actions/auth';

import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {

    // Es un hook de react redux que permite darnos acceso al dispatch del store
    const dispatch = useDispatch();

    const [{ email, password }, handleInputChange] = useForm({
        email: 'paul@gmail.com',
        password: '123456'
    });

    const handleLogin = e => {
        e.preventDefault();

        console.log({ email, password });
        dispatch(login(12345, 'Paul'));
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form
                onSubmit={handleLogin}
            >
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-block btn-primary"
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}

export default LoginScreen;