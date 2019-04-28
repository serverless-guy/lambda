import { context } from "../fakes/context";
import { event } from "../fakes/event";
import { wrapper } from "../../dist/index";
import * as chai from "chai";
import * as promisedChai from "chai-as-promised";

/* tslint:disable */
describe("Utils\\httpWrapper - HTTP Lambda Wrapper", () => {
  chai.use(promisedChai);
  chai.should();

  const request = { event, context }

  it("should resolve wrapped lambda handler", (done) => {
    const handler = (request, response) => {
      return response({ message: "test" });
    }

    wrapper({ handler })(event, context).should.eventually.have.ownProperty("body").notify(done);
  });
});
/* tslint:enable */
