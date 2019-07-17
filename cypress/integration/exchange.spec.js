const USERNAME = Cypress.env('EXCHANGE_USERNAME')
const KEY = Cypress.env('EXCHANGE_KEY')
const ADDRESS = Cypress.env('EXCHANGE_ADDRESS')
const ADDRESS_KEY = Cypress.env('EXCHANGE_ADDRESS_KEY')
const AMOUNT_OFFER = Cypress.env('EXCHANGE_AMOUNT_OFFER')
const TOKEN_OFFER = Cypress.env('EXCHANGE_TOKEN_OFFER')
const AMOUNT_REQUEST = Cypress.env('EXCHANGE_AMOUNT_REQUEST')
const TOKEN_REQUEST = Cypress.env('EXCHANGE_TOKEN_REQUEST')


if (USERNAME && KEY && ADDRESS && AMOUNT_OFFER && TOKEN_OFFER && AMOUNT_REQUEST && TOKEN_REQUEST) {
  describe('Test exchange modal', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME, KEY)
    })
  
    it('Go to wallets page', () => {
      cy.goToPage('wallets', 'Wallets')
    })
  
    it('Search for wallet', () => {
      cy.get('.el-input__inner')
        .type(TOKEN_OFFER).should('have.value', TOKEN_OFFER)
      cy.get('aside').find('a.card').should('have.length', 1)
    })
  
    it('Open wallet', () => {
      cy.get('a.card').first().click()
      cy.get('.card_header').first().should('contain', TOKEN_OFFER)
    })
  
  
    it('Open modal', () => {
      cy.get('[data-cy=exchange]').click()
      cy.get('[data-cy=exchangeModal]').should('be.visible')
    })

    it('Select second token', () => {
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(3) > .el-form-item__content > .el-input-group > .el-input-group__append > .el-select > .el-input > .el-input__inner')
        .click()
      cy.get('.el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view')
        .find(`.el-select-dropdown__item:contains("${TOKEN_REQUEST}")`).eq(1)
        .click()
      cy.get('[data-cy=exchangeModal]')
        .find('.el-dialog__body > .el-form > :nth-child(4)')
        .should('be.visible')
    })
  
    it.skip('Validate account field', () => {
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(5) > .el-form-item__content > .el-input > .el-input__inner')
        .type(ADDRESS)
        .should('have.value', ADDRESS)
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(5) > .el-form-item__content > .el-form-item__error')
        .should('not.be.visible')
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(5) > .el-form-item__content > .el-input > .el-input__inner')
        .clear()
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(5) > .el-form-item__content > .el-form-item__error')
        .should('be.visible')
    })
    
    it('Make transfer transaction', () => {
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
        .type(AMOUNT_OFFER)
        .should('have.value', AMOUNT_OFFER)
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
        .type(AMOUNT_REQUEST)
        .should('have.value', AMOUNT_REQUEST)
      cy.get('[data-cy=exchangeModal]')
        .find(':nth-child(5) > .el-form-item__content > .el-input > .el-input__inner')
        .type(ADDRESS)
        .should('have.value', ADDRESS)
      cy.wait(2000)
      cy.get('[data-cy=exchangeModal]')
        .find('.el-button:contains("EXCHANGE")').click()
  
      cy.confirm([KEY])
      cy.contains("New settlement has successfully been created", {timeout: 20000}).should('be.visible')
    })

    if (ADDRESS_KEY) {

      it('Log out', () => {
        cy.get('.el-side-menu .el-menu-item:contains("Logout")').click({ force: true })
        cy.contains('Welcome to D3').should('be.visible')
      })

      it('Make auth in destination account', () => {
        cy.login(ADDRESS, ADDRESS_KEY)
      })
  
      it("Check exchange made", () => {
        cy.goToPage('settlements', 'Exchange')
        cy.get('.navlink:contains("Incoming")')
          .click()
        
        cy.get(`.cell:contains("from ${USERNAME}")`)
      })
    }
  })  
}
