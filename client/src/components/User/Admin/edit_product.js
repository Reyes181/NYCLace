import React, { Component } from 'react';
import UserLayout from '../../hoc/user_layout';
import FormField from '../../utils/Form/formField';


import { getBrands, getFootwears, getProductDetail, clearProduct, updateProductDetail } from '../../../actions/products_actions';
import { update, generateData, isFormValid, populateFields, populateOptionFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux';

class EditProduct extends Component {
    
    state = {
        formError:false,
        formSuccess:'',
        formdata:{
             name: {
                element: 'input',
                value:'',
                config:{
                    label: 'Product Name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: "Enter product's name"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            quantity: {
                element: 'input',
                value:'',
                config:{
                    label: 'Quantity',
                    name: 'quantity_input',
                    type: 'number',
                    placeholder: "Enter quantity of product"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            style: {
                element: 'input',
                value:'',
                config:{
                    label: 'Product Style SKU',
                    name: 'style_input',
                    type: 'text',
                    placeholder: "Enter product's sku code"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            model: {
                element: 'input',
                value:'',
                config:{
                    label: 'Product Model',
                    name: 'model_input',
                    type: 'text',
                    placeholder: "Enter product's model"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value:'',
                config:{
                    label: 'Product Description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: "Enter product's description"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            color: {
                element: 'textarea',
                value:'',
                config:{
                    label: 'Product True Colors',
                    name: 'description_input',
                    type: 'text',
                    placeholder: "Enter product's actual colors"
                },
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            price: {
                element: 'input',
                value:'',
                config:{
                    label: 'Product Price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: "Enter product's price"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            shoesize: {
                element: 'select',
                value:'',
                config:{
                    label: 'Product Shoe Sizes',
                    name: 'shoesize_input',
                    options:[
                      {key:8,value:8},
                      {key:8.5,value:8.5},
                      {key:9,value:9},
                      {key:9.5,value:9.5},
                      {key:10,value:10},
                      {key:10.5,value:10.5},
                      {key:11,value:11},
                      {key:11.5,value:11.5},
                      {key:12,value:12}
                    ]
                },
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true,
                multiple: true
            },
            clothesize: {
                element: 'select',
                value:'',
                config:{
                    label: 'Product Clothe Sizes',
                    name: 'clothesize_input',
                    options:[
                        {key:'S',value:"S"},
                        {key:'M',value:"M"},
                        {key:'L',value:"L"},
                        {key:'XL',value:"XL"},
                        {key:'XXL',value:"XXL"}   
                    ]
                },
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true,
                multiple: true
            },
            brand: {
                element: 'select',
                value: '',
                config:{
                    label: 'Product Brand',
                    name: 'brands_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true,
            },
            shipping: {
                element: 'select',
                value: '',
                config:{
                    label: 'Shipping',
                    name: 'shipping_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config:{
                    label: 'Available In Stock',
                    name: 'available_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            footwear: {
                element: 'select',
                value: '',
                config:{
                    label: 'Product Style Type',
                    name: 'footwear_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config:{
                    label: 'Publish',
                    name: 'publish_input',
                    options:[
                        {key:true,value:'Public'},
                        {key:false,value:'Hidden'}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            }
        }
    }
    
    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        })
    }
    
    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata, 'edit_product');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }
    
    submitForm = (event) => {
        event.preventDefault();
        
        let id = this.props.match.params.id;
        let dataToSubmit = generateData(this.state.formdata, 'edit_product');
        let formIsValid = isFormValid(this.state.formdata, 'edit_product');
        
        if(formIsValid){
            this.props.dispatch(updateProductDetail(dataToSubmit,id)).then(()=>{
                if(this.props.products.updateDetail.success){
                    this.setState({
                        formSuccess: true
                    },()=>{
                        setTimeout(()=>{
                            this.props.dispatch(clearProduct());
                            this.setState({
                                formSuccess: false
                            })
                            this.props.history.push(`/product_detail/${id}`)
                        },2500);
                    });
                }
            });
            console.log(dataToSubmit)
        } else {
            this.setState({
                formError: true
            });
        }
    }
    
    addData = () => {
       const detail = this.props.products.prodDetail;
        const newFormdata = populateFields(this.state.formdata,detail);
        this.setState({
            formdata: newFormdata
        }) 
    }
    componentDidMount(){
         const formdata = this.state.formdata;
        this.props.dispatch(getBrands()).then(response => {
            const newFormdata = populateOptionFields(formdata,this.props.products.brands,'brand');
            this.updateFields(newFormdata)
        });
        
        this.props.dispatch(getFootwears()).then(response => {
            const newFormdata = populateOptionFields(formdata,this.props.products.footwears,'footwear');
            this.updateFields(newFormdata)
            console.log(newFormdata)
        })
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)) 
        
    }
    
    
     render() {
         console.log(this.props.products.prodDetail)
        return (
            <UserLayout>
                <div>
                    <button onClick={this.addData}>add data</button>
                    <h1>Edit Product</h1>
                    <form onSubmit={(event)=> this.submitForm(event)}>
                        
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'style'}
                            formdata={this.state.formdata.style}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'model'}
                            formdata={this.state.formdata.model}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'quantity'}
                            formdata={this.state.formdata.quantity}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'color'}
                            formdata={this.state.formdata.color}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        
                        <div className="form_devider"></div>
                        
                        <FormField
                            id={'shoesize'}
                            formdata={this.state.formdata.shoesize}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'clothesize'}
                            formdata={this.state.formdata.clothesize}
                            change={(element) => this.updateForm(element)}
                        />
                
                        <div className="form_devider"></div>
                        
                        <FormField
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'shipping'}
                            formdata={this.state.formdata.shipping}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'footwear'}
                            formdata={this.state.formdata.footwear}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <div className="form_devider"></div>
                        
                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <div>
                            {this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                                </div>
                            :null}
                            { this.state.formError ?
                                <div className="error_label">
                                    Oops! Please check if data entered is correct
                                </div>
                            :null}
                            
                            <button style={{width: '100%'}} onClick={(event)=> this.submitForm(event)}>
                                Edit Product
                             </button>
                        </div>
                        
                    </form>
                </div>
            </UserLayout>
        )
     }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(EditProduct);