import { Component } from "react";
import '../Css/ProductList.css';

class ProductList extends Component {
    render() {
        var products = [
            {
                image: '1',
                name: 'Body-wash',
                weigh: '200 ml',
                mrp: '299',
                spMrp: '299',
                rating: '4.4'
            },
            {
                image: '2',
                name: 'Body-wash',
                weigh: '200 ml',
                mrp: '299',
                spMrp: '299',
                rating: '4.4'
            },
            {
                image: '3',
                name: 'Body-wash',
                weigh: '200 ml',
                mrp: '299',
                spMrp: '299',
                rating: '4.4'
            }

        ]

        return <div className='List'>
            {products.map((data) => {
                return (<div className='List__items' key={data.image}>
                    <div className='List__image-block'></div>
                    <div className='List__detail-block'>
                        <span className='product__rating'>{data.rating}</span>
                        <h2 className='product__name'>{data.name}</h2>
                        <p className='product__weigh'>{`(${data.weigh})`}</p>
                        <h3 className='product__mrp'>{`Rs. ${data.mrp}`}</h3>
                        <button className='button'>ADD TO CART</button>
                    </div>

                </div>)
            })}
        </div>
    }
}

export default ProductList;