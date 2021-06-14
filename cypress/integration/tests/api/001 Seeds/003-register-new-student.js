import { studentSeeds } from "../../../../support/seeds/students";

const apiUrl = Cypress.config('apiUrl');

describe('Testing the registration API', () => {
    //
    it(`Registers students`, () => {        
        studentSeeds.forEach(newStudent => {
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
            });
        })
    });
})
