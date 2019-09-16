/// <reference types="Cypress" />

describe('Google Store Checkout Form Test', function() {
  it('Test Error filling the Checkout Form', function() {
     
	 // Load Environment Variable
	 
	 const Wait3K = Cypress.env("Page_Short_Wait")
	 const Wait5K = Cypress.env("Page_Med_Wait")
	 const Wait10K = Cypress.env("Page_Long_Wait")
	 const TestSite = Cypress.env("TestURL")
	 
	 // Load Fixture for test data
	 
	 cy.fixture("profile.json").as("profile")
	 cy.fixture("Verify.json").as("TestVerify")
	 cy.fixture("CheckoutFormPgObj.json").as("PageObject")

	cy.visit(TestSite)		
	
	cy.get(':nth-child(8) > .nav-link > .highlightable').click()

	cy.wait(Wait3K)	
		
	cy.get('.cart-button-text').contains('Guest Checkout').click({force:true})		
	
	cy.wait(Wait5K)
	
	cy.get('content > :nth-child(3)').click()	

	// Cypress not support iframe form
	//  All call within the check out form will yield by $iframe
	
     cy.get('#paymentsParentDivIdIframe').then($iframe => {	 
		
		 
		// Click on Verify email Address editor box to enable error message
		cy.iframeClick(this.PageObject.Confirm_email_add_editor_Box.E1, this.PageObject.Confirm_email_add_editor_Box.E2) 
	
		// Verify require email address message
		cy.iframeVerifyMsg(this.PageObject.email_add_editor_ErrMsg.E1,this.PageObject.email_add_editor_ErrMsg.E2,this.TestVerify.email_Er1)		
	
		// Type in Email Address	
		cy.iframeTypeIn(this.profile.t_email,this.PageObject.email_add_editor_Box.E1,this.PageObject.email_add_editor_Box.E2)
		
		cy.iframeClick(this.PageObject.Name_editor_Box.E1, this.PageObject.Name_editor_Box.E2,'M')	
		
		// Verify require confirm email address error message	
		
		cy.iframeVerifyMsg(this.PageObject.Confirm_email_add_editor_ErrMsg.E1,this.PageObject.Confirm_email_add_editor_ErrMsg.E2,this.TestVerify.email_Er2)	
		
		// Verify the 1st email address error message no longer existed
		
		cy.iframeVerifyMsgNotExist(this.PageObject.email_add_editor_ErrMsg.E1,this.PageObject.email_add_editor_ErrMsg.E2)
		
		// Type in the confirm email address
		
		cy.iframeTypeIn(this.profile.t_email,this.PageObject.Confirm_email_add_editor_Box.E1, this.PageObject.Confirm_email_add_editor_Box.E2)		
		
	  
		//Verify the confirm address error message no longer visibile 
	
		cy.iframeVerifyMsgNotExist(this.PageObject.email_add_editor_ErrMsg.E1, this.PageObject.email_add_editor_ErrMsg.E2)	
		
		cy.iframeClick(this.PageObject.Name_editor_Box.E1, this.PageObject.Name_editor_Box.E2)	
		
		cy.iframeClick(this.PageObject.Addrs_Line1_Editor_Box.E1, this.PageObject.Addrs_Line1_Editor_Box.E2,'M')

		// Verify the email form now show the email address and collaped	  
			
		cy.iframeVerifyCpText(this.profile.t_email,this.PageObject.Email_completed_Summary_form.E1)
		
	 		
		// Verify Required Name error message is now shown
		
		cy.iframeVerifyMsg(this.PageObject.Name_editor_ErrMsg.E1,this.PageObject.Name_editor_ErrMsg.E2,this.TestVerify.Name_Er1)		
		
		// Type in the Name
		
		cy.iframeTypeIn(this.profile.t_name,this.PageObject.Name_editor_Box.E1,this.PageObject.Name_editor_Box.E2)
		
		cy.iframeClick(this.PageObject.Addrs_Line1_Editor_Box.E1, this.PageObject.Addrs_Line1_Editor_Box.E2)
			
		cy.iframeClick(this.PageObject.Name_editor_Box.E1, this.PageObject.Name_editor_Box.E2)
		
		
		// Verify Required Name error message is no longer shown
		
		cy.iframeVerifyMsgNotExist(this.PageObject.Name_editor_ErrMsg.E1, this.PageObject.Name_editor_ErrMsg.E2)	
				
		// Verify Address line 1 required error message shown		
	 	
		cy.iframeVerifyMsg(this.PageObject.Addrs_Line1_Editor__ErrMsg.E1,this.PageObject.Addrs_Line1_Editor__ErrMsg.E2,this.TestVerify.Address_Er1)	
		
		// Type in the Address line 1	
		cy.iframeTypeIn(this.profile.t_address1,this.PageObject.Addrs_Line1_Editor_Box.E1, this.PageObject.Addrs_Line1_Editor_Box.E2)
		
		// Need to click on some other editor box to trigger error messages
		
		cy.iframeClick(this.PageObject.ZipCode_Editor_Box.E1,this.PageObject.ZipCode_Editor_Box.E2,'M')
		
		cy.iframeClick(this.PageObject.City_Editor_Box.E1,this.PageObject.City_Editor_Box.E2,'M')
		
		cy.iframeClick(this.PageObject.Addrs_Line2_Editor_Box.E1,this.PageObject.Addrs_Line2_Editor_Box.E2,'M')	
		
		
		// Verify Address line 1 required error message no longer shown		
	 	cy.iframeVerifyMsgNotExist(this.PageObject.Addrs_Line1_Editor__ErrMsg.E1,this.PageObject.Addrs_Line1_Editor__ErrMsg.E2)		
			
		// Verify Error message for required City and Zip code shown			
		
		
		// Verify Require City Error message shown
		
		cy.iframeVerifyMsg(this.PageObject.City_Editor_ErrMsg.E1,this.PageObject.City_Editor_ErrMsg.E2,this.TestVerify.Address_Er_City)	
				
		// Verify Require ZipCode Error message shown	 
		cy.iframeVerifyMsg(this.PageObject.ZipCode_Editor_ErrMsg.E1,this.PageObject.ZipCode_Editor_ErrMsg.E2,this.TestVerify.ZipCode_Er1)	
		
		cy.iframeTypeIn(this.profile.t_City,this.PageObject.City_Editor_Box.E1,this.PageObject.City_Editor_Box.E2)
		
		cy.iframeTypeIn(this.profile.t_zipcode,this.PageObject.ZipCode_Editor_Box.E1,this.PageObject.ZipCode_Editor_Box.E2)		
		
		// Type in the full address and select the state
		cy.iframeClick(this.PageObject.City_Editor_Box.E1,this.PageObject.City_Editor_Box.E2)
		
		cy.iframeTypeIn(this.profile.t_address2,this.PageObject.Addrs_Line2_Editor_Box.E1,this.PageObject.Addrs_Line2_Editor_Box.E2)	
		
		cy.iframeClick(this.PageObject.State_Drop_Box.E1, this.PageObject.State_Drop_Box.E2)
		
		cy.iframeTypeIn(this.profile.t_addressSt,this.PageObject.State_Drop_Box.E1,this.PageObject.State_Drop_Box.E3,'EMF')
		
		
		// Verify Require City Error message no longer shown
	 	
		cy.iframeVerifyMsgNotExist(this.PageObject.City_Editor_ErrMsg.E1,this.PageObject.City_Editor_ErrMsg.E2)				
					
		// Verify Require ZipCode Error message no longer shown	 
		
		cy.iframeVerifyMsgNotExist(this.PageObject.ZipCode_Editor_ErrMsg.E1,this.PageObject.ZipCode_Editor_ErrMsg.E2)				
		
		cy.iframeClick1e(this.PageObject.CCNum_Editor_Box.E1)			 
	 
	 // Verify Phone Number field error message shown 		
	 		
		cy.iframeVerifyMsg(this.PageObject.PhoneNum_Editor_ErrMsg.E1,this.PageObject.PhoneNum_Editor_ErrMsg.E2,this.TestVerify.Phone_Er1)	
		
		//Type in the phone number 
		
		cy.iframeTypeIn(this.profile.t_Phone,this.PageObject.PhoneNum_Editor_Box.E1,this.PageObject.PhoneNum_Editor_Box.E2,'EMF')		
			
			

		// Verify Require Phone Number Error message no longer Shown
		cy.iframeVerifyMsgNotExist(this.PageObject.PhoneNum_Editor_ErrMsg.E1,this.PageObject.PhoneNum_Editor_ErrMsg.E2)
		
		// Click around all Credit Card Editor fields
		
		cy.iframeClick1e(this.PageObject.CC_Name_Editor_Box.E1)		
		
		cy.iframeClick1e(this.PageObject.CCNum_Editor_Box.E1)		
				
		cy.iframeClick1e(this.PageObject.CC_MM_Editor_Box.E1)	

		cy.iframeClick1e(this.PageObject.CC_YY_Editor_Box.E1)				
		
		cy.iframeClick1e(this.PageObject.CC_CVC_Editor_Box.E1)				
		
		cy.iframeClick1e(this.PageObject.CC_Name_Editor_Box.E1)	
		
		cy.iframeClick1e(this.PageObject.CCNum_Editor_Box.E1)			
				
		cy.iframeClick1e(this.PageObject.CC_MM_Editor_Box.E1)	
	
		 	
		//Verify Credit Card Number and Name Error Message shown
		
		cy.iframeVerifyMsg(this.PageObject.CCnum_Editor_ErrMsg.E1,'NO_EL',this.TestVerify.Crtd_Crd_Er1)	
		
		cy.iframeVerifyMsg(this.PageObject.CC_Nam_Editor_ErrMsg.E1,'NO_EL',this.TestVerify.Crtd_Name_Er1)	
		
		cy.iframeVerifyMsg(this.PageObject.CC_MM_Editor_ErrMsg.E1,'NO_EL',this.TestVerify.Crtd_MM_Er1)	
		
		cy.iframeVerifyMsg(this.PageObject.CC_YY_Editor_ErrMsg.E1,'NO_EL',this.TestVerify.Crtd_YY_Er1)	
		
		cy.iframeVerifyMsg(this.PageObject.CC_CVC_Editor_ErrMsg.E1,'NO_EL',this.TestVerify.Crtd_CSV_Er1)	
		
		cy.iframeClick1e(this.PageObject.CCNum_Editor_Box.E1)
		
		
	 })
	 
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 		
		
		const chk_Name_Address_Phone = this.profile.t_email + this.profile.t_name + ', ' + this.profile.t_address1 + ', ' + this.profile.t_address2 + ', ' + this.profile.t_City + ', ' + this.profile.t_addressSt_Shrt + ', ' + this.profile.t_zipcode + ', ' + this.profile.t_Phone
		
		
		//After phone number typed in the form, verify the collaped form has the correct address 	
		
		cy.iframeVerifyCpText(chk_Name_Address_Phone,this.PageObject.Name_Add_Summary_Box.E1)
		

		// Type in Credit Card information
		
		cy.iframeTypeIn1e(this.profile.t_Credit_Crd_N,this.PageObject.CCNum_Editor_Box.E1,'EMF')
		
		cy.iframeTypeIn1e(this.profile.t_Crd_data_M,this.PageObject.CC_MM_Editor_Box.E1)
		
		cy.iframeTypeIn1e(this.profile.t_Crd_data_YY,this.PageObject.CC_YY_Editor_Box.E1)
		
		cy.iframeTypeIn1e(this.profile.t_Crd_data_CVC,this.PageObject.CC_CVC_Editor_Box.E1)
		
		cy.iframeTypeIn1e(this.profile.t_name,this.PageObject.CC_Name_Editor_Box.E1)		
					
		cy.iframeClick1e(this.PageObject.CCNum_Editor_Box.E1)					
	 
	 
	 // Since I am not using a valid credit card, not verify credit card number error message
	 
		//cy.iframeVerifyMsgNotExist(this.PageObject.CCnum_Editor_ErrMsg.E1, 'NO_EL')				
		
	 
	 //Verify Credit Card Name Error no longer Shown
		cy.iframeVerifyMsgNotExist(this.PageObject.CC_Nam_Editor_ErrMsg.E1, 'NO_EL')					 
		
	// Verify all other Credit Card Information Error message no longer shown
	
		cy.iframeVerifyMsgNotExist(this.PageObject.CC_MM_Editor_ErrMsg.E1, 'NO_EL')	
		
		cy.iframeVerifyMsgNotExist(this.PageObject.CC_YY_Editor_ErrMsg.E1, 'NO_EL')	

		cy.iframeVerifyMsgNotExist(this.PageObject.CC_CVC_Editor_ErrMsg.E1, 'NO_EL')			
		
		
	// Click Save Changes button

	 cy.wrap($body)
			.find(this.PageObject.SaveConfirmButton.E1)
			.find(this.PageObject.SaveConfirmButton.E2)
			.should('have.text', this.TestVerify.Service_Label + this.TestVerify.SaveButton_Label)
			.click({multiple:true,force:true})
			 
	 })
	
  })
})



