import { Component } from "react";
import '../Css/ScrollOption.css';
import {NavLink} from "react-router-dom";

class ScrollOption extends Component{

    constructor(props){
        super(props);
        this.state = {
            catList : this.props.list
        }
    }

    
    
    render(){

        return <div className='Scroll__box'>
            {this.state.catList.map((data)=>{
               return <NavLink to={`/${data.category_id}`} activeClassName='selected' className='Scroll__cat' style={{backgroundImage: `url(${data.category_image})`}} key={data.category_id}>
                   {data.category_name}
               </NavLink >
            })}
        </div>
    }
}

export default ScrollOption;