export const utf8Encode = (unicodeString) => {
  if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
  const utf8String = unicodeString.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) {
          var cc = c.charCodeAt(0);
          return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
  ).replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) {
          var cc = c.charCodeAt(0);
          return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
  );
  return utf8String;
}