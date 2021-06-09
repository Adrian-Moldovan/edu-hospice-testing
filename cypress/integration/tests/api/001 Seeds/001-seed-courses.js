import { provideLoginToken, requestWithToken } from '../../../../support/common-units/api';
import { courseSeeds } from '../../../../support/seeds/courses';

const username = Cypress.config('authData').admin.username;
const password = Cypress.config('authData').admin.password;


describe('Reset and seeds the courses', () => {
    //
    it(`Logs in as an admin`, () => {
        provideLoginToken(username, password).then(token => {
            //
            for(let i = 0; i < courseSeeds.length; i++){
                requestWithToken('POST', 'admin/courses', token, courseSeeds[i]).then(response =>{
                    console.log(response.body);
                });
            }
        });
    });

})

