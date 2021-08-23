import './index.css'
import email from './img/email.png'
import location from './img/location.png'
import phone from './img/phone.png'
import shape from './img/shape.png'
import facebook from './img/facebook-brands.svg'
import instra from './img/instagram-brands.svg'
import twitter from './img/twitter-brands.svg'
import { Link, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { isEmpty, isEmail } from 'validate.js';


function Register() {

    const [validationMsg, setvalidationMsg] = useState("")

    const [regester, setRegester] = useState({
        username: '',
        password: '',
        email: '',
        fullname: '',
        usernumber: '',
    })

    const [check, setCheck] = useState({
        check: 0,
    })

    const validateAll = () => {
        const msg = {}
        if (isEmpty(regester.username)) {
            msg.username = "không được để trống"
        }

        if (isEmpty(regester.password)) {
            msg.password = "không được để trống"
        }

        if (isEmpty(regester.email)) {
            msg.email = "không được để trống"
        }

        // if (!isEmail(regester.email)) {
        //     msg.email = "không đúng định dạng"
        // }

        if (isEmpty(regester.fullname)) {
            msg.fullname = "không được để trống"
        }

        if (isEmpty(regester.usernumber)) {
            msg.usernumber = "không được để trống"
        }

        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const isvalid = validateAll();

        if (isvalid) {
            axios.post('/api/user/dangky', regester)
                .then(res => {
                    console.log(res)
                    setCheck({
                        ...check,
                        check: 1,
                    })
                })
        }
    }


    if (check.check === 1) {
        alert("Đăng ký thành công!")
        return <Redirect to="/Login" />
    }


    return (
        <div>
            <div className="container">
                <span className="big-circle"></span>
                <img src={shape} className="square" alt="" />
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">Chào mừng bạn đến với website của chúng tôi</h3>
                        <p className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                            dolorum adipisci recusandae praesentium dicta!
                        </p>

                        <div className="info">
                            <div className="information">
                                <img src={location} className="icon" alt="" />
                                <p>97 man thiện, hiệp phú, tp Hồ Chí Minh</p>
                            </div>
                            <div className="information">
                                <img src={email} className="icon" alt="" />
                                <p>baduy123@gmail.com</p>
                            </div>
                            <div className="information">
                                <img src={phone} className="icon" alt="" />
                                <p>123-456-789</p>
                            </div>
                        </div>

                        <div className="social-media">
                            <p>Connect with us :</p>
                            <div className="social-icons">
                                <img src={facebook} className="icon" />
                                <img src={instra} className="icon" />
                                <img src={twitter} className="icon" />

                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>

                        <form onSubmit={onSubmit}>
                            <h3 className="title">REGISTER</h3>
                            <div className="input-container">
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    placeholder="Username"
                                    onChange={(e) => setRegester({ ...regester, username: e.target.value })}
                                />
                                <small className="form-text text-danger">{validationMsg.username}</small>
                            </div>
                            <div className="input-container">
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Email"
                                    onChange={(e) => setRegester({ ...regester, email: e.target.value })}
                                />
                                <small className="form-text text-danger">{validationMsg.email}</small>
                            </div>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    placeholder="Password"
                                    onChange={(e) => setRegester({ ...regester, password: e.target.value })}
                                />
                                <small className="form-text text-danger">{validationMsg.password}</small>

                            </div>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    placeholder="Fullname"
                                    onChange={(e) => setRegester({ ...regester, fullname: e.target.value })}
                                />
                                <small className="form-text text-danger">{validationMsg.fullname}</small>
                            </div>
                            <div className="input-container">
                                <input
                                    type="number"
                                    name="phone"
                                    className="input"
                                    placeholder="Phone"
                                    onChange={(e) => setRegester({ ...regester, usernumber: e.target.value })}
                                />
                                <small className="form-text text-danger">{validationMsg.usernumber}</small>
                            </div>
                            <div className="btn-css">
                                <button type="submit" className="btn btn-primary">
                                    REGISTER
                                </button>
                                <Link to="/login">
                                    <button type="submit" className="btn btn-primary">
                                        Back
                                    </button>
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;