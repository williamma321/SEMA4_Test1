/// <reference types="Cypress" />

describe('My First Test', function() {
  it('Test on Line sample GUI', function() {
     
	 const Wait3K = Cypress.env("Page_Short_Wait")
	 const Wait5K = Cypress.env("Page_Med_Wait")
	 const Wait10K = Cypress.env("Page_Long_Wait")
	 const TestSite = Cypress.env("TestURL")
	 

	 cy.visit(TestSite)		
	
	cy.get(':nth-child(8) > .nav-link > .highlightable').click()

	cy.get('div[jscontroller="eoSTdf"] > .button-shadow').click()	
	
	cy.get('b3id-ui-field-text-container').click()
	
	cy.wrap(cy.get('[data-name=ContactEmailField]')).its('aria-hidden').should('eq','false')
	
		
  })
})



