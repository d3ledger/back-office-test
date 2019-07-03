const USERNAME = Cypress.env('EXCHANGE_USERNAME')
const KEY = Cypress.env('EXCHANGE_KEY')
const ADDRESS = Cypress.env('EXCHANGE_ADDRESS')
const AMOUNT_OFFER = Cypress.env('EXCHANGE_AMOUNT_OFFER')
const TOKEN_OFFER = Cypress.env('EXCHANGE_TOKEN_OFFER')
const AMOUNT_REQUEST = Cypress.env('EXCHANGE_AMOUNT_REQUEST')
const TOKEN_REQUEST = Cypress.env('EXCHANGE_TOKEN_REQUEST')


if (USERNAME) {
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
      cy.get('div.el-dialog').eq(3).should('be.visible')
    })
  
    it('Validate offer amount field', () => {
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
        .type(AMOUNT_OFFER)
        .should('have.value', AMOUNT_OFFER)
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
        .should('not.be.visible')
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
        .clear()
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
        .should('be.visible')
    })
  
    it('Validate request amount field', () => {
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
        .type(AMOUNT_REQUEST)
        .should('have.value', AMOUNT_REQUEST)
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
        .should('be.visible').should('contain', 'Please select asset')
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
        .clear()
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
        .should('be.visible')
    })
  
    it('Select second token', () => {
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(3) > .el-form-item__content > .el-input-group > .el-input-group__append > .el-select > .el-input > .el-input__inner')
        .click()
      cy.get('.el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view')
        .find(`.el-select-dropdown__item:contains("${TOKEN_REQUEST}")`).eq(1)
        .click()
      cy.get('div.el-dialog').eq(3)
        .find('.el-dialog__body > .el-form > :nth-child(4)')
        .should('be.visible')
    })
  
    it('Validate account field', () => {
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(5) > .el-form-item__content > .el-input > .el-input__inner')
        .type(ADDRESS)
        .should('have.value', ADDRESS)
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(5) > .el-form-item__content > .el-form-item__error')
        .should('not.be.visible')
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(5) > .el-form-item__content > .el-input > .el-input__inner')
        .clear()
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(5) > .el-form-item__content > .el-form-item__error')
        .should('be.visible')
    })
  
    it('Validate modal - handle an error', () => {
      cy.get('div.el-dialog').eq(3)
        .find('.el-dialog__body > .el-button')
        .click()
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
        .should('be.visible')
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
        .should('be.visible')
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(5) > .el-form-item__content > .el-form-item__error')
        .should('be.visible')
    })
  
    it('Validate modal - correct', () => {
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
        .type(AMOUNT_OFFER)
        .should('have.value', AMOUNT_OFFER)
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
        .type(AMOUNT_REQUEST)
        .should('have.value', AMOUNT_REQUEST)
      cy.get('div.el-dialog').eq(3)
        .find(':nth-child(5) > .el-form-item__content > .el-input > .el-input__inner')
        .type(ADDRESS)
        .should('have.value', ADDRESS)
      cy.get('div.el-dialog').eq(3)
        .find('.el-button:contains("EXCHANGE")').click({ force: true })
  
      // cy.get('#approval-dialog .el-input')
      // .each(function ($el, index) {
      //   cy.wrap($el).find('.el-input__inner')
      //     .type(Cypress.env('EXCHANGE_KEY'))
      //     .should('have.value', Cypress.env('EXCHANGE_KEY'))
      // })
  
      // cy.get('#confirm-approval-form').should('not.be.disabled')
      // cy.get('#confirm-approval-form').click({ force: true })
      // cy.waitForConfirmation()
  
      // cy.get('div.el-dialog').eq(3)
      //   .find('.el-dialog__body > .el-button')
      //   .click()
    })
  
    // it('Close modal', () => {
    //   cy.get('i.el-dialog__close').eq(3).click()
    //   cy.get('div.el-dialog').eq(3).should('not.be.visible')
    // })
  })  
}