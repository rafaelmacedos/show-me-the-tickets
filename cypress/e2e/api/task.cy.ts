import { API_ENDPOINTS } from "@/support/api-config";
import { newTask, updateTask } from "@/support/data-factory/task";

describe('Task Operations', () => {
    let access_token: string;
    let current_user_id: string;

    let create_task_body: any;
    let created_task_id: string;

    before(() => {
        cy.apiLogin({
            username: Cypress.env('ADMIN_EMAIL'),
            password: Cypress.env('ADMIN_PASSWORD')
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.access_token).to.be.not.empty;
            expect(response.body.token_type).to.eq('bearer');
            access_token = response.body.access_token;
        }).then(() => {
            cy.apiGetCurrentUser(access_token).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id');
                current_user_id = response.body.id;
            });
        });
    })

    it('Should create a task successfully', () => {
        if (!access_token) {
            throw new Error('Access token is not set');
        }
        if (!current_user_id) {
            throw new Error('Current user id is not set');
        }

        const body = newTask(current_user_id);
        create_task_body = body;

        cy.apiPost(access_token, API_ENDPOINTS.tasks.create, body).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id').to.be.greaterThan(0);
            expect(response.body).to.have.property('title').and.to.be.eq(body.title);
            expect(response.body).to.have.property('description').and.to.be.eq(body.description);
            cy.compareDatesWithTolerance(response.body.due_datetime, body.due_datetime.toISOString());
            expect(response.body).to.have.property('status').and.to.be.eq(body.status);
            expect(response.body).to.have.property('priority').and.to.be.eq(body.priority);
            expect(response.body).to.have.property('category').and.to.be.eq(body.category);
            expect(response.body).to.have.property('assigneeId').and.to.be.eq(body.assigneeId);
            cy.compareDatesWithTolerance(response.body.created_at, body.created_at);
            cy.compareDatesWithTolerance(response.body.updated_at, body.updated_at);
            created_task_id = response.body.id;
        });
    });

    it('Should get a task by id successfully', () => {
        if (!access_token) {
            throw new Error('Access token is not set');
        }
        if (!current_user_id) {
            throw new Error('Current user id is not set');
        }
        if (!created_task_id) {
            throw new Error('Created task id is not set');
        }
        if (!create_task_body) {
            throw new Error('Create task body is not set');
        }


        cy.apiGet(access_token, API_ENDPOINTS.tasks.getById(created_task_id)).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id').to.be.greaterThan(0);
            expect(response.body).to.have.property('title').and.to.be.eq(create_task_body.title);
            expect(response.body).to.have.property('description').and.to.be.eq(create_task_body.description);
            cy.compareDatesWithTolerance(response.body.due_datetime, create_task_body.due_datetime.toISOString());
            expect(response.body).to.have.property('status').and.to.be.eq(create_task_body.status);
            expect(response.body).to.have.property('priority').and.to.be.eq(create_task_body.priority);
            expect(response.body).to.have.property('category').and.to.be.eq(create_task_body.category);
            expect(response.body).to.have.property('assigneeId').and.to.be.eq(create_task_body.assigneeId);
            cy.compareDatesWithTolerance(response.body.created_at, create_task_body.created_at);
            cy.compareDatesWithTolerance(response.body.updated_at, create_task_body.updated_at);
            created_task_id = response.body.id;
        });
    })

    it('Should update a task by id successfully', () => {
        if (!access_token) {
            throw new Error('Access token is not set');
        }
        if (!current_user_id) {
            throw new Error('Current user id is not set');
        }
        if (!created_task_id) {
            throw new Error('Created task id is not set');
        }
        if (!create_task_body) {
            throw new Error('Create task body is not set');
        }

        const update_task_body = updateTask(current_user_id);

        cy.apiPut(access_token, API_ENDPOINTS.tasks.updateById(created_task_id), update_task_body).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id').to.be.greaterThan(0);
            expect(response.body).to.have.property('title').and.to.be.eq(update_task_body.title);
            expect(response.body).to.have.property('description').and.to.be.eq(update_task_body.description);
            cy.compareDatesWithTolerance(response.body.due_datetime, update_task_body.due_datetime.toISOString());
            expect(response.body).to.have.property('status').and.to.be.eq(update_task_body.status);
            expect(response.body).to.have.property('priority').and.to.be.eq(update_task_body.priority);
            expect(response.body).to.have.property('category').and.to.be.eq(update_task_body.category);
            expect(response.body).to.have.property('assigneeId').and.to.be.eq(update_task_body.assigneeId);
            cy.compareDatesWithTolerance(response.body.created_at, create_task_body.created_at);
            cy.compareDatesWithTolerance(response.body.updated_at, update_task_body.updated_at);
        });
    });

    it('Should get all tasks successfully', () => {
        if (!access_token) {
            throw new Error('Access token is not set');
        }

        cy.apiGet(access_token, API_ENDPOINTS.tasks.getAll).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length.greaterThan(0);
        });
    });

    after(() => {
        cy.log('Cleanup: deleting created task');
        if (created_task_id) {
            cy.apiDelete(access_token, API_ENDPOINTS.tasks.deleteById(created_task_id))
                .then((response) => {
                    expect(response.status).to.eq(204);
                });
        }
    });

});