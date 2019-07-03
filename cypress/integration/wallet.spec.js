const USERNAME = Cypress.env('SEARCH_USERNAME')
const KEY = Cypress.env('SEARCH_KEY')
const TOKEN = Cypress.env('SEARCH_TOKEN')

if (USERNAME && KEY && TOKEN) {
  describe('Test wallets page without white list', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME, KEY)
    })
  
    it('Go to wallets page', () => {
      cy.goToPage('wallets', 'Wallets')
    })
  
    describe('Test sorting', () => {
      it('Sort wallets with alphabetical descending order', () => {
        cy.get('#wallets-sort-button').click({ force: true })
        cy.get('.el-dropdown-menu__item:contains("alphabetical (desc)")').click({ force: true })
  
        cy.get('a.card .label').first().invoke('text').as('firstWalletName')
        cy.get('a.card .label').last().invoke('text').as('lastWalletName')
  
        cy.get('@firstWalletName').then(firstWalletName => {
          cy.get('@lastWalletName').should('lte', firstWalletName)
        })
      })
  
      it('Sort wallets with alphabetical ascending order', () => {
        cy.get('#wallets-sort-button').click({ force: true })
        cy.get('.el-dropdown-menu__item:contains("alphabetical (asc)")').click({ force: true })
  
        cy.get('a.card .label').first().invoke('text').as('firstWalletName')
        cy.get('a.card .label').last().invoke('text').as('lastWalletName')
  
        cy.get('@firstWalletName').then(firstWalletName => {
          cy.get('@lastWalletName').should('gte', firstWalletName)
        })
      })
    })
  
    describe('Test search', () => {
      it('Search for wallet', () => {
        cy.get('.el-input__inner')
          .type(Cypress.env('SEARCH_TOKEN')).should('have.value', Cypress.env('SEARCH_TOKEN'))
        cy.get('aside').find('a.card').should('have.length', 1)
      })
  
      it('Open wallet', () => {
        cy.get('a.card').first().click()
        cy.get('.card_header').first().should('contain', Cypress.env('SEARCH_TOKEN'))
      })
    })
  })  
}
