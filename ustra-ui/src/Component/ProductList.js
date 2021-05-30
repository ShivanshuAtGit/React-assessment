import { Component } from "react";
import { NavLink } from "react-router-dom";
import '../Css/ProductList.css';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            count: '',
            xmlRes: [],
            isProcessing: true,
            isJson: true,
            start: 0,
            end: 3,
            catList: this.props.option,
            view: '[+] View More',
            select : 'select'
        }
        this.handleJson = this.handleJson.bind(this);
        this.handleXml = this.handleXml.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleLink = this.handleLink.bind(this);
    }

    handleLink(e, id) {
        console.log(id);
    }

    handleView(e) {

        if (this.state.end + 1 >= this.state.count) {
            this.setState({
                start: 0,
                end: 3,
                view: '[+] View More'
            })
        }
        else {

            if (this.state.end + 4 >= this.state.count) {
                this.setState({
                    view: '[-] View less'
                })
            }

            this.setState({
                start: this.state.start + 3,
                end: this.state.end + 3
            })

        }

    }

    handleJson(response) {
        response.then(res => {
            this.setState({
                productList: res.products,
                count: res.count,
                isJson: true,
                isProcessing: false,
                
            })

        }
        )
    }

    handleXml(data) {
        let parser = new DOMParser();
        let response = parser.parseFromString(data, "text/xml");
        let count = parseInt(response.getElementsByTagName('count')[0].innerHTML);
        let nameRes = response.getElementsByTagName('name');
        let ratingRes = response.getElementsByTagName('rating');
        let weightRes = response.getElementsByTagName('weight');
        let weight_unitRes = response.getElementsByTagName('weight_unit');
        let idRes = response.getElementsByTagName('id');
        let alt_textRes = response.getElementsByTagName('alt_text');
        let priceRes = response.getElementsByTagName('price');
        let final_priceRes = response.getElementsByTagName('final_price');
        let imageRes = response.getElementsByTagName('x240');

        let arr = [];

        for (let i = 0; i < count; i++) {

            let obj = {
                name: nameRes[i].textContent,
                rating: ratingRes[i],
                weight: weightRes[i].textContent,
                weight_unit: weight_unitRes[i].textContent,
                id: idRes[i].textContent,
                alt: alt_textRes[i].textContent,
                image: imageRes[2 * i].innerHTML,
                price: priceRes[i].textContent,
                final_price: final_priceRes[i].textContent
            };

            arr.push(obj);
        }
        console.log(arr[1]);

        this.setState({
            xmlRes: arr,
            isProcessing: false,
            isJson: false,
            count: count
        })
    }




    async componentDidMount() {

        const url = `https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${this.props.cat}`;

        await fetch(url).then(res => {
            const contentType = res.headers.get("content-type");

            if (contentType === 'application/json; charset=utf-8') {
                this.handleJson(res.json());
            }
            else
                return res.text();
        })
            .then(data => {
                this.handleXml(data);

            }).catch(() => {
                console.warn('mistake');
            })

    }

    render() {

        if (!this.state.isJson) {

            if (this.state.isProcessing) {
                return <h1>processing....</h1>
            }

            else {
                return <div className='List'>

                    {this.state.xmlRes.map((data, index) => {
                        // return <div>{console.log(data)  }</div>;
                        if (index < this.state.end && index >= this.state.start)
                            return (<div className='List__items' key={data.id}>

                                <div className='List__image-block'>
                                    <img className='List__image' alt={data.alt} src={data.image} />
                                </div>

                                <div className='List__detail-block'>
                                {data.rating !== undefined ? <span className='product__rating'>{data.rating.textContent} &#11088;</span>: <span></span> }
                                    <h2 className='product__name'>{data.name}</h2>
                                    {data.weight !== '0' ? <p className='product__weigh'>{`(${data.weight} ${data.weight_unit})`}</p>: <span></span> }
                                    <h3 className='product__mrp'>{`Rs. ${data.final_price}`}<span >{data.price}</span></h3>
                                    <button className='button'>ADD TO CART</button>
                                </div>

                            </div>)
                    })}

                    
<div className='bottom_wrapper'>
                        <div className='dropdown'>
                            <div className='drop_show'>
                                <span>Showing for</span>


                                <label className="dropdown_label">
                                <input type="checkbox" className="dd-input" id="test" />

                                    <ul className="dd-menu" >
                                        {this.state.catList.map((data) => {
                                            return <li  value={data.category_id} key={data.category_id}>
                                                <NavLink className='link' activeClassName='dd_select' to={`/${data.category_id}`}>{data.category_name}</NavLink>
                                            </li >
                                        })}
                                    </ul>

                                    <div className="dd-button">
                                        select
                                    </div>           

                                </label>

                            </div>

                        </div>

                        <div className='view_wrapper'>
                            <button className='view' onClick={this.handleView}>{this.state.view}</button>
                        </div>

                    </div>

                </div>
            }
        }



        else {

            if (this.state.isProcessing) {
                return <p>processing....</p>
            }

            else {

                return <div className='List'>

                    {this.state.productList.map((data, index) => {
                        if (index < this.state.end && index >= this.state.start)
                            return (<div className='List__items' key={data.id}>

                                <div className='List__image-block'>
                                    <img className='List__image' alt={data.alt_text} src={data.image_urls.x240} />
                                </div>

                                <div className='List__detail-block'>
                                    {data.rating !== undefined ? <span className='product__rating'>{data.rating} &#11088;</span>: <span></span> }
                                    <h2 className='product__name'>{data.name}</h2>
                                    {data.weight !== 0 ? <p className='product__weigh'>{`(${data.weight} ${data.weight_unit})`}</p>: <span></span> }
                                    <h3 className='product__mrp'>{`Rs. ${data.final_price}`}<span >{data.price}</span></h3>
                                    <button className='button'>ADD TO CART</button>
                                </div>

                            </div>)
                    })}

                    <div className='bottom_wrapper'>
                        <div className='dropdown'>
                            <div className='drop_show'>
                                <span>Showing for</span>


                                <label className="dropdown_label">
                                <input type="checkbox" className="dd-input" id="test" />

                                    <ul className="dd-menu" >
                                        {this.state.catList.map((data) => {
                                            return <li  value={data.category_id} key={data.category_id}>
                                                <NavLink className='link' activeClassName='dd_select' to={`/${data.category_id}`}>{data.category_name}</NavLink>
                                            </li >
                                        })}
                                    </ul>

                                    <div className="dd-button">
                                        select
                                    </div>           

                                </label>

                            </div>



                        </div>

                        <div className='view_wrapper'>
                            <button className='view' onClick={this.handleView}>{this.state.view}</button>
                        </div>

                    </div>

                </div>
            }
        }

    }
}

export default ProductList;