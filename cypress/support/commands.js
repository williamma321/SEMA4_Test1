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
	
 if (PixelPhtype === 'Pixel')
	{
		cy.get(':nth-child(1) > .mqn-lobby__card__inner > .mqn-lobby__card__meta > .mqn-lobby__card__buttons > .mqn-button').click()
	}
 if (PixelPhtype === 'PixelXL')
	 
	 {		 
		cy.get(':nth-child(2) > .mqn-lobby__card__inner > .mqn-lobby__card__meta > .mqn-lobby__card__buttons > .mqn-button').click() 
	 }
 	
})

Cypress.Commands.add("SelectCarrerType", (PhCrtype) => {
	
 if (PhCrtype === 'Unlocked')
	{
		cy.get('.mqn-h-cards__card--selected > .mqn-h-cards__card__inner > .mqn-h-cards__card__meta > .mqn-h-cards__card__headline').click()
	}
 if (PhCrtype === 'Verizon')
	 
	 {		 
		cy.get(':nth-child(2) > .mqn-h-cards__card__inner > .mqn-h-cards__card__meta > .mqn-h-cards__card__headline').click()
	 }
 if (PhCrtype === 'GoogleFi')
 {
	 cy.get(':nth-child(3) > .mqn-h-cards__card__inner > .mqn-h-cards__card__meta > .mqn-h-cards__card__headline').click()
	 
 }	 
 	
})

Cypress.Commands.add("SelectPhColor", (PhCLRType) => {
	
 if (PhCLRType === 'Black')
	{
		cy.get(':nth-child(1) > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button').click()
		
	}
 if (PhCLRType === 'White')
	 
	 {		 
		cy.get(':nth-child(2) > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button').click()
	 }
 if (PhCLRType === 'NotPink')
 {
	 cy.get(':nth-child(3) > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button').click()
	 
 }	 
 	
})

Cypress.Commands.add("SelectPhStorage", (PhCLRType) => {
	
 if (PhCLRType === '64GB')
	{
		cy.get(':nth-child(1) > .mqn-cards__card__inner > .mqn-cards__card__meta > .mqn-cards__card__headline').click()		
	}
 if (PhCLRType === '128GB')	 
	 {	 
	 
		cy.get(':nth-child(2) > .mqn-cards__card__inner > .mqn-cards__card__meta > .mqn-cards__card__headline').click()
	 }
 
})
