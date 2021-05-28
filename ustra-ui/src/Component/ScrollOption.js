import { Component } from "react";
import '../Css/ScrollOption.css';

class ScrollOption extends Component{
    
    render(){
        var data =[1 , 2 , 3 , 4 , 5 ,6 , 7 ,8 ,9,10];
        return <div className='Scroll__box'>
            {data.map((data)=>{
               return <div className='Scroll__cat' key={data}>{data}</div>
            })}
        </div>
    }
}

export default ScrollOption;