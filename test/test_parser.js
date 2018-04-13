'use strict'

const parser = require("../index.js");

describe("parser", () => {
  describe(".success", () => {
    it("simple", (done) => {
      expect(parser.runParser(parser.success("OK"), "foo")).to.be.an('array').that.includes('OK');
      done();
    })
  })
})
