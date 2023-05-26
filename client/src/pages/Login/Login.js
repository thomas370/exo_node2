import './login.scss';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';

const Login = () => {
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();

        const handleMail = (e) => {
            if(e.target.value !== '') {
                setEmail(e.target.value);
            }
        }

        const handlePassword = (e) => {
            if(e.target.value !== '') {
                setPassword(e.target.value);
            }
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== '' && password !== '') {
            const data = {
                mail: email,
                password: password,
            };
            axios
                .post('http://localhost:8000/user/login', data)
                .then((res) => {
                    localStorage.setItem('id', res.data._id);
                        navigate('/admin');
                })
                .catch(function (error) {
                    setError(error.response.data);
                });
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
            <h1>Connection</h1>
            <form className="login-form">
                <div className="form-group">
                    <input type="email" placeholder="email" onChange={handleMail} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="password" onChange={handlePassword} />
                </div>
                {
                    error !== "" &&
                    <span className="login-alert">{error}</span>
                }
                <div className="btn-container">
                    <button onClick={handleSubmit} className='btn'>Login</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Login;
