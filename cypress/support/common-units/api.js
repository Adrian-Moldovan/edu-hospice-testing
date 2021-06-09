const apiUrl = Cypress.config('apiUrl');


// login user
export const loginUser = (email, pass) => {
    let requestOptins = {
        method: 'POST', 
        url: `${apiUrl}/auth/login`,
        failOnStatusCode: false, 
        body: {
            "email": email,
            "password": pass
        }
    };

    return cy.request(requestOptins);
}


// 
export const provideLoginToken = (username, password) => {
    let request = loginUser(username, password);

    return new Promise((resolve, reject) => {
        try{
            request.then((response) => { 
                expect(response.status).to.eq(200);
                resolve(response.body.accessToken);
            })
        }
        catch(e){
            reject(e);
        }   
    });
}


//
export const requestWithToken = (method, urlSuffix, token, body = {}) => {
    // const authorization = `bearer ${ token }`;
    let requestOptions = {
        method, 
        url: `${apiUrl}/${urlSuffix}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false, 
        body
    };

    return cy.request(requestOptions);
}