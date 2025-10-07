import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * 마크다운 문자열을 HTML로 변환
 * @description GitHub Flavored Markdown을 지원하며 안전한 HTML로 변환
 * @param {string} markdown - 변환할 마크다운 문자열
 * @returns {Promise<string>} 변환된 HTML 문자열
 * @example
 * ```typescript
 * const html = await markdownToHtml('# Hello World\n\nThis is **bold** text.');
 * console.log(html); // "<h1>Hello World</h1>\n<p>This is <strong>bold</strong> text.</p>"
 * ```
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  
  return result.toString();
}
