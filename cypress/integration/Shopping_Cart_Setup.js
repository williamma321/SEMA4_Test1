/// <reference types="Cypress" />

describe('Setup Shopping Cart Test', function() 

{
  it('Setup Google Store Shopping Cart', function() {
	  
	 const Wait3K = Cypress.env("Page_Short_Wait")
	 const Wait5K = Cypress.env("Page_Med_Wait")
	 const Wait10K = Cypress.env("Page_Long_Wait")
	 const TestSite = Cypress.env("TestURL")
	 
	 cy.fixture("Shopitems.json").as("Shopitem")

	 cy.visit(TestSite)		
	
	
	cy.get('[data-item-count=0]').then(($item_Count) =>{
	
	const my_Val = $item_Count.text()
	
	cy.log(my_Val)	   
	
		if (my_Val === "0" )
		{
	
	cy.get('.header-search-icon > .highlightable > svg').click()
		 
	cy.get('.quantumWizAutocompleteInputText').type(this.Shopitem.name+"{ENTER}")
	
	cy.get('.container-sm-lock')
	
	cy.get('.text-container')
	.contains(this.Shopitem.name).click()	 
	
	cy.wait(Wait3K)
	
	
	cy.get('.pdp-bar-button-wrap').contains('Buy').click()
	//cy.contains('Buy now', { timeout: Wait10K }).click() 
		
	cy.wait(Wait5K)
	
	cy.get('.mqn-lobby__card__buttons',{timeout :Wait10K})
	.contains('Select').click()
	
	cy.wait(Wait3K)

    cy.get(':nth-child(2) > .mqn-h-cards__card__inner > .mqn-h-cards__card__meta > .mqn-h-cards__card__headline')
	.contains(this.Shopitem.Carrier).click()
	
	cy.wait(Wait3K)
	
	//cy.pause()
	
	cy.get(':nth-child(1) > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button').contains('Select').click()
	
	//cy.get('.mqn-button')
	//.contains('Select').click()
	
	cy.wait(Wait3K)
	
	cy.get(':nth-child(2) > .mqn-cards__card__inner > .mqn-cards__card__meta > .mqn-cards__card__headline')
	.contains(this.Shopitem.Memory).click()
	
	cy.wait(Wait3K)
	
	cy.get('.mqn-headline__button > .mqn-button')
	.contains('Skip').click()

	cy.wait(Wait3K)
	
	//cy.contains('Next').click()
	
	cy.get('.cta-button-container > .mdc-button')
	.contains('Add to cart').click()
	
	cy.wait(Wait3K)
	
	cy.get('[jsaction="JIbuQc:IXVHne"] > .mdc-button')
	.contains('Go to cart').click()
	
	cy.wait(Wait3K)
	
	cy.get('div[jscontroller="eoSTdf"] > .button-shadow')
	.contains('Guest Checkout').click()
		
	cy.get('.nav-link > .body-text-4')
	 
		}
		
	})
	
	cy.get('[data-item-count=1]').then(($item_CountE) => {
	
	const checkitem2 = $item_CountE.text()
	
	expect(checkitem2,'0')
	
		
	})
	
	 
  })
})