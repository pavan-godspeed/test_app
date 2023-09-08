let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { response } = require("express");

chai.should();
chai.use(chaiHttp);

describe('Tasks API', () => {

    describe("GET /api/tasks/", () => {
        it("It should get all the tasks", (done) => {
            chai.request(server)
                .get("/api/tasks/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.an("array");
                    response.body.length.should.be.eq(3);
                    done();
                });
        });

        it("It should not get all the tasks",(done) => {
            chai.request(server)
                .get("/api/task/")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                })
        })
    });

    describe("GET /api/task/:id", () => {
        it("It should get a task by ID", (done) => {
            const taskId = 1;
            chai.request(server)
                .get("/api/task/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("id").eq(1);
                    response.body.should.have.property("name");
                    response.body.should.have.property("completed");
                done();
                });
        });

        it("It should not get a task for an invalid ID",(done) => {
            const taskId = 111;
            chai.request(server)
                .get("/api/task/" + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the given ID does not exist.");
                done();
                })
        })
    });

    describe("POST /api/task/", () => {
        it("It should post a task on validating the body object", (done) => {
            const task = {
                name: "Task 4",
                completed: false
            };
            chai.request(server)
                .post("/api/task/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a("object");
                    response.body.should.have.property("id").eq(4);
                    response.body.should.have.property("name");
                    response.body.should.have.property("completed");
                done();
                });
        });

        it("It should not create a task for an invalid body object",(done) => {
            const task = {
                name: 'ta',
                completed: false
            } ;
            chai.request(server)
                .post("/api/task/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be atlease 3 characters");
                done();
                })
        })
    });
});
