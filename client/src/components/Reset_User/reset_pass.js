import React, { Component } from 'react';
import axios from 'axios';
import FormField from '../utils/Form/formField';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import Dialog from '@material-ui/core/Dialog';

class ResetPass extends Component {
    
    state = {
        resetToken:'',
        formError: false,
        formErrorMessage:'',
        formSuccess:'',
        formdata:{
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter password'
                },
                validation:{
                    required:true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config:{
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation:{
                    required:true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
    }
    
    
    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata, 'reset_pass');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }
    
    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'reset_pass');
        let formIsValid = isFormValid(this.state.formdata, 'reset_pass');
        
        if(formIsValid){
           axios.post('/api/users/reset_password',{...dataToSubmit, resetToken: this.state.resetToken})
           .then(response=>{
               if(!response.data.success){
                   this.setState({
                       formError: true,
                       formErrorMessage: response.data.message
                   });
               }else{
                    this.setState({
                        formSuccess:true,
                        formError:false
                    });
                    setTimeout(()=>{
                        this.props.history.push('/register_login')
                    },3000)
                }
           });
        } else {
            this.setState({
                formError: true
            });
        }
    }
    
    componentDidMount(){
        const resetToken = this.props.match.params.token;
        this.setState({resetToken});
    }
    
    render() {
        return (
            <div className="container">
                 <h1>Reset Password</h1>
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <div className="form_block_two">
                        <div className="block">
                            <FormField
                                id={'password'}
                                formdata={this.state.formdata.password}
                                change={(element)=> this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={'confirmPassword'}
                                formdata={this.state.formdata.confirmPassword}
                                change={(element)=> this.updateForm(element)}
                            />
                        </div>
                    </div>
                    
                    <div>
                        {this.state.formSuccess ?
                            <div className="form_success">
                                Password has been changed!
                            </div>
                            : null
                        }
                        { this.state.formError ?
                            <div className="error_label">
                                {this.state.formErrorMessage}
                            </div>
                        :''}
                        
                        <button style={{width: '100%'}} onClick={(event)=> this.submitForm(event)}>
                            CHANGE PASSWORD
                        </button>
                    </div>
                </form>
                
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Password Successfully Changed</div>
                        <div>
                            <p>Your password for this account has been changed.</p>
                        </div>
                    </div>
                </Dialog>
            </div>    
        );
    }
}

export default ResetPass;