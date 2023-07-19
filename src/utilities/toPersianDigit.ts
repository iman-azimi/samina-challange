export function toPersianDigit (value: number) {
  return value?.toString().replace(/\d/g, x => String.fromCharCode(x.charCodeAt(0) + 1728))
}
export function toEnglishDigit (value: string) {
  return value.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, c => c.charCodeAt(0) & 0xf);
}