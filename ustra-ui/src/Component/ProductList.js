import { Component } from "react";
import { withRouter } from "react-router-dom";
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
            select: 'sale'
        }
        this.handleJson = this.handleJson.bind(this);
        this.handleXml = this.handleXml.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleLinkeEvent = this.handleLinkeEvent.bind(this)
    }

    handleLinkeEvent(e, id) {
        let elmnt = document.getElementById(`${id}`);
        elmnt.scrollIntoView({ behavior: "smooth", block: "end", inline: "start" });
        this.props.history.push(`/${id}`)
               
    }

    handleView(e) {

      if(this.state.end === this.state.count)
          this.setState({
              start : 0,
              end : 3,
              view :'[+] View More'
          })
      else 
      this.setState({
        start : 0,
        end : this.state.count,
        view :'[-] View less'
    })
     
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

        this.setState({
            xmlRes: arr,
            isProcessing: false,
            isJson: false,
            count: count
        })
    }


    async componentDidMount() {
        // category
        const ind = this.props.arrId.indexOf(this.props.cat)
        this.setState({
            select: this.props.arrName[ind]
        })


        //  API fetch 
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
                console.log('Json');
            })

    }


    render() {

        /**  For Xml Api fetch render */
        if (!this.state.isJson) {

            if (this.state.isProcessing) {
                return <h1>processing....</h1>
            }

            else {
                return <div className='List'>

                    {this.state.xmlRes.map((data, index) => {
                        if (index < this.state.end && index >= this.state.start)
                            return (<div className='List__items' key={data.id}>

                                <div className='List__image-block'>
                                    <img className='List__image' alt={data.alt} src={data.image} />
                                </div>

                                <div className='List__detail-block'>
                                    {data.rating !== undefined ? <span className='product__rating'>{data.rating.textContent} &#11088;</span> : <span></span>}
                                    <h2 className='product__name'>{data.name}</h2>
                                    {data.weight !== '0' ? <p className='product__weigh'>{`(${data.weight} ${data.weight_unit})`}</p> : <span></span>}
                                    <h3 className='product__mrp'>{`Rs. ${data.final_price}`}<span >{data.price}</span></h3>
                                    <button className='button'>ADD TO CART</button>
                                </div>

                            </div>)
                    })}


                    {/* Bottom Component */}
                    <div className='bottom_wrapper'>
                        <div className='dropdown'>
                            <div className='drop_show'>
                                <span>Showing for</span>


                                <label className="dropdown_label">
                                    <input type="checkbox" className="dd-input" id="test" />

                                    <ul className="dd-menu" >
                                        {this.state.catList.map((data) => {
                                            return <li onClick={(e) => this.handleLinkeEvent(e, data.category_id)}
                                                value={data.category_id}
                                                key={data.category_id}
                                                id={`${data.category_id}-0`}>
                                                {data.category_name}
                                            </li >
                                        })}
                                    </ul>

                                    <div className="dd-button" id="test1">
                                        {this.state.select}
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className='view_wrapper'>
                            <button className='view' onClick={this.handleView}>{this.state.view}</button>
                        </div>

                    </div>
                    {/* Bottom Component */}

                </div>
            }
        }



        else {
            /** For Json return Data */

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
                                    {data.rating !== undefined ? <span className='product__rating'>{data.rating} &#11088;</span> : <span></span>}
                                    <h2 className='product__name'>{data.name}</h2>
                                    {data.weight !== 0 ? <p className='product__weigh'>{`(${data.weight} ${data.weight_unit})`}</p> : <span></span>}
                                    <h3 className='product__mrp'>{`Rs. ${data.final_price}`}<span >{data.price}</span></h3>
                                    <button className='button'>ADD TO CART</button>
                                </div>

                            </div>)
                    })}

                    {/* Bottom Component */}
                    <div className='bottom_wrapper'>
                        <div className='dropdown'>
                            <div className='drop_show'>
                                <span>Showing for</span>


                                <label className="dropdown_label">
                                    <input type="checkbox" className="dd-input" id="test" />

                                    <ul className="dd-menu" >
                                        {this.state.catList.map((data) => {
                                            return <li onClick={(e) => this.handleLinkeEvent(e, data.category_id)}
                                                value={data.category_id}
                                                key={data.category_id}
                                                id={`${data.category_id}-0`}>
                                                {data.category_name}
                                            </li >
                                        })}
                                    </ul>

                                    <div className="dd-button" id="test1">
                                        {this.state.select}
                                    </div>

                                </label>
                            </div>
                        </div>

                        <div className='view_wrapper'>
                            <button className='view' onClick={this.handleView}>{this.state.view}</button>
                        </div>

                    </div>
                    {/* Bottom Component */}

                </div>
            }
        }

    }
}

export default withRouter(ProductList);