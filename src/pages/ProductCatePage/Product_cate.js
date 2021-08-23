import Header from "../../components/Header";
import { Link, useRouteMatch } from 'react-router-dom';
import './index.css';
import { listProduct, listCategory, getProduct_cate, actAddToCart } from '../../actions/index';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';


function Product_cate(props) {

    const match = useRouteMatch();
    const id = match.params.id;

    const [slCart, setSlCart] = useState(0)
    const [productToCart, setProductToCart] = useState([])

    var cart = JSON.parse(localStorage.getItem('product'))
    var slcart = JSON.parse(localStorage.getItem('slCart')) + 1;


    useEffect(() => {
        axios.get(`/api/getProductCate/${id}`)
            .then(res => {
                const data = res.data;
                props.list(data.product);
                console.log("api:", data.product)
            })

        axios.get('/api/getCategory')
            .then(res => {
                const data = res.data.category;
                console.log(res.data.category)
                props.listcate(data)
            })
    }, [id]);

    const ShowProduct = (product) => {
        var result = null;

        if (product.length > 0) {
            result = product.map((value, index) => {

                return (
                    <div className="card" key={index}>
                        <Link to={`/product-item/${value._id}`}>
                            {<img src={`http://localhost:5000/public/${value.productPictures[0].img}`} alt="Image" />}
                        </Link>
                        <div className="content">
                            <h3>
                                <Link to={`/product-item/${value._id}`}>
                                    {value.name_product}
                                </Link>
                            </h3>
                            <span>
                                <NumberFormat displayType={'text'}
                                    suffix='đ'
                                    thousandSeparator={true}
                                    value={value.price} />
                            </span>
                            <button onClick={() => addToCart(value)}>Add to cart</button>
                        </div>
                    </div>
                )
            })
        }

        return result;
    }

    const ShowCategory = (category) => {
        var result = null;

        if (category.length > 0) {
            result = category.map((value, index) => {
                if (value.status === 'active') {
                    return <Link key={index} className="panel-body panel-10"
                        onClick={() => clickCategory(value._id)}
                        to={`/product_cate/${value._id}`}
                    >{value.name_category}</Link>
                }
            })
        }

        return result;

    }

    const clickCategory = (id) => {
        console.log('hello')
    }

    const addToCart = (value) => {
        props.addToCart(value, 1);
    }

    return (


        <div id="scroll-container">
            <Header />
            <div className="cate">
                <section className="section-cate">
                    <div className="panel panel-default mg-10 panel-10">
                        <div className="panel-heading">
                            <h3 className="panel-title mg-10">Loại sản phẩm</h3>
                        </div>
                        {
                            ShowCategory(props.category)
                        }

                    </div>
                </section>
                <section className="section">
                    <div id="product">
                        {ShowProduct(props.products)}
                    </div>
                </section>
            </div>
        </div>
    );
}

const mapstateToProps = (state) => {
    console.log("state: ", state);
    return {
        products: state.product,
        category: state.category,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        list: (product) => {
            dispatch(listProduct(product));
        },
        listcate: (category) => {
            dispatch(listCategory(category));
        },
        addToCart: (product, qty) => {
            dispatch(actAddToCart(product, qty));
        }
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Product_cate);