const USERNAME = Cypress.env('DASHBOARD_USERNAME')
const KEY = Cypress.env('DASHBOARD_KEY')

if (USERNAME && KEY) {
  describe('Test dashboard page', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME, KEY)
    })

    it('Make auth', () => {
      cy.get('.portfolio_left')
        .find('.portfolio_header-title')
        .should('be.visible')

      cy.get('.crypto_header')
        .should('be.visible')
      
      cy.get('.list_crypto')
        .should('not.be.empty')
    })
  })  
}
