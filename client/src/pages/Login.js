import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';


const Login = () => {
    const checkBtn = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));

        setMessage('');
        setLoading(true);


        AuthService.login(formData.username, formData.password).then(
            () => {
                history.push('/profile');
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container mx-auto my-5">
                <img
                    src="/assets/img/Login/loginICON-96.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            name={'username'}
                            defaultValue={'12 Harbor Ave'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type={'password'}
                            className={'form-control'}
                            name={'password'}
                            defaultValue={'password'}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block"
                                disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger"
                                 role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: 'none'}}
                                 ref={checkBtn}/>
                </Form>
            </div>
        </div>
    );
};

export default Login;