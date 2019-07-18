const USERNAME = Cypress.env('SETTINGS_USERNAME')
const KEY = Cypress.env('SETTINGS_KEY')

if (USERNAME && KEY) {
  describe('Test settings page', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME, KEY)
    })
  
    it('Go to settings page', () => {
      cy.goToPage('settings', 'Settings')
    })
  
    it('Change settings', () => {
      cy.get(':nth-child(1) > .el-col > .el-radio-group > :nth-child(2)').click().should(() => {
        expect(localStorage.getItem('settings')).to.eq('{"view":{"fiat":"USD"}}')
      })
      cy.get(':nth-child(2) > .el-col > .el-radio-group > :nth-child(3)').click().should(() => {
        expect(localStorage.getItem('settings')).to.eq('{"view":{"fiat":"USD","crypto":"XRP"}}')
      })
      cy.get(':nth-child(1) > :nth-child(1) > .el-input__inner').type('Europe/Dublin')
      cy.contains('ul', 'Europe/Dublin').click().should(() => {
        expect(localStorage.getItem('settings')).to.eq('{"view":{"fiat":"USD","crypto":"XRP","timezone":"Europe/Dublin"}}')
      })
    })

    describe('Networks', () => {
      it('Register in BTC network', () => {
        cy.get('.el-button:contains("Register in BTC network")')
          .should('be.visible')
          .click()
        cy.contains('You successfully registered in BTC network!', { timeout: 10000 }).should('be.visible')
        cy.get('.el-button:contains("Register in BTC network")').should('not.be.visible')
      })

      it('Register in BTC network', () => {
        cy.get('.el-button:contains("Register in ETH network")')
          .should('be.visible')
          .click()
        cy.contains('You successfully registered in ETH network!', { timeout: 10000 }).should('be.visible')
        cy.get('.el-button:contains("Register in ETH network")').should('not.be.visible')
      })
    })
  
    describe('Public keys', () => {
      let accountSignatories = 0
      let publicKeys = []
      it('Get current amount of public key', () => {
        cy.get('[data-cy="accountSignatories"]').children()
          .then($children => {
            accountSignatories = $children.length
            $children.each(i => {
              publicKeys.push($children[i])
            })
          })
      })
  
      it('Add public key', () => {
        cy.get('[data-cy="addPublicKey"]').click()
        cy.get('[data-cy="addPublicKeyDialog"]')
          .should('be.visible')
        cy.get('[data-cy="addPublicKeyDialog').find('.dialog-form_buttons-block > .action').click()
        cy.confirm([KEY])
      })
  
      it('Download private key', () => {
        cy.get('[data-cy="downloadPrivateKeyDialog"]', { timeout: 10000 })
          .should('be.visible')
        cy.get('[data-cy="buttonDownload"]')
          .click()
        cy.get('[data-cy="buttonConfirm"]')
          .click()
      })
  
      it('Check new public key', () => {
        cy.get('[data-cy="accountSignatories"]', { timeout: 5000 }).children()
          .then($children => {
            expect($children.length).eq(accountSignatories + 1)
          })
      })
  
      it('Remove public key', () => {
        cy.get('[data-cy="accountSignatories"]')
          .children()
          .last()
          .find('[data-cy="removeSignatory"]')
          .click({ force: true })
  
        cy.get('[data-cy="removePublicKeyDialog"]')
          .find('.el-button')
          .contains('Remove')
          .click()

        cy.confirm([KEY])
      })
  
      it('Handle success message', () => {
        cy.get('.el-message', { timeout: 20000 }).should('be.visible')
        cy.get('[data-cy="accountSignatories"]').children()
          .then($children => {
            expect($children.length).eq(accountSignatories)
          })
      })
    })
  })  
}
