'use strict'

const parser = require("../lib/parser");

describe("parser", () => {
  describe(".success", () => {
    it("simple", (done) => {
      expect(parser.runParser(success("OK"), "foo")).to.equal(parser.Just("OK", "foo"));
    })
  })
})
