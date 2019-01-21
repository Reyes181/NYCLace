import React, { Component } from 'react';
import {updateUserProfile, clearUpdateUser} from '../../actions/user_actions';
import FormField from '../utils/Form/formField';
import { update, generateData, isFormValid, populateFields } from '../utils/Form/formActions';
import { connect } from 'react-redux';

class UpdatePersonalNfo extends Component {
    
    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter first name'
                },
                validation:{
                    required:true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            lastname: {
                element: 'input',
                value: '',
                config:{
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter last name'
                },
                validation:{
                    required:true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter email address'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
    }
    
    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata, 'update_user');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }
    
    
    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'update_user');
        let formIsValid = isFormValid(this.state.formdata, 'update_user');
        
        if(formIsValid){
            this.props.dispatch(updateUserProfile(dataToSubmit)).then(()=>{
                if(this.props.user.updateUser.success){
                    this.setState({
                        formSuccess: true
                    },()=>{
                        setTimeout(()=>{
                            this.props.dispatch(clearUpdateUser());
                            this.setState({
                                formSuccess: false
                            })
                        },2500);
                    });
                }
            });
        } else {
            this.setState({
                formError: true
            });
        }
    }
    
    componentDidMount(){
        const newFormdata = populateFields(this.state.formdata,this.props.user.userData);
        this.setState({
            formdata: newFormdata
        })
    }
    
    render(){
        return (
            <div>
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <h2>Personal Information</h2>
                    
                    <div className="form_block_two">
                        <div className="block">
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element)=> this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={'lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element)=> this.updateForm(element)}
                            />
                        </div>
                    </div>
                    
                    <h2>SIGN-IN INFORMATION</h2>
                    
                    <div>
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element)=> this.updateForm(element)}
                        />
                    </div>
                    
                    <div>
                        { this.state.formSuccess ?
                            <div className="form_success">Successfully Updated</div>
                        :null}
                        { this.state.formError ?
                            <div className="error_label">
                                Oops! Please check if data entered is correct
                            </div>
                        :null}
                        
                        <button style={{width: '100%'}} onClick={(event)=> this.submitForm(event)}>
                            UPDATE ACCOUNT
                         </button>
                    </div>
                </form>
            </div>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UpdatePersonalNfo);