const USERNAME = Cypress.env('TRANSFER_USERNAME')
const KEY = Cypress.env('TRANSFER_KEY')
const ADDRESS = Cypress.env('TRANSFER_ADDRESS')
const AMOUNT = Cypress.env('TRANSFER_AMOUNT')
const TOKEN = Cypress.env('TRANSFER_TOKEN')



if (USERNAME && KEY && ADDRESS && AMOUNT && TOKEN) {
  describe('Test wallets page without white list', () => {    
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME, KEY)
    })

    it('Go to wallets page', () => {
      cy.goToPage('wallets', 'Wallets')
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
  
    describe('Test transfer modal', () => {
      it('Open modal', () => {
        cy.get('[data-cy=transfer]').click()
        cy.get('[data-cy=transferModal]').should('be.visible')
      })
  
      it('Validate amount field', () => {
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .type(AMOUNT)
          .should('have.value', AMOUNT)
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
          .should('not.be.visible')
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .clear()
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
      })
  
      it('Validate account field', () => {
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
          .type(ADDRESS)
          .should('have.value', ADDRESS)
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
          .should('not.be.visible')
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
          .clear()
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
      })
  
      it('Validate modal - handle an error', () => {
        cy.get('[data-cy=transferModal]')
          .find('.el-dialog__body > .el-button')
          .click()
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
      })
  
      it('Validate modal - correct', () => {    
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .type(AMOUNT)
          .should('have.value', AMOUNT)
        cy.get('[data-cy=transferModal]')
          .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
          .type(ADDRESS)
          .should('have.value', ADDRESS)
        cy.wait(2000)
        cy.get('[data-cy=transferModal]')
          .find('.el-button:contains("TRANSFER")')
          .click()

        cy.get('#approval-dialog .el-input')
        .each(function ($el, index) {
          cy.wrap($el).find('.el-input__inner')
            .type(Cypress.env('EXCHANGE_KEY'))
            .should('have.value', Cypress.env('EXCHANGE_KEY'))
        })
        cy.wait(2000)
        cy.get('#confirm-approval-form').should('not.be.disabled')
        cy.get('#confirm-approval-form').click({ force: true })
        cy.waitForConfirmation()
      })

      it('Wait success', () => {    
        cy.contains('Transfer has successfully sent', {timeout: 20000}).should('be.visible')
      })
    })
  })  
}
