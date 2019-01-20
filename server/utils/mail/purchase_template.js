const purchase = (data) => {
    
    const getItems = () => {
        let template = '';
        
        data.product.forEach(item=>{
            template += `
              <tr>
                <td align="left">
                  <h1 style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:normal; margin:0 auto; font-size:16px; color:#111111; letter-spacing:-0.5px; line-height:48px">Order #: ${item.porder} </h1>
                </td>
              </tr>
              <tr>
                <td align="left">
                  <h1 style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:normal; margin:0 auto; font-size:16px; color:#111111; letter-spacing:-0.5px; line-height:48px">Product: ${item.name} </h1>
                </td>
              </tr>
              <tr>
                <td align="left">
                  <h1 style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:normal; margin:0 auto; font-size:16px; color:#111111; letter-spacing:-0.5px; line-height:48px">Qty: ${item.qty} </h1>
                </td>
              </tr>
              <tr>
                <td align="left">
                  <h1 style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:normal; margin:0 auto; font-size:16px; color:#111111; letter-spacing:-0.5px; line-height:48px">Size: ${item.shoesize} ${item.clothesize} </h1>
                </td>
              </tr>
              <tr>
                <td align="left">
                  <h1 style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:normal; margin:0 auto; font-size:16px; color:#111111; letter-spacing:-0.5px; line-height:48px">Price: $${item.price} </h1>
                </td>
              </tr>

            `
        })
        
        return template;
    }
    
    return `
        
        <html>
          
          <head>
            <meta name="viewport" content="width=device-width">
            <style type="text/css">
              /* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */
              #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
              .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force HM to display emails at full width */
              .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force HM to display normal line spacing */
              body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
              table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
              img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
              /* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */
              body{margin:0; padding:0;}
              img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
              body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}
              table {border-collapse: collapse;}
              img {display:block;}
              span.preheader { display: none !important; }
              a[x-apple-data-detectors] {color: inherit !important;text-decoration: none !important;font-size: inherit !important;font-family: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important;}
            </style>
            <style type="text/css" id="hs-inline-css">
              .preheader, span[summary="preheader"]{ display: none !important; Margin-left: -9999 !important; width: 0 !important; height: 0 !important; visibility: hidden !important; min-width: 0 !important; min-height: 0 !important; font-size: 0 !important; line-height: 0 !important; }
                .dbco-body {border:15px solid #65648c;}
                .border-gap {border:15px solid #FFFFFF;}
                .inner-table {width:93.75%;max-width:630px;Margin:0 auto;}
                .alt-table {width:84.375%;max-width:570px;Margin:0 auto;}
                
                
                
                
                
                
                
                body { font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif; color: #090B0A; }
                 p { font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif; font-weight: normal;font-size:16px;margin:0 auto;letter-spacing:0;line-height:32px;}
                h1, h2, h3, h4, h5, h6 { font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif; font-weight: bold; margin:0 auto;}
                 h1{font-size:40px;color:#111111;letter-spacing:-0.5px;line-height:48px;}
                 h2{font-size:24px;letter-spacing:0;line-height:36px;}
                h3{font-size:10px;color:#111111;letter-spacing:1px;text-transform:uppercase;}
                
                img + div { display:none; }
                .header-table{border-top:45px solid #ffffff; border-bottom:45px solid #ffffff;}
                .header-table span{ font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif;font-weight: bold;font-size:9px;color:#a0a0a0;letter-spacing:1px;line-height:22px;border-bottom: 1px solid #a0a0a0;display:inline-block;}
        		    .hello{ font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif;font-weight: bold;font-size:10px;color:#65648c;letter-spacing:1px;text-transform:uppercase;border:30px solid #FFFFFF;}
                .hero p{color: #a0a0a0;margin-top:20px;margin-bottom:30px;}
                .item-text{ font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif;font-weight: normal;font-size:14px;color:#6d6d6d;letter-spacing:0;line-height:26px;}
                .author-table span{ font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif; font-weight: bold; font-size:10px;letter-spacing:1px;}
                
                
                
                .hero-side{width:16.67%;}
                
                
                
                .card-side{width:19.52%;}
                
                .item-total-odd .item-icon {border-right: 26px solid #f7f7f7;}
                .footer-table a,.footer-table span { font-family: 'Aktiv Grotesk', BlinkMacSystemFont, Helvetica,Arial,sans-serif;font-weight: bold;font-size:10px;letter-spacing:1px;line-height:30px;color:#666666;text-decoration:none;text-transform:uppercase;}
            </style>
            <style type="text/css" id="no-inline-css">
              @media screen and (max-width:9999px){
                  .main-cta:hover,* [summary="main-cta"]:hover {color:inherit !important;background-color:inherit !important;}
                  .card-cta:hover,* [summary="card-cta"]:hover {color:inherit !important;background-color:inherit !important;}
                  .inv-cta:hover,* [summary="inv-cta"]:hover {background-color:inherit !important;}
                  
              }
              @media only screen and (max-width: 599px){
                  .header-td{display: inline-block !important;text-align:center !important;width:100% !important;}
                  .header-td.center a{margin-top:30px !important;display: block !important;}
                  .header-td.center img{max-width:195px !important;margin: auto !important;}
                  .header-td.right{display:none !important;}
                  .hello {border-bottom: 20px solid #ffffff !important;}
                  .hero-p{width:100% !important;}
                  .card-text h1 {margin-bottom:15px !important;}
                  
                  
                  .header-table td {display:inline-block;}
                  .list-table{border: none !important;margin-bottom:15px !important;}
                  .item-total{border-width: 15px !important;border-bottom-width:0 !important;}
                  .list-table-td{display:block !important;}
                  .item-td{display:block !important;border:none !important;width:100% !important;}
                  .item-icon{margin-bottom:30px !important;}
                  h1{font-size:30px !important;line-height:36px !important;}
                  h2{font-size:18px !important;line-height:27px !important;}
                  p{font-size:14px !important;line-height:28px !important;}
                  .logo-gap{width:5% !important;}
                  .inv-inner-table{border-top-width:55px !important;border-bottom-width:55px !important;}
                  .footer-table * {font-size:9px !important;}
                  .footer-table .middle-gap, .footer-table .extra-spacing {display:none !important;}
                  .footer-table .row {display:block !important;}
                  .footer-table .bottom-row {margin-bottom:15px !important;}
                  .card-bottom, .card-bottom img{height:auto !important;}
                  .card-text h1{display:block !important;font-size:20px !important;line-height:24px !important;}
                  .card-content-table {display:none !important;}
                
              }
              @media only screen and (max-width: 480px){
                body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} 
                body{width:100% !important; min-width:100% !important;} 
              }
            </style>
            <meta name="generator" content="HubSpot">
            <meta name="x-apple-disable-message-reformatting">
          </head>
          <!--[if !((gte mso 9)|(IE))]>
            <!-->
            
            <body bgcolor="#FFFFFF" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; color:#090b0a">
            <!--<![endif]-->
            <table id="dbco-body" class="dbco-body" width="100%" height="100%" align="center"
            border="15" cellspacing="0" cellpadding="0" style="border:15px solid #65648c; background-color:#FFFFFF"
            bgcolor="#FFFFFF">
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <!-- START LIQUID WRAPPER -->
                    <!--[if mso]>
                      <table cellpadding="0" cellspacing="0" border="0" style="padding:0px;margin:0px;width:100%;">
                        <tr>
                          <td style="padding:0px;margin:0px;">&nbsp;</td>
                          <td style="padding:0px;margin:0px;" width="640">
                          <![endif]-->
                          <table class="inner-table border-gap header-table" align="center" valign="top"
                          cellpadding="0" cellspacing="0" style="border:15px solid #ffffff; width:93.75%; max-width:630px; Margin:0 auto; border-top:45px solid #ffffff; border-bottom:45px solid #ffffff"
                          width="93.75%">
                            <tbody>
                              <tr>
                                <td class="center header-td" align="center" valign="middle" width="33.33%">
                                  <a href="/"
                                  data-hs-link-id="0" target="_blank">
                                    <img src="https://res.cloudinary.com/reyes181/image/upload/v1541155251/logo_2.png"
                                    width="181" style="width:100%;max-width:181px;display:block;">
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="hero hero-outer-table border-gap" summary="hero-outer-table" align="center"
                          valign="top" cellpadding="0" cellspacing="0" style="border:15px solid #ffffff; width:100%; max-width:930px; Margin:0 auto"
                          width="100%">
                            <tbody>
                              <tr>
                                <td>
                                  <table class="inner-table" summary="inner-table" align="center" valign="top" border="0"
                                  cellpadding="0" cellspacing="0" style="width:93.75%; max-width:630px; Margin:0 auto"
                                  width="93.75%">
                                    <tbody>
                                      <tr>
                                        <td class="hello" align="center" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; color:#424659; letter-spacing:1px; text-transform:uppercase; border:30px solid #ffffff">Invoice Order</td>
                                      </tr>
                                      <tr>
                                        <td align="center">
                                          <h1 style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; margin:0 auto; font-size:40px; color:#111111; letter-spacing:-0.5px; line-height:48px">Thank You For Your Order</h1>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height="25" style="font-size:0;line-height:0;height:25px;">&nbsp;</td>
                                      </tr>
                                      ${getItems()}
                    
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
        
                          
                          <table class="inner-table border-gap footer-table" align="center" valign="top"
                          cellpadding="0" cellspacing="0" style="border:15px solid #ffffff; width:93.75%; max-width:630px; Margin:0 auto"
                          width="93.75%">
                            <tbody>
                              <tr>
                                <td height="30" style="height:30px;font-size:0;line-height:0;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td align="center"> <span class="row top-row" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase">
                            <a href="/" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase" data-hs-link-id="0" target="_blank">FOLLOW @NYCLACE</a>
                            <span class="gap" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase"><span class="extra-spacing" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase">&nbsp; </span>&nbsp;
                                  | &nbsp; <span class="extra-spacing" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase"> &nbsp;</span></span>
                                  <a
                                  href="/"
                                  style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase"
                                  data-hs-link-id="1" target="_blank">VISIT NYCLACE.COM</a>
                                    </span> <span class="gap middle-gap" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase">&nbsp; &nbsp; | &nbsp; &nbsp;</span>
        
                                    <span
                                    class="row bottom-row" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase">
                                      <a href="/"
                                      style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase"
                                      data-hs-link-id="0" target="_blank">VISIT MY RESUME</a> <span class="gap" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase"><span class="extra-spacing" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase">&nbsp; </span>&nbsp;
                                      | &nbsp; <span class="extra-spacing" style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase"> &nbsp;</span></span>
                                      <a
                                      href="/"
                                      style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase"
                                      data-hs-link-id="0" target="_blank">UNSUBSCRIBE</a>
                                        </span>
                                </td>
                              </tr>
                              <tr>
                                <td align="center"> <span style="font-family:'Aktiv Grotesk', BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:bold; font-size:10px; letter-spacing:1px; line-height:30px; color:#666666; text-decoration:none; text-transform:uppercase">NYCLace, 458 Broadway, New York, NY</span>
        
                                </td>
                              </tr>
                              <tr>
                                <td height="75" style="height:75px;font-size:0;line-height:0;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso]>
                          </td>
                          <td style="padding:0px;margin:0px;">&nbsp;</td>
                        </tr>
                      </table>
                    <![endif]-->
                    <!-- END LIQUID WRAPPER -->
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- end coded_template: id:5216774444 path:Custom/email/dbco/dbco-master.html
            -->
            <img src="https://get.invisionapp.com/e1t/o/*W7ZDNqd4x5RzpW8_h1K_6dQt8j0/*W2MLbJH2vRJvSW1DSvXJ5KDq5s0/5/f18dQhb0KdhBBXTzwW6Klzbr2nxYyfVKfMgr2sc_sDVSn87f2jz_TZVcWjvG7dHy9TW2MlrCs6W4B9YW49-TfR5Z8ktvVMXXL65gtVZ3N1Jp48cLpzR2W8v-4Hc5MpTdgW6jrfBN160KD6W1GH0D85QN0VGVLFXtf4t8Rcf101"
            alt="" width="1" height="1" border="0" style="display:none!important;min-height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important">
            <style>
              @media print{#_hs { background-image: url('https://get.invisionapp.com/e1t/o/*W7ZDNqd4x5RzpW8_h1K_6dQt8j0/*MjcHHv3NBWmW2SfCLn5t9Rth0/5/f18dQhb0KdhGBSJRcW6Klzbr2nxYyfVKfMgr2sc_sDW7Sdfkp6-_3RvN1zW07dzD-dgW1tw7Sh7b9zZjW7N9vNq7JCtTPW7MssVF4yNNxpW24RqJ88VD46mW3WYLfT6zpgR8W8r7twk1K-lftW5qmNTY8KRcLDW4h0hw23kBzGCf3wqskP04');}} div.OutlookMessageHeader {background-image:url('https://get.invisionapp.com/e1t/o/*W7ZDNqd4x5RzpW8_h1K_6dQt8j0/*W9fhsQK1kJlPcW1YC55-3mxLWM0/5/f18dQhb0J6x1dBVNN8b5sMmXx1VmW1f7_Bz1V19bNW1N6m0w2zLf-3F2nVMD-s7yKM2xwK0vlGgvVFhShz49KwQ2W3Y1lrL4fGB70W3T1zG74RF_rdVNw7BZ70h-KSN5l141GDfjDmW8X43CQ8gM2LLW85_V-S1D3mpMf6JPk5T01')} table.moz-email-headers-table {background-image:url('https://get.invisionapp.com/e1t/o/*W7ZDNqd4x5RzpW8_h1K_6dQt8j0/*W9fhsQK1kJlPcW1YC55-3mxLWM0/5/f18dQhb0J6x1dBVNN8b5sMmXx1VmW1f7_Bz1V19bNW1N6m0w2zLf-3F2nVMD-s7yKM2xwK0vlGgvVFhShz49KwQ2W3Y1lrL4fGB70W3T1zG74RF_rdVNw7BZ70h-KSN5l141GDfjDmW8X43CQ8gM2LLW85_V-S1D3mpMf6JPk5T01')} blockquote #_hs {background-image:url('https://get.invisionapp.com/e1t/o/*W7ZDNqd4x5RzpW8_h1K_6dQt8j0/*W9fhsQK1kJlPcW1YC55-3mxLWM0/5/f18dQhb0J6x1dBVNN8b5sMmXx1VmW1f7_Bz1V19bNW1N6m0w2zLf-3F2nVMD-s7yKM2xwK0vlGgvVFhShz49KwQ2W3Y1lrL4fGB70W3T1zG74RF_rdVNw7BZ70h-KSN5l141GDfjDmW8X43CQ8gM2LLW85_V-S1D3mpMf6JPk5T01')} #MailContainerBody #_hs {background-image:url('https://get.invisionapp.com/e1t/o/*W7ZDNqd4x5RzpW8_h1K_6dQt8j0/*W9fhsQK1kJlPcW1YC55-3mxLWM0/5/f18dQhb0J6x1dBVNN8b5sMmXx1VmW1f7_Bz1V19bNW1N6m0w2zLf-3F2nVMD-s7yKM2xwK0vlGgvVFhShz49KwQ2W3Y1lrL4fGB70W3T1zG74RF_rdVNw7BZ70h-KSN5l141GDfjDmW8X43CQ8gM2LLW85_V-S1D3mpMf6JPk5T01')}
            </style>
            <div id="_hs"></div>
            </body>
        
        </html>
    `
};

module.exports = purchase;