'use strict'

const Nothing = () => []
const Just = (v, s) => [v, s];

const resEquals = (a, b) => {
  if(a.length == 0 && b.length == 0) return true;
  if(a[0] == b[0] && a[1] == b[1]) return true;
  return false;
}

// Parser a == () =>

const anyChar = () => s => s == "" ? Nothing() : Just(s[0], s.slice(1));
const fail = () => Nothing;
const success = (v) => () => s => Just(v, s);

const runParser = (p, s) => p()(s);

const alternate = (p1, p2) => () => (s) => {
  let res = runParser(p1, s);
  if(resEquals(res, Nothing())) res = runParser(p2, s);
  return res;
}

const combine = (p, f) => () => s => {
  let res = runParser(p, s);
  if(resEquals(res, Nothing)) return res;
  return runParser(f(res[0]), res[1]);
}

const combines = (p, ...f) => () => s => {
  let res = runParser(p, s);
  if(resEquals(res, Nothing) || f.length == 0) return res;

  let head, tail;
  [head, ...tail] = f;
  return runParser(combines(head(res[0]),...tail), res[1])
}

const charCond = (cond) => combine(anyChar, (c) => cond(c) ? success(c) : fail);
const char = c => charCond((c2) => c == c2);
const string = s => {
  return s == "" ? success(s)
                 : combines(char(s[0]),
                    _ => string(s.slice(1)),
                    _ => success(s[0] + s.slice(1))
                 )
}

const oneOrMore = p => {
  return combine(p, x =>
         combine(zeroOrMore(p), xs =>
         success([x, ...xs])))
}

const zeroOrMore = p => alternate(oneOrMore(p), success([]));

const isDigit = c => c == '0' || c == '1' || c == '2' || c == '3' || c == '4' ||
                     c == '5' || c == '6' || c == '7' || c == '8' || c == '9';

const digit = charCond(isDigit);
const number = oneOrMore(digit);
const int = combine(number, cs => success(parseInt(cs.join(''))));

module.exports = {Nothing, Just, anyChar, fail, success, runParser, alternate, combine, combines,
                  charCond, char, string, oneOrMore, zeroOrMore, digit, number, int}
