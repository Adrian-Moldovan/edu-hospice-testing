const apiUrl = Cypress.config('apiUrl');


// parse a JWT Token
export const parseJwt = (token, property = null) => {
    try {
        let tokenData = JSON.parse(atob(token.split('.')[1]));
        return property === null ? tokenData : tokenData[property];
    } catch (e) {
      return null;
    }
  };





// login user
export const loginUser = (email, pass) => {
    let requestOptions = {
        method: 'POST', 
        url: `${apiUrl}/auth/login`,
        failOnStatusCode: false, 
        body: {
            "email": email,
            "password": pass
        }
    };

    return cy.request(requestOptions);
}


// 
export const provideLoginToken = (email, password) => {
    let request = loginUser(email, password);

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

// 
export const resetDatabase = token => {
    let requestOptions = {
        method: 'DELETE', 
        url: `${apiUrl}/admin/tables/truncate`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    };

    return cy.request(requestOptions);
}