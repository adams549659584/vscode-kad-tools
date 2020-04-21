import { IConvertResult } from './interface';

export class RemProcess {
  constructor(private cog: any) {}

  private regRpx: RegExp = /([-]?[\d.]+)r(px)?/;
  private regRpxAll: RegExp = /([-]?[\d.]+)rpx/g;

  private regPx: RegExp = /([-]?[\d.]+)p(x)?/;
  private regPxAll: RegExp = /([-]?[\d.]+)px/g;

  private regRem: RegExp = /([-]?[\d.]+)r(em)?/;
  private regRemAll: RegExp = /([-]?[\d.]+)rem/g;

  /**
   * px转换成rem
   */
  private pxToRem(pxStr: string): IConvertResult {
    const px = parseFloat(pxStr);
    let remValue: number | string = +(px / this.cog.rootFontSize).toFixed(this.cog.fixedDigits);
    if (this.cog.autoRemovePrefixZero) {
      if (remValue.toString().startsWith('0.')) {
        remValue = remValue.toString().substring(1);
      }
    }
    return {
      rpx: `${px / 2}rpx`,
      rpxValue: px / 2,
      px: pxStr,
      pxValue: px,
      remValue,
      rem: remValue + 'rem',
    };
  }

  /**
   * rpx to rem
   */
  private rpxToRem(rpxStr: string): IConvertResult {
    const rpx = parseFloat(rpxStr);
    return this.pxToRem((rpx * 2).toString());
  }

  /**
   * px转换成rem
   */
  private RemToPx(remStr: string): IConvertResult {
    const rem = parseFloat(remStr);
    let pxValue: number = +(rem * this.cog.rootFontSize).toFixed(this.cog.fixedDigits);
    if (this.cog.autoRemovePrefixZero) {
      if (pxValue.toString().startsWith('0.')) {
        pxValue = +pxValue.toString().substring(1);
      }
    }
    return {
      rpx: `${pxValue / 2}rpx`,
      rpxValue: pxValue / 2,
      px: `${pxValue}px`,
      pxValue: pxValue,
      remValue: rem,
      rem: rem + 'rem',
    };
  }

  private RemToRpx(remStr: string): IConvertResult {
    return this.RemToPx(remStr);
  }

  /**
   * px转rem
   *
   * @param {string} text 需要转换文本，例如：10px 12p
   */
  convert(text: string): IConvertResult {
    const rpxMatch = text.match(this.regRpx);
    if (rpxMatch) {
      return this.rpxToRem(rpxMatch[1]);
    }
    const pxMatch = text.match(this.regPx);
    if (pxMatch) {
      return this.pxToRem(pxMatch[1]);
    }
    return null;
  }

  /** 批量转换 */
  convertAllPx2Rem(code: string, ingores: string[]): string {
    if (!code) return code;

    return code.replace(this.regPxAll, (word: string) => {
      if (ingores.includes(word)) return word;
      const res = this.pxToRem(word);
      if (res) return res.rem;
      return word;
    });
  }

  /** 批量转换 */
  convertAllRpx2Rem(code: string, ingores: string[]): string {
    if (!code) return code;

    return code.replace(this.regRpxAll, (word: string) => {
      if (ingores.includes(word)) return word;
      const res = this.rpxToRem(word);
      if (res) return res.rem;
      return word;
    });
  }

  /** 批量转换 */
  convertAllRem2Px(code: string, ingores: string[]): string {
    if (!code) return code;

    return code.replace(this.regRemAll, (word: string) => {
      if (ingores.includes(word)) return word;
      const res = this.RemToPx(word);
      if (res) return res.px;
      return word;
    });
  }

  /** 批量转换 */
  convertAllRem2Rpx(code: string, ingores: string[]): string {
    if (!code) return code;

    return code.replace(this.regRemAll, (word: string) => {
      if (ingores.includes(word)) return word;
      const res = this.RemToRpx(word);
      if (res) return res.rpx;
      return word;
    });
  }
}
