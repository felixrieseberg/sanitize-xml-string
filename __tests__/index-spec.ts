import { sanitize, validate } from '../src/index';

const invalid = [
  'invalid char \u{0000} in text',
  'invalid char \u{D800} in text',
  'invalid char \u{DFFF} in text',
  'invalid char \u{FFFE} in text',
  'invalid char \u{FFFF} in text'
];

const valid = ['hello', '👋', '\u000A', '🕵🏿‍♀️'];

invalid.forEach((iv) => {
  test(`sanitize strips ${iv.charCodeAt(13)}`, () => {
    expect(sanitize(iv).length).toBeLessThan(iv.length);
  });

  test(`validate is not okay with ${iv.charCodeAt(13)}`, () => {
    expect(validate(iv)).toBe(false);
  });
})

valid.forEach((v) => {
  test(`sanitize does not strips ${v.charCodeAt(0)}`, () => {
    expect(sanitize(v)).toEqual(v);
  });

  test(`validate is okay with ${v.charCodeAt(13)}`, () => {
    expect(validate(v)).toBe(true);
  });
})


