import { provideLoginToken, requestWithToken } from '../../../../support/common-units/api';

const apiUrl = Cypress.config('apiUrl');

const newStudent = Cypress.config('registrationAccounts')[0];

describe('Testing the registration API', () => {
    //
    it(`Registers a new user`, () => {
        let requestOptions = {
            method: 'POST', 
            url: `${apiUrl}/auth/register`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false,
            body: newStudent
        };

        cy.request(requestOptions).then(response => {
            expect(response.status).to.eq(200);
            console.log(response);
        });
    });
})
