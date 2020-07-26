const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../server');

describe("Testing the books API", () => {
	it("tests the base route and returns 200 for status", async () => {
		const response = await supertest(app).get('/');
        expect(response.status).to.equal(200);
	});
});

describe("Testing the books API", () => {
	it("tests the get books for status", async () => {
		const response = await supertest(app).get('/api/books');
        expect(response.status).to.equal(200);
        console.log('body' + JSON.stringify(response));
	});
});