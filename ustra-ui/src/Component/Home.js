import { Component } from "react";
import ScrollOption from './ScrollOption';
import ProductList from './ProductList';
import '../Css/Home.css';


class Home extends Component{
    render(){
        return <div className='Home'>
            <h1 className='Home__heading'>Our Products</h1>
             <ScrollOption/>
             <ProductList/>
        </div>
    }
}

export default Home;