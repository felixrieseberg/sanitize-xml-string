import { sanitize, validate } from '../src/index';

const pairs = [
  {
    name: 'Korean magic backspace 0008',
    error: '들어가보려니 먹',
    fixed: '들어가보려니 먹'
  },
  {
    name: 'Null 0000',
    error: 'invalid char \u{0000} in text',
    fixed: 'invalid char  in text'
  },
  {
    name: 'Non Private Use High Surrogate, First D800',
    error: 'invalid char \u{D800} in text',
    fixed: 'invalid char  in text'
  },
  {
    name: 'Low Surrogate, Last DFFF',
    error: 'invalid char \u{DFFF} in text',
    fixed: 'invalid char  in text'
  },
  {
    name: 'Noncharacter FFFE',
    error: 'invalid char \u{FFFE} in text',
    fixed: 'invalid char  in text'
  },
  {
    name: 'Noncharacter FFFF',
    error: 'invalid char \u{FFFF} in text',
    fixed: 'invalid char  in text'
  }
]

const valid = [
  'hello',
  '👋',
  '\u000A',
  '🕵🏿‍♀️',
  'Perfectly fine',
  // Two-Byte Characters
  // Strings which contain two-byte characters: can cause rendering issues or character-length issues
  '들어가보려니',
  '田中さんにあげて下さい',
  'パーティーへ行かないか',
  '和製漢語',
  '部落格',
  '사회과학원 어학연구소',
  '찦차를 타고 온 펲시맨과 쑛다리 똠방각하',
  '社會科學院語學研究所',
  '울란바토르',
  '𠜎𠜱𠝹𠱓𠱸𠲖𠳏',
  // Japanese Emoticons
  'ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ',
  '(｡◕ ∀ ◕｡)',
  '｀ｨ(´∀｀∩',
  '__ﾛ(,_,*)',
  '・(￣∀￣)・:*:',
  'ﾟ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ',
  ',。・:*:・゜’( ☻ ω ☻ )。・:*:・゜’',
  '(╯°□°）╯︵ ┻━┻)',
  '(ﾉಥ益ಥ）ﾉ﻿ ┻━┻',
  '┬─┬ノ( º _ ºノ)',
  '( ͡° ͜ʖ ͡°)',
  // Emoji
  '😍',
  '👩🏽',
  '👾 🙇 💁 🙅 🙆 🙋 🙎 🙍',
  '🐵 🙈 🙉 🙊',
  '❤️ 💔 💌 💕 💞 💓 💗 💖 💘 💝 💟 💜 💛 💚 💙',
  '✋🏿 💪🏿 👐🏿 🙌🏿 👏🏿 🙏🏿',
  '🚾 🆒 🆓 🆕 🆖 🆗 🆙 🏧',
  '0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟'
  // Unicode Symbols
  'Ω≈ç√∫˜µ≤≥÷',
  'åß∂ƒ©˙∆˚¬…æ',
  'œ∑´®†¥¨ˆøπ“‘',
  '¡™£¢∞§¶•ªº–≠',
  '¸˛Ç◊ı˜Â¯˘¿',
  'ÅÍÎÏ˝ÓÔÒÚÆ☃',
  'Œ„´‰ˇÁ¨ˆØ∏”’',
  '`⁄€‹›ﬁﬂ‡°·‚—±',
  '⅛⅜⅝⅞',
  'ЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя',
  '٠١٢٣٤٥٦٧٨٩'
];

pairs.forEach(({ error, fixed, name }, i) => {
  test(`sanitize pair ${i} (${name})`, () => {
    expect(sanitize(error).length).toBe(fixed.length);
    expect(sanitize(error)).toBe(fixed);
  });

  test(`validate is not okay with pair ${i}`, () => {
    expect(validate(error)).toBe(false);
  });
});

valid.forEach((v) => {
  test(`sanitize does not strips`, () => {
    expect(sanitize(v)).toEqual(v);
  });

  test(`validate is okay`, () => {
    expect(validate(v)).toBe(true);
  });
});
