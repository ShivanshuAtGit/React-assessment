import { Component } from "react";
import axios from 'axios';
import ScrollOption from './ScrollOption';
import ProductList from './ProductList';
import '../Css/Home.css';


class Home extends Component{

    constructor(props){
        super(props);
        this.state = { scrollRender : {},
                        productRender : {},
                        processing : true
                    }

    }

    async componentDidMount(){

        const url = 'https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob'
        const response = await axios.get(url);
        this.setState({ scrollRender : response.data.category_list,
                        productRender : response.data.product_list,
                        processing : false
        })


    }

    render(){
        if(this.state.processing){
            return <div>processing....</div>
        }

        else{
            return <div className='Home'>
                <h1 className='Home__heading'>Our Products</h1>
                <ScrollOption list={this.state.scrollRender}/>
                <ProductList  list={this.state.productRender}/>
             </div>
        }
         
        
       
    }
}

export default Home;