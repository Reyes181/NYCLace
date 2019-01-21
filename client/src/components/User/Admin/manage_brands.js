import React, { Component } from 'react';
import FormField from '../../utils/Form/formField';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux';

import { getBrands, addBrand } from '../../../actions/products_actions';

class ManageBrands extends Component {
    
    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value:'',
                config:{
                    name: 'brand_input',
                    type: 'text',
                    placeholder: "Enter brand name"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
        
    }
    
    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata, 'brands');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }
    
    resetFieldHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'brands')
        
        this.setState({
            formdata: newFormdata,
            formSuccess:true
        });
        
        setTimeout(()=>{
            this.setState({
                formSuccess: false
            });
        }, 2500);
    }
    
    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'brands');
        let formIsValid = isFormValid(this.state.formdata, 'brands');
        let existingBrands = this.props.products.brands;
        
        if(formIsValid){
           this.props.dispatch(addBrand(dataToSubmit,existingBrands)).then(response=>{
               if(response.payload.success){
                   this.resetFieldHandler()
               }else{
                   this.setState({formError:true})
               }
           })
        } else {
            this.setState({
                formError: true
            });
        }
    }
    
    showCategoryItems = () => (
        this.props.products.brands ?
            this.props.products.brands.map((item,i)=>(
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>    
            ))
        :null
    )
    
    componentDidMount(){
        this.props.dispatch(getBrands())
    }
    
    render(){
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        
                        <form onSubmit={(event)=> this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
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
                                    Add Brand
                                 </button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageBrands);