import { Component } from "react";
import {Route,Switch} from 'react-router-dom'
import axios from 'axios';
import ScrollOption from './ScrollOption';
import ProductList from './ProductList';
import '../Css/Home.css';


class Home extends Component{

    constructor(props){
        super(props);
        this.state = { scrollRender : {},
                        productRender : {},
                        processing : true,
                        arrId : [],
                        arrName : []
                    }
                    
    }
 
  

    async componentDidMount(){

        const url = 'https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob'
        const response = await axios.get(url);
        this.setState({ scrollRender : response.data.category_list,
                        productRender : response.data.product_list,
                        processing : false
        })


        let arrId=[],arrName =[];
        response.data.category_list.map((data)=>{
                let id = data.category_id;
                let name = data.category_name;
                arrId.push(id);
                arrName.push(name);   
        })

        this.setState({
            arrId : arrId,
            arrName : arrName
        })

        // console.log(this.state.arrId,this.state.arrName)

    }

    render(){
        if(this.state.processing){
            return <div>processing....</div>
        }

        else{
            return <div className='Home'>
                <h1 className='Home__heading'>Our Products</h1>

                <ScrollOption  list={this.state.scrollRender}/>
           
                    <Switch>
                        <Route exact path='/:name' component={(routeProps)=>{
                            return <ProductList 
                                        list={this.state.productRender} 
                                        cat = {routeProps.match.params.name} 
                                        option={this.state.scrollRender} 
                                        arrId = {this.state.arrId}
                                        arrName={this.state.arrName}
                                    />} }/>

                        <Route exact path='/' component={()=>{
                            return <ProductList 
                                        list={this.state.productRender} 
                                        cat = {'185'} 
                                        option={this.state.scrollRender} 
                                        arrId = {this.state.arrId}
                                        arrName={this.state.arrName}
                                    />}}/>

                    </Switch>

             </div>
        }
         
        
       
    }
}

export default Home;