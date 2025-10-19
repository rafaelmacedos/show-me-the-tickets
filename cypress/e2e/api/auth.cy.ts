describe('Authentication and Authorization', () => {
    let access_token: string;
    
    it('Should login successfully', () => {
        cy.apiLogin({
            username: Cypress.env('ADMIN_EMAIL'),
            password: Cypress.env('ADMIN_PASSWORD')
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.access_token).to.be.not.empty;
            expect(response.body.token_type).to.eq('bearer');
            access_token = response.body.access_token;
        });
    });

    it("Should get current user successfully", () => {
        if (!access_token) {
            throw new Error('Access token is not set');
        }
        cy.apiGetCurrentUser(access_token).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('email').and.to.contain("@");
            expect(response.body).to.have.property('is_active').and.to.be.a('boolean');
            expect(response.body).to.have.property('is_admin').and.to.be.a('boolean');
            expect(new Date(response.body.created_at).toString()).to.not.equal('Invalid Date');
            expect(new Date(response.body.updated_at).toString()).to.not.equal('Invalid Date');
        });
    });
});