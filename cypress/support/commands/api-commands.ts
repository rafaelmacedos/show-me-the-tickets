import { API_CONFIG, API_ENDPOINTS } from '../api-config';

declare global {
    namespace Cypress {
        interface Chainable {
            apiLogin(credentials: { username: string; password: string }): Chainable<any>;
            apiGetCurrentUser(endpoint: string): Chainable<any>;
            apiGet(token: string, endpoint: string): Chainable<any>;
            apiPost(token: string, endpoint: string, body: any): Chainable<any>;
            apiPut(token: string, endpoint: string, body: any): Chainable<any>;
            apiDelete(token: string, endpoint: string): Chainable<any>;
            compareDatesWithTolerance(date1: string, date2: string): Chainable<boolean>;
        }
    }
}

Cypress.Commands.add('apiLogin', (credentials) => {
    return cy.request({
        method: 'POST',
        url: `${API_CONFIG.baseUrl}${API_ENDPOINTS.auth.login}`,
        form: true,
        body: credentials,
        headers: API_CONFIG.headers,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('apiGetCurrentUser', (token) => {
    return cy.request({
        method: 'GET',
        url: `${API_CONFIG.baseUrl}${API_ENDPOINTS.auth.currentUser}`,
        form: true,
        headers: API_CONFIG.headers(token),
        failOnStatusCode: false
    });
});

Cypress.Commands.add('apiGet', (token, endpoint) => {
    return cy.request({
        method: 'GET',
        url: `${API_CONFIG.baseUrl}${endpoint}`,
        headers: API_CONFIG.headers(token),
        failOnStatusCode: false
    });
});

Cypress.Commands.add('apiPost', (token, endpoint, body) => {
    return cy.request({
        method: 'POST',
        url: `${API_CONFIG.baseUrl}${endpoint}`,
        body: body,
        headers: API_CONFIG.headers(token),
        failOnStatusCode: false
    });
});

Cypress.Commands.add('apiPut', (token, endpoint, body) => {
    return cy.request({
        method: 'PUT',
        url: `${API_CONFIG.baseUrl}${endpoint}`,
        body: body,
        headers: API_CONFIG.headers(token),
        failOnStatusCode: false
    });
});

Cypress.Commands.add('apiDelete', (token, endpoint) => {
    return cy.request({
        method: 'DELETE',
        url: `${API_CONFIG.baseUrl}${endpoint}`,
        headers: API_CONFIG.headers(token),
        failOnStatusCode: false
    });
});

Cypress.Commands.add('compareDatesWithTolerance',
    (actual: string | Date, expected: string | Date, toleranceSeconds = 5) => {
        const diff = Math.abs(new Date(actual).getTime() - new Date(expected).getTime());
        expect(diff / 1000).to.be.lessThan(toleranceSeconds);
    }
);
