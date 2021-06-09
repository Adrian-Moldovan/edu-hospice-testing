import { provideLoginToken, resetDatabase } from '../../../../support/common-units/api';

const username = Cypress.config('authData').admin.username;
const password = Cypress.config('authData').admin.password;


describe('Reset the database', () => {
    //
    it(`Logs in as an admin and resets the database`, () => {
        provideLoginToken(username, password).then(token => {
            resetDatabase(token).then(response => {
                expect(response.status).to.eq(200);
            });
        });
    });
})

