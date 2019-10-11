import { context } from "./fakes/context";
import { event } from "./fakes/event";
import { lambda } from "../src/lambda";
import * as chai from "chai";
import * as promisedChai from "chai-as-promised";
import { Context } from "aws-lambda";

/* tslint:disable */
describe("Wrapper", () => {
  chai.use(promisedChai);
  chai.should();

  it("should resolve wrapped lambda handler", (done) => {
    lambda(class SampleHandler {
      fire(request, response) {
        return response({ success: true })
      }
    })(event, context as Context);
  });


  // it("should resolve wrapped lambda handler", (done) => {
  //   const handler = (request, response) => {
  //     return response({ message: "test" });
  //   }

  //   wrapper({ handler })(event, context).should.eventually.have.ownProperty("body").notify(done);
  // });
});
/* tslint:enable */
