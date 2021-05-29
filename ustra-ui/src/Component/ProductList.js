import { Component } from "react";
import '../Css/ProductList.css';

class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {
            productList : this.props.list.products,
            count : this.props.list.count
        }
    }

    render() {

        return <div className='List'>
           
           {this.state.productList.map((data) => {
                return (<div className='List__items' key={data.id}>

                    <div className='List__image-block'>
                        <img className='List__image' alt={data.alt_text} src={data.image_urls.x240}/>
                    </div>

                    <div className='List__detail-block'>
                        <span className='product__rating'>{data.rating}</span>
                        <h2 className='product__name'>{data.name}</h2>
                        <p className='product__weigh'>{`(${data.weight} ${data.weight_unit})`}</p>
                        <h3 className='product__mrp'>{`Rs. ${data.final_price}`}<span >{data.price}</span></h3>
                        <button className='button'>ADD TO CART</button>
                    </div>

                </div>) })}

        </div>
    }
}

export default ProductList;