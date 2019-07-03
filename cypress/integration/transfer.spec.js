const USERNAME = Cypress.env('TRANSFER_USERNAME')
const KEY = Cypress.env('TRANSFER_KEY')
const ADDRESS = Cypress.env('TRANSFER_ADDRESS')
const ADDRESS_KEY = Cypress.env('TRANSFER_ADDRESS_KEY')
const AMOUNT = Cypress.env('TRANSFER_AMOUNT')
const TOKEN = Cypress.env('TRANSFER_TOKEN')

if (USERNAME && KEY && ADDRESS && ADDRESS_KEY && AMOUNT && TOKEN) {
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
  
    describe('Test transfer modal', () => {
      it('Open modal', () => {
        cy.get('[data-cy=transfer]').click()
        cy.get('div.el-dialog').eq(2).should('be.visible')
      })
  
      it('Validate amount field', () => {
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .type(AMOUNT)
          .should('have.value', AMOUNT)
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
          .should('not.be.visible')
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .clear()
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
      })
  
      it('Validate account field', () => {
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
          .type(ADDRESS)
          .should('have.value', ADDRESS)
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
          .should('not.be.visible')
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
          .clear()
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
      })
  
      it('Validate modal - handle an error', () => {
        cy.get('div.el-dialog').eq(2)
          .find('.el-dialog__body > .el-button')
          .click()
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(1) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(3) > .el-form-item__content > .el-form-item__error')
          .should('be.visible')
      })
  
      it('Validate modal - correct', () => {
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .type(AMOUNT)
          .should('have.value', AMOUNT)
        cy.get('div.el-dialog').eq(2)
          .find(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner')
          .type(ADDRESS)
          .should('have.value', ADDRESS)
        cy.get('div.el-dialog').eq(2)
          .find('.el-dialog__body > .el-button')
          .click()
        cy.get('#approval-dialog').should('be.visible')
        cy.get('#approval-dialog i.el-dialog__close').click()
      })
  
      it('Close modal', () => {
        cy.get('div.el-dialog').eq(2)
          .find('i.el-dialog__close')
          .click()
        cy.get('div.el-dialog').eq(2)
          .find('div.el-dialog')
          .should('not.be.visible')
      })
    })
  })  
}
