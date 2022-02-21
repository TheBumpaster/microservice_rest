import chai from "chai";
import chaiHttp from "chai-http"
import server from '../../index';

chai.use(chaiHttp);

const expect = chai.expect;

describe("Probe REST Service", () => {


    before(async () => {

        return new Promise<void>((resolve) => {

            resolve();

        });

    });


    it ("Should resolve service endpoint", async () => {
        
        return new Promise<void>((resolve, reject) => {

            chai.request(server)
            .get("/")
            .end((error, response) => {
                if (error) reject (error)

                expect(response.status, "Response Status Code").to.be.equal(404, "Not Found");

                resolve();
            });
        });

    });

    it ("Should resolve v1 probe endpoint", async () => {
        
        return new Promise<void>((resolve, reject) => {

            chai.request(server)
            .get("/v1/probe")
            .end((error, response) => {
                if (error) reject (error)

                expect(response.status, "Response Status Code").to.be.equal(200, "Success");
                expect(response.body, "Response Body").to.be.a("object", "Object");
                expect(response.body, "Response Body").to.have.property("message", "Hello World!", "Message Hello World");

                resolve();
            });
        });

    });

});