import React, { Component } from 'react';
import FormField from '../../utils/Form/formField';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux';

import { getFootwears, addFootwear } from '../../../actions/products_actions';

class ManageFootwears extends Component {
    
    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            style: {
                element: 'input',
                value:'',
                config:{
                    name: 'style_input',
                    type: 'text',
                    placeholder: "Enter style"
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
        const newFormdata = update(element,this.state.formdata, 'footwears');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }
    
    resetFieldHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'footwears')
        
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
        
        let dataToSubmit = generateData(this.state.formdata, 'footwears');
        let formIsValid = isFormValid(this.state.formdata, 'footwears');
        let existingFootwears = this.props.products.footwears;
        
        if(formIsValid){
           this.props.dispatch(addFootwear(dataToSubmit,existingFootwears)).then(response=>{
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
        this.props.products.footwears ?
            this.props.products.footwears.map((item,i)=>(
                <div className="category_item" key={item._id}>
                    {item.style}
                </div>    
            ))
        :null
    )
    
    componentDidMount(){
        this.props.dispatch(getFootwears())
    }
    
    render(){
        return (
             <div className="admin_category_wrapper">
                <h1>Footwears & Apparels</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        
                        <form onSubmit={(event)=> this.submitForm(event)}>
                            <FormField
                                id={'style'}
                                formdata={this.state.formdata.style}
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
                                    Add Style
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

export default connect(mapStateToProps)(ManageFootwears);