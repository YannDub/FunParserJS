'use strict'

const parser = require("../index.js");

describe("parser", () => {
  describe(".success", () => {
    it("simple", (done) => {
      expect(parser.runParser(parser.success("OK"), "foo")).to.be.an('array').that.includes('OK');
      done();
    })
  })

  describe(".fail", () => {
    it("simple", (done) => {
      expect(parser.runParser(parser.fail, "foo")).to.be.an('array').that.is.empty;
      done();
    })
  })

  describe(".anyChar", () => {
    it("simple", (done) => {
      expect(parser.runParser(parser.anyChar, 'foo')).to.be.an('array').that.includes('f');
      done();
    })

    it("fail", (done) => {
      expect(parser.runParser(parser.anyChar, "")).to.be.an('array').that.is.empty;
      done();
    })
  })

  describe(".alternate", (done) => {
    it("simple", (done) => {
      expect(parser.runParser(parser.alternate(parser.success('OK'), parser.fail), "foo")).to.be.an('array').that.includes('OK');
      expect(parser.runParser(parser.alternate(parser.fail, parser.success('OK')), "foo")).to.be.an('array').that.includes('OK');
      done();
    })

    it("fail", (done) => {
      expect(parser.runParser(parser.alternate(parser.fail, parser.fail), 'foo')).to.be.an('array').that.is.empty;
      done();
    })
  })

  describe(".combine", (done) => {
    it("simple", (done) => {
      expect(parser.runParser(parser.combine(parser.anyChar, c => parser.success(c)), 'foo')).to.be.an('array').that.includes('f');
      done();
    })

    it("fail", (done) => {
      expect(parser.runParser(parser.combine(parser.anyChar, c => parser.fail), 'foo')).to.be.an('array').that.is.empty;
      expect(parser.runParser(parser.combine(parser.fail, _ => parser.success('fail')), 'foo')).to.be.an('array').that.is.empty;
      done();
    })
  })
})
