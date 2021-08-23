import './index.css';
import Header from "../../components/Header";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { actDeleteProductInCart, actUpdateProductInCart } from '../../actions/index'
import NumberFormat from 'react-number-format';

function Cart(props) {

    const [productToCart, setProductToCart] = useState([])

    var cart = JSON.parse(localStorage.getItem('CART'))
    var id_user = JSON.parse(localStorage.getItem('ID'))

    const [bigImg, setBigImg] = useState([])

    useEffect(() => {
        if (cart != null) {
            setProductToCart(props.listCart)
        }
    }, [])

    var ele = productToCart.map((value, index) => {
        return (
            <div className="details cart" key={index}>
                {
                    value.product.productPictures.map((value, index) => {
                        if (index < 1) {
                            return <img key={index} src={`http://localhost:5000/public/${value.img}`} alt="" />
                        }
                    })
                }
                <div className="box">
                    <div className="row">
                        <h2>{value.product.name_product}</h2>
                        <span>
                            <NumberFormat displayType={'text'}
                                suffix='đ'
                                thousandSeparator={true}
                                value={value.product.price} />
                        </span>
                    </div>
                    <p>{value.product.description}</p>
                    <div className="amount">
                        <button className="count" onClick={() => updateCart(value.product, value.qty - 1)}> - </button>
                        <span>
                            {value.qty}
                        </span>
                        <button className="count" onClick={() => updateCart(value.product, value.qty + 1)}> + </button>
                    </div>
                </div>
                <div className="delete" onClick={() => onDeleteCart(value.product)}>X</div>
            </div>
        )
    })

    const updateCart = (value, qty) => {
        console.log('valuse: ', value.qty)
        if (qty > 0 && qty <= value.qty) {
            props.updateCart(value, qty)
        }
    }

    const onDeleteCart = (value) => {
        props.deleteCart(value)
    }

    const showTotalAmount = (cart) => {
        var total = 0;
        console.log(cart.length)
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].product.price * cart[i].qty;
            }
        }
        return total;
    }

    const onTotalAmount = () => {
        console.log('onTotalAmount', props.listCart)
        const pd = props.listCart
        console.log('onTotalAmount2', pd)

        var total2 = 0;
        if (pd.length > 0) {
            for (var i = 0; i < pd.length; i++) {
                total2 += pd[i].product.price * pd[i].qty;
            }
        }

        const item = productToCart.map((value) => ({
            product_id: value.product._id,
            qty: pd.qty
        }))

        console.log('item', item)
        console.log('total2', total2)

        console.log('onTotalAmount3', props.listCart)

        if (id_user) {

            if (window.confirm('BẠN MUỐN MUA HÀNG !')) {
                axios.post('/api/postCart', {
                    user: id_user,
                    cartItems: item,
                    totalMoney: total2
                })
                    .then(res => {
                        console.log(res.data)
                    })
            }
        } else {
            if (window.confirm('Bạn chưa đăng nhâp! \nKhông thể mua hàng')) {

            }
        }
    }

    return (
        <div>
            <Header />
            <section className="section">
                {ele}
                <div className="total">
                    <button onClick={onTotalAmount}>Payment</button>
                    <h3>
                        $ <NumberFormat displayType={'text'}
                            suffix='đ'
                            thousandSeparator={true}
                            value={showTotalAmount(props.listCart)} />
                    </h3>
                </div>
            </section>
        </div>
    )
}

const mapstateToProps = (state) => {
    return {
        listCart: state.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (product, qty) => {
            dispatch(actUpdateProductInCart(product, qty))
        },
        deleteCart: (product) => {
            dispatch(actDeleteProductInCart(product))
        }
    }
}


export default connect(mapstateToProps, mapDispatchToProps)(Cart);