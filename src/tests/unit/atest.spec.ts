import chai from 'chai';
const expect = chai.expect

describe("Probe Unit Test", () => {

    before( async () => {
        return new Promise<void>((resolve) => {

            resolve();

        });
    });

    it("Should always return true", async () => {
        return new Promise<void>((resolve) => {

            expect(true, "boolean").to.be.equal(true, "boolean");

            resolve();

        });
    });

});