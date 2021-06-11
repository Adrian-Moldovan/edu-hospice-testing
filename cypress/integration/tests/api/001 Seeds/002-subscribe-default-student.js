import { provideLoginToken, parseJwt, requestWithToken } from '../../../../support/common-units/api';

const apiUrl = Cypress.config('apiUrl');

const adminUsername = Cypress.config('authData').admin.username;
const adminPassword = Cypress.config('authData').admin.password;

const studentUsername = Cypress.config('authData').student.username;
const studentPassword = Cypress.config('authData').student.password;

let subscribeCourseIds = [1, 2, 5];

let studentId;

describe('Register the default user to courses', () => {
    //
    it(`Logs in as the default user and subscribe to ${subscribeCourseIds.length} courses`, () => {
        provideLoginToken(studentUsername, studentPassword).then(token => {
            studentId = parseJwt(token, 'sub');
            for (let i = 0; i < subscribeCourseIds.length; i++) {
                let requestOptions = {
                    method: 'POST', 
                    url: `${apiUrl}/users/${studentId}/courses/${subscribeCourseIds[i]}/register`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false
                }
                cy.request(requestOptions).then(response => {
                    expect(response.status).to.eq(200);
                });
            }
        });
    });

     //
     it(`Logs in as an admin confirm the subscription and payments for the courses`, () => {
        provideLoginToken(adminUsername, adminPassword).then(token => {
            for (let i = 0; i < subscribeCourseIds.length; i++) {
                let urlSuffix = `admin/users/${studentId}/courses/${subscribeCourseIds[i]}/approve`

                // registration confirm
                requestWithToken('PUT', urlSuffix, token).then(response => {
                    expect(response.status).to.eq(200);

                    //payment confirm
                    requestWithToken('PUT', urlSuffix, token).then(response => {
                        expect(response.status).to.eq(200); 
                    })
                });
            }
        });
    });
})
