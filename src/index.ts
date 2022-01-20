const escapeRe = /([$.+*?=!:[\]{}(|)/\\])/g;

/**
 * defaultParam - simplistic polyfill for default function parameter
 * @param  {any} [obj]
 * @param  {any} defaultValue
 * @return {any}
 */
function defaultParam<T>(obj: T | undefined, defaultValue: T): T {
  return typeof obj !== 'undefined' ? obj : defaultValue;
}

export interface PathMatcherOptions {
  case?: boolean;
  separators?: string;
  fromStart?: boolean;
  toEnd?: boolean;
}

interface PathMatcherOptionsWithSeparator extends PathMatcherOptions {
  separator: string;
}

const DefaultPathMatcherOptions: Required<PathMatcherOptions> = {
  case: true,
  separators: '/',
  fromStart: true,
  toEnd: true,
};

interface Definition {
  key: string;
  multiple: boolean;
  required: boolean;
  index: number;
  pattern: string;
  regexp?: RegExp;
}

export class PathMatcher {
  readonly options: Required<PathMatcherOptionsWithSeparator>;

  keys: Definition[];
  path?: string;
  regstr: string;
  regexp: RegExp;

  constructor(path: string, options?: PathMatcherOptions) {
    this.options = {
      ...DefaultPathMatcherOptions,
      ...options,
      separator: '',
    };
    this.options.separator = '[' + this.escape(this.options.separators) + ']';
    this.restructurePath(path);
  }

  match(path: string) {
    // console.log("match 01");
    const reseparator = this.options.separator;
    const separator = this.options.separators[0];
    path = path.replace(new RegExp('^' + reseparator + '*(.*?)' + reseparator + '*$'), separator + '$1' + separator);

    // console.log("match 02");
    const result = path.match(this.regexp);
    // console.log("match 03");

    if (!result) return;

    // console.log("match 04");
    const data: Record<string, any> = {};

    // console.log("match 05");
    this.keys.forEach(item => {
      // console.log("match foreach 01");
      let isMultiple = false;

      if (data[item.key]) isMultiple = true;

      if (data[item.key] && !Array.isArray(data[item.key])) {
        isMultiple = true;
        data[item.key] = [data[item.key]];
      }

      if (item.multiple && !data[item.key]) {
        isMultiple = true;
        data[item.key] = [];
      }

      const value = result[item.index] ? result[item.index] : undefined;

      if (!isMultiple && !item.multiple) {
        data[item.key] = value;
        return;
      }

      if (isMultiple && !item.multiple && result[item.index]) {
        data[item.key].push(value);
        return;
      }

      if (result[item.index] && item.regexp) {
        result[item.index]?.replace(item.regexp, str => {
          if (str) {
            data[item.key].push(str.replace(new RegExp(reseparator + '*$'), ''));
          }
          return '';
        });
      }
    });
    // console.log("match 06");
    return data;
  }

  /**
   * The method converts a string with a path pattern that includes the string representation of regular expressions
   * and pointed to Express.js style key IDs into a regular expression
   * @param  {string} path A string containing the path pattern. May contain regular expressions and declaration of keys like :id. The behavior mimics the same functionality of the Express.js v.5.x library
   */
  protected restructurePath(path: string) {
    path = defaultParam(path, '/');
    this.keys = [];
    this.path = path;
    this.regstr = '';

    const separator = this.options.separator;
    const notseparator = '[^' + this.escape(this.options.separators) + ']';

    let offset = 0;
    let count = 0;
    // 11. REGEXP toEnd[true]: /^[\/]?foo\/(.*?)[\/]?$/
    // 11. REGEXP toEnd[false]: /^[\/]?foo\/(.*?)([\/]|[\/]?$)/i

    path = path.replace(new RegExp('^' + separator + '*(.*?)' + separator + '*$'), '$1');
    //path += this.options.separators[0];

    path.replace(/:([a-z]\w*)(\((.*?)\))?([?*+])?/gi, (str, key, a, pat, quant, index) => {
      // console.log("-----------------------------");
      // console.log("str:", str);
      // console.log("key:", key);
      // console.log("a:", a);
      // console.log("pat:", pat);
      // console.log("quant:", quant);
      // console.log("index:", index);
      // console.log("string:", string);
      count++;

      const isMultiple = quant === '*' || quant === '+';
      const isExtrude = /^(\[[^\[\]]+]|\([^()]+\)|\.|\\.)[+*]$/.test(pat);

      let isRequired = quant !== '*' && quant !== '?';
      if (!quant && pat && /^(\[[^\[\]]+]|\([^()]+\)|\.|\\.)[*?]?$/.test(pat)) isRequired = false;

      const quantifier = quant ? quant : '';
      // console.log("isMultiple", isMultiple);
      // console.log("isRequired", isRequired);

      // const startChar = path.charAt(index-1);
      const isStarted = !index ? true : this.separator(path.charAt(index - 1));
      const isStopped = index + str.length >= path.length ? true : this.separator(path.charAt(index + str.length));
      const isToken = isStarted && isStopped;

      if (index > offset) {
        const text = path.substring(offset, index);
        const regstr = this.escape(text);
        this.regstr += regstr;
      }

      if (isToken && index) {
        if (!isMultiple || !isRequired) {
          if (pat && !isExtrude) {
            this.regstr += '?';
          }
        }
      }

      //console.log("isStarted", isStarted);
      //console.log("isStopped", isStopped);
      //console.log("isToken", isToken);
      //console.log("this.regstr 1:", this.regstr);

      const pattern = pat ? pat : notseparator + '+';

      const regstr = isMultiple
        ? isToken
          ? isExtrude
            ? '((?:' + separator + '?' + pattern + ')' + quantifier + ')'
            : '((?:' + separator + '' + pattern + ')' + quantifier + ')'
          : '((?:' + notseparator + '*' + pattern + ')' + quantifier + ')'
        : isToken
        ? isExtrude
          ? '(' + pattern + '?)' + quantifier
          : '(' + pattern + ')' + quantifier
        : '(' + pattern + ')' + quantifier;

      this.regstr += regstr;

      const data: Definition = {
        key,
        multiple: isMultiple,
        required: isRequired,
        index: count,
        pattern,
      };
      if (isMultiple) {
        data.regexp = new RegExp(pattern, this.options.case ? 'g' : 'gi');
      }

      this.keys.push(data);

      offset = index + str.length;
      return str;
    });

    if (offset < path.length - 1) {
      const text = path.substring(offset);
      const regstr = this.escape(text);
      this.regstr += regstr;
    }

    this.regexp = new RegExp(
      (this.options.fromStart ? '^' : '') +
        separator +
        '?' +
        this.regstr +
        (this.options.toEnd ? separator + '?' + '$' : '(' + separator + '|' + separator + '?' + '$' + ')'),
      this.options.case ? '' : 'i',
    );
  }

  /**
   * The method escapes all special characters specified in the module's global variable escapeRe
   * @param  {string} text The string text to be escape
   * @return {string}      The string text in which all characters specified in the escapeRe variable are escaped
   */
  protected escape(text: string) {
    return text.replace(escapeRe, s => {
      return '\\' + s;
    });
  }

  /**
   * The method checks if char is one of the separators specified in this.options.separators
   * @param  char A string containing the character to be checked (the length of the string must be equal to 1)
   * @return If the character being checked is one of the characters specified in this.options.separators then true otherwise false
   */
  protected separator(char: string): boolean {
    return !!(this.options.separators.indexOf(char) + 1);
  }
}
