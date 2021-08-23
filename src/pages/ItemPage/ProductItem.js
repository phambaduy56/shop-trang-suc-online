import Header from './../../components/Header'
import './index.css'
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import { getDetailProduct, actAddToCart } from '../../actions/index'
import NumberFormat from 'react-number-format';

function ProductItem(props) {
    const match = useRouteMatch();
    const [product, setProduct] = useState({
        name_product: '',
        price: null,
        discount: null,
        qty: null,
        description: '',
        category_id: '',
        productPictures: []
    })

    const [bigImg, setBigImg] = useState({
        img: '',
    })

    // const [slCart, setSlCart] = useState(0)
    // const [productToCart, setProductToCart] = useState([])

    // var cart = JSON.parse(localStorage.getItem('product'))
    // var slcart = JSON.parse(localStorage.getItem('slCart')) + 1;

    useEffect(() => {
        const id = match.params.id;
        axios.get(`/api/getProductID/${id}`)
            .then(res => {
                const data = res.data.product
                props.getDetai(res.data.product)
                setProduct({
                    ...product,
                    name_product: data.name_product,
                    price: data.price,
                    discount: data.discount,
                    qty: data.qty,
                    description: data.description,
                    productPictures: data.productPictures,
                })
                setBigImg({
                    ...bigImg,
                    img: data.productPictures[0]
                })
            })
    }, [])


    const handlePickImage = (img) => {
        console.log('hello')
        console.log(img)

        setBigImg({
            ...bigImg,
            img: img
        })

    }

    const addToCart = (value) => {
        props.addToCart(value, 1);
    }

    return (
        <div>
            <Header />
            <section className="section">
                <div className="details">
                    <div className="big-img">
                        {
                            <img src={`http://localhost:5000/public/${bigImg.img.img}`} alt="" />
                        }
                    </div>
                    <div className="box">
                        <div className="row">
                            <h2>{props.detailProduct.name_product}</h2>
                            <span>
                                <NumberFormat displayType={'text'}
                                    suffix='đ'
                                    thousandSeparator={true}
                                    value={props.detailProduct.price} />
                            </span>
                        </div>
                        <p>{props.detailProduct.description}</p>
                        <div className="thumb">
                            {
                                product.productPictures.map((value, index) => {
                                    return <img
                                        key={index}
                                        src={`http://localhost:5000/public/${value.img}`} alt=""
                                        onClick={() => handlePickImage(value)}
                                    />
                                }
                                )
                            }
                        </div>
                        <button to="/cart" className="cart" onClick={() => addToCart(props.detailProduct)} >
                            Add to cart
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        detailProduct: state.detailProduct,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetai: (product) => {
            dispatch(getDetailProduct(product))
        },
        addToCart: (product, qty) => {
            dispatch(actAddToCart(product, qty));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);