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

  describe(".alternate", () => {
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

  describe(".combine", () => {
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

  describe(".charCond", () => {
    it("simple", (done) => {
      expect(parser.runParser(parser.charCond(c => c == 'f'), 'foo')).to.be.an('array').that.includes('f');
      done();
    })

    it("fail", (done) => {
      expect(parser.runParser(parser.charCond(c => c == 'b'), 'foo')).to.be.an('array').that.is.empty;
      done();
    })
  })

  describe(".char", () => {
    it('simple', (done) => {
      expect(parser.runParser(parser.char('f'), 'foo')).to.be.an('array').that.includes('f');
      done();
    })

    it('fail', (done) => {
      expect(parser.runParser(parser.char('b'), 'foo')).to.be.an('array').that.is.empty;
      done();
    })
  })

  describe(".string", () => {
    it('simple', (done) => {
      expect(parser.runParser(parser.string('fo'), 'foo')).to.be.an('array').that.includes('fo');
      done();
    })

    it('fail', (done) => {
      expect(parser.runParser(parser.string('bar'), 'foo')).to.be.an('array').that.is.empty;
      done();
    })
  })
})
