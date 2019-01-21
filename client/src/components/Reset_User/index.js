import React, { Component } from 'react';
import axios from 'axios';
import FormField from '../utils/Form/formField';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

class ResetUser extends Component {
    
    state = {
        formError: false,
        formSuccess:false,
        formdata:{
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
        const newFormdata = update(element,this.state.formdata, 'reset_email');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }
    
    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'reset_email');
        let formIsValid = isFormValid(this.state.formdata, 'reset_email');
        
        if(formIsValid){
           axios.post('/api/users/reset_user',dataToSubmit)
           .then(response=>{
               if(response.data.success){
                   this.setState({
                       formSuccess:true
                   });
               }else{
                    this.setState({
                        formError: true
                    });
                }
           }).catch(e => {this.setState({formError: true})});
        } else {
            this.setState({
                formError: true
            });
        }
    }
    
    render() {
        document.title = 'Reset Password - NYCLace';
        return (
            <div style={{paddingTop:'5em'}} className="container">
                <h1>Reset Password</h1>
                <p>Enter the email address thats associated with your account, so a email with a link to change the password can be sent to.</p>
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=> this.updateForm(element)}
                    />
                    
                    <div>
                        {this.state.formSuccess ?
                            <div className="form_success">
                                Email Sent! Please Check Your Email
                            </div>
                            : null
                        }
                        { this.state.formError ?
                            <div className="error_label">
                                Oops! Please check if data entered is correct
                            </div>
                        :null}
                        
                        <button style={{width: '100%'}} onClick={(event)=> this.submitForm(event)}>
                            SEND EMAIL
                        </button>
                    </div>
                </form>
            </div>    
        );
    }
}

export default ResetUser;