import './index.css'
import avatar from './img/avatar.svg';
import bg from './img/bg.svg'
import wave from './img/wave.png'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { login } from '../../actions/index'
import { isEmpty } from 'validate.js';

function Login(props) {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const [validationMsg, setvalidationMsg] = useState("")

    const validateAll = () => {
        const msg = {}
        if (isEmpty(login.username)) {
            msg.username = "không được để trống username"
        }

        if (isEmpty(login.password)) {
            msg.password = "không được để trống password"
        }

        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    };


    const onSubmit = (e) => {
        e.preventDefault();

        const isvalid = validateAll();

        if (isvalid) {
            axios.post('/api/user/dangnhap', login)
                .then(res => {
                    console.log(res.data)
                    const data = res.data;
                    props.onLogin(data.accessToken)
                    localStorage.setItem("ID", JSON.stringify(data.user._id));
                })
        }
    }

    if (props.token) {
        alert("Đăng nhập thành công")
        localStorage.setItem("TOKEN", JSON.stringify(props.token));
        return <Redirect to="/" />
    }


    return (
        <div>
            <img className="wave" src={wave}></img>
            <div className="container">
                <div className="img">
                    <img src={bg} />
                </div>
                <div className="login-content">
                    <form onSubmit={onSubmit}>
                        <img src={avatar} />
                        <h2 className="title css-font-size">Welcome</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Username"
                                    onChange={(e) => setLogin({ ...login, username: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <Link to='/register'>SiGN UP ?</Link>
                        <div className="btn-css">
                            <button type="submit" className="btn">LOGIN</button>
                            <Link to="/">
                                <input type="submit" className="btn" value="Back" />
                            </Link>
                        </div>
                        <div className="small-css">
                            <small className="form-text text-danger">{validationMsg.username}</small>
                            <small className="form-text text-danger">{validationMsg.password}</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    console.log("state: ", state.login)
    return {
        token: state.login,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogin: (token) => {
            dispatch(login(token))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);