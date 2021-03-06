Cypress.Commands.add('upload_file', (fileName, selector) => {
  return cy.get(selector).then(subject => {
    return cy.fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0]
        const testFile = new File([blob], fileName, { type: 'text' })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(testFile)
        el.files = dataTransfer.files
        return subject
      })
  })
})

Cypress.Commands.add('waitForConfirmation', (time = 5000) => {
  cy.wait(time)
})

Cypress.Commands.add('waitPage', (page, timeout = 5000) => {
  cy.location('hash', {timeout})
    .should('include', page);
})

Cypress.Commands.add('goToPage', (url, expect) => {
  cy.wait(2000)
  cy.get(`.el-side-menu .el-menu-item:contains("${expect}")`).click({ force: true })
  cy.waitPage(url)
})

Cypress.Commands.add('loginWithFile', (keyPath) => {
  cy.upload_file(keyPath, 'input.el-upload__input')
  cy.get('form > div:nth-child(3) input').click()
  cy.get('.el-scrollbar__view > :nth-child(1)').click()
  cy.get('[data-cy=login').click()
  cy.url().should('be.not.eq', `${Cypress.config('baseUrl')}/#/login`)
})

Cypress.Commands.add('login', (username, key) => {
  cy.get('[name=privateKey]').type(key)
  cy.get('[name=username]').type(username)
  cy.get('form > div:nth-child(3) input').click()
  cy.get('.el-scrollbar__view > :nth-child(1)').click()
  cy.get('[data-cy=login').click()
  cy.url().should('be.not.eq', `${Cypress.config('baseUrl')}/#/login`)
})

Cypress.Commands.add('setTimezone', (timezone) => {
  cy.goToPage('settings', 'Settings')
  cy.get('#timezone_select').should('be.visible').type(timezone)
  cy.get('.el-select-dropdown .el-select-dropdown__list').contains(new RegExp(`^\\s*${timezone}\\s*$`)).click({ force: true }).should(() => {
    const view = JSON.parse(localStorage.getItem('settings')).view

    expect(view).to.have.property('timezone', timezone)
  })
})

Cypress.Commands.add('confirm', (keys) => {
  cy.get('[data-cy=confirmModal] .el-input')
    .each(function ($el, index) {
        cy.wrap($el).find('.el-input__inner')
          .type(keys[index])
          .should('have.value', keys[index])
    })
  cy.wait(2000)
  cy.get('#confirm-approval-form').should('not.be.disabled')
  cy.get('#confirm-approval-form').click({ force: true })
  cy.waitForConfirmation()
})


/*
 * In test environment, clicking a download button opens an alert instead of
 * downloading a file so Cypress can detect window:alert event to verify that
 * the correct file will be downloaded.
 */
Cypress.Commands.add('shouldDownloadCSV', {
  prevSubject: true
}, (subject, expectedFilename, stub) => {
  cy.on('window:alert', stub)
  cy.wrap(subject).should(() => expect(stub.getCall(0)).to.be.calledWith(`downloading ${expectedFilename}`))
})

Cypress.Commands.add('shouldDownloadPDF', {
  prevSubject: true
}, (subject, expectedFilename, stub) => {
  cy.on('window:alert', stub)
  cy.wrap(subject).should(() => expect(stub.getCall(0)).to.be.calledWith(`downloading ${expectedFilename}`))
})
