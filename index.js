'use strict'

const Nothing = s => []
const Just = (v, s) => [v, s];

// Parser a == () =>

const anyChar = () => s => s == "" ? Nothing : Just(s[0], s.slice(1));
const fail = () => Nothing;
const success = (v) => () => s => Just(v, s);

const runParser = (p, s) => p()(s);

const alternate = (p1, p2) => () => (s) => {
  let res = runParser(p1, s);
  if(res == Nothing) res = runParser(p2, s);
  return res;
}

const combine = (p, f) => () => s => {
  let res = runParser(p, s);
  if(res == Nothing) return res;
  return runParser(f(res[0]), res[1]);
}

const charCond = (cond) => combine(anyChar, (c) => cond(c) ? success(c) : fail);
const char = c => charCond((c2) => c == c2);
const string = s => {
  return s == "" ? success(s)
                 : combine(char(s[0]), _ =>
                   combine(string(s.slice(1)), _ =>
                   success(s[0] + s.slice(1))
                 ))
}

module.exports = {Nothing, Just, anyChar, fail, success, runParser, alternate, combine, charCond, char, string}
