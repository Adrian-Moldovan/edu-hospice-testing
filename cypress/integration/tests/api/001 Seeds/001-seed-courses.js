import { provideLoginToken, requestWithToken, resetDatabase } from '../../../../support/common-units/api';
import { courseSeeds } from '../../../../support/seeds/courses';

const username = Cypress.config('authData').admin.username;
const password = Cypress.config('authData').admin.password;
const apiUrl = Cypress.config('apiUrl');


describe('Seed the database', () => {
    //
    it(`Logs in as an admin and seeds the default courses`, () => {
        provideLoginToken(username, password).then(token => {
            //
            for(let i = 0; i < courseSeeds.length; i++){
                requestWithToken('POST', 'admin/courses', token, courseSeeds[i]).then(response =>{
                    expect(response.status).to.eq(200);
                    let courseId = response.body.id;
                    if(courseSeeds[i].sections !== undefined){
                        addCourseSection(token, courseId, courseSeeds[i].sections);
                    }
                });
            }
        });
    });
})


const addCourseSection = (token, courseId, sections) => {
    for (let i = 0; i < sections.length; i++) {
        requestWithToken('POST', `admin/courses/${courseId}/sections`, token, sections[i]).then(response => {
            expect(response.status).to.eq(200);
            let sectionId = response.body.id;
            if(sections[i].contents !== undefined){
                addSectionContent(token, sectionId, sections[i].contents);
            }
        });
    }
}


const addSectionContent = (token, sectionId, contents) => {
    for (let i = 0; i < contents.length; i++) {
        requestWithToken('POST', `admin/courses/sections/${sectionId}/contents`, token, contents[i]).then(response => {
            expect(response.status).to.eq(200);
        });
    }
}