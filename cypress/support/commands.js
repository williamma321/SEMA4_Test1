// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// A new custom commands for select the Google Pixel Phone Type  


Cypress.Commands.add("SelectPixelType", (PixelPhtype) => {

	const Phone_Types = {
		Pixel: {
			P_element: ':nth-child(1) > .mqn-lobby__card__inner > .mqn-lobby__card__meta > .mqn-lobby__card__buttons > .mqn-button'
		},
		PixelXL: {
			P_element: ':nth-child(2) > .mqn-lobby__card__inner > .mqn-lobby__card__meta > .mqn-lobby__card__buttons > .mqn-button'
		}
		
		
	}

	const Phone_T = Phone_Types[PixelPhtype]
	
	cy.get(Phone_T.P_element).click()
	
})

Cypress.Commands.add("SelectCarrerType", (PhCrtype) => {

	const Phone_CarrierTypes = {
		Unlocked: {
			P_element: '.mqn-h-cards__card--selected > .mqn-h-cards__card__inner > .mqn-h-cards__card__meta > .mqn-h-cards__card__headline'
		},
		Verizon: {
			P_element: ':nth-child(2) > .mqn-h-cards__card__inner > .mqn-h-cards__card__meta > .mqn-h-cards__card__headline'
		},
		GoogleFi: {
			P_element: ':nth-child(3) > .mqn-h-cards__card__inner > .mqn-h-cards__card__meta > .mqn-h-cards__card__headline'
		}
		
		
	}
	  const C_type = Phone_CarrierTypes[PhCrtype]
 
		cy.get(C_type.P_element).click()
	
})

Cypress.Commands.add("SelectPhColor", (PhCLRType) => {
	
	const Phone_ColorTypes =
	{
		Black: {
			P_element: 	':nth-child(1) > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button'		
		},
		White: {
			P_element: ':nth-child(2) > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button'			
		},
		NotPink:{
			P_element: ':nth-child(3) > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button'
		}
		
	}
	
	const P_Color = Phone_ColorTypes[PhCLRType]
		 
	cy.get(P_Color.P_element).click()	 
 	 
 	
})

Cypress.Commands.add("SelectPhStorage", (Phmemsize) => {
	
	const Phone_memorysizes =
	{
		'64GB': {
			P_element : ':nth-child(1) > .mqn-cards__card__inner > .mqn-cards__card__meta > .mqn-cards__card__headline'
		},
		'128GB':{
			P_element: ':nth-child(2) > .mqn-cards__card__inner > .mqn-cards__card__meta > .mqn-cards__card__headline'
		}	
		
	}
	
	const P_memsize = Phone_memorysizes[Phmemsize]
 		cy.get(P_memsize.P_element).click()	 
 
})


Cypress.Commands.add("iframeClick", (element1,element2,Is_muti) => {
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body')
		
		if (Is_muti === 'M')
		{
			cy.wrap($body)
			.find(element1)
			.find(element2).click({force:true,multiple:true})	
		}
	
		else
		{
		cy.wrap($body)
			.find(element1)
			.find(element2).click({force:true})	
		}
	})
	
})

Cypress.Commands.add("iframeClick1e", (element1,Is_muti) => {
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body')
		
		if (Is_muti === 'M')
		{
			cy.wrap($body)
			.find(element1).click({force:true,multiple:true})	
		}
	
		else
		{
		cy.wrap($body)
			.find(element1).click({force:true})	
		}
	})
	
})


Cypress.Commands.add("iframeVerifyMsg", (element1,element2,ErMsg) => {

	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		 
		const $body = $iframe.contents().find('body')	

		if (element2 === 'NO_EL')
		{
		cy.wrap($body)
		  .find(element1)		
		  .should('have.text', ErMsg)
		  .and('have.attr', 'aria-hidden')
		  .and('equal', 'false')		 
		 
		}
		else
		{
		cy.wrap($body)
		  .find(element1)
		  .find(element2)
		  .should('have.text', ErMsg)
		  .and('have.attr', 'aria-hidden')
		  .and('equal', 'false')		 
			
		}
		
		})
	
})

Cypress.Commands.add("iframeVerifyMsgNotExist", (element1,element2) => {

	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		 
		const $body = $iframe.contents().find('body')			
		
		if (element2 === 'NO_EL')
		{
		cy.wrap($body)
			.find(element1)			
			.and('have.attr', 'aria-hidden')
		    .and('equal', 'true')	 
		}
		else
		{
			cy.wrap($body)
			.find(element1)			
			.find(element2)			
			.and('have.attr', 'aria-hidden')
		    .and('equal', 'true')	 
			
		}
	})
})


Cypress.Commands.add("iframeTypeIn", (Msg,element1,element2,Is_opt) => {
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		 
	const $body = $iframe.contents().find('body') 	
	
	
	if (Is_opt === 'EMF')
	{
		cy.wrap($body)
		   .find(element1)
		   .find(element2)
		   .type(Msg, {force:true})
			.type('{enter}',{force:true})		   
	}
	else 
	{
		cy.wrap($body)
		   .find(element1)
		   .find(element2)
		   .type(Msg,{force:true})
		
	}
	
	
	})
})
	
Cypress.Commands.add("iframeTypeIn1e", (Msg,element1,Is_opt) => {
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		 
	const $body = $iframe.contents().find('body') 	
	
	
	if (Is_opt === 'EMF')
	{
		cy.wrap($body)
		   .find(element1)		   
		   .type(Msg, {force:true})
			.type('{enter}',{force:true})		   
	}
	else 
	{
		cy.wrap($body)
		   .find(element1)		   
		   .type(Msg,{force:true})
		
	}
	
	
	})
})
	
	
	
Cypress.Commands.add("iframeVerifyCpText", (CText,element1) => {
	
    cy.get('#paymentsParentDivIdIframe').then($iframe => {		 
		
		const $body = $iframe.contents().find('body') 
		cy.wrap($body)
			.find(element1)			
			.should('have.text', CText)
		
	})

})	