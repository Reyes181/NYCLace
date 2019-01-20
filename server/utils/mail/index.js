const mailer = require('nodemailer');
const  welcome  = require('./welcome_template');
const purchase = require('./purchase_template');
const resetPass = require('./reset_template');
require('dotenv').config();

const getEmailData = (to,name,token,type,transactionData) => {
    let data = null;
    
    switch(type){
        case 'welcome':
            data = {
                from: 'NYCLace <codeservice10453@gmail.com>',
                to,
                subject: `Welcome ${name}, and Thank You for Joining NYCLace`,
                html: welcome()
            }
        break;
        case 'purchase':
            data = {
                from: 'NYCLace <codeservice10453@gmail.com>',
                to,
                subject: `Purchase summary for ${name}`,
                html: purchase(transactionData)
            }
        break;
        case 'reset_password':
            data = {
                from: 'NYCLace <codeservice10453@gmail.com>',
                to,
                subject: `${name}, password was asked to reset`,
                html: resetPass(transactionData)
            }
        break;
        default:
            data;
    }
    
    return data
}

const sendEmail = (to,name,token,type,transactionData = null) => {
    const sntpTransport = mailer.createTransport({
        service:'Gmail',
        auth:{
            user: 'codeservice10453@gmail.com',
            pass: process.env.PASS
        }
    });
    
    const mail = getEmailData(to,name,token,type,transactionData)
    
    sntpTransport.sendMail(mail,function(error,response){
        if(error){
            console.log(error);
        } else {
            console.log('email sent');
        }
        sntpTransport.close();
    });
};

module.exports = sendEmail;