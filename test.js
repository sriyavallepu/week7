import { expect } from 'chai';
import axios from 'axios';

describe("Homepage", function() {
    const url = "http://localhost:3001/";

    it("returns status 200 to check if the homepage works", function(done) {
        axios.get(url)
            .then(response => {
                expect(response.status).to.equal(200);
                done();
            })
            .catch(err => done(err));
    });

    it("returns the correct welcome message", function(done) {
        axios.get(url)
            .then(response => {
                expect(response.data).to.equal("Welcome to the homepage!");
                done();
            })
            .catch(err => done(err));
    });
});