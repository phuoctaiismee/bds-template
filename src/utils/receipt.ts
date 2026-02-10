// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import receiptTemplate from '@/templates/receipt.hbs';
import Handlebars from 'handlebars';

interface GenerateReceiptHtmlParams {
  date: string;
  body: Array<{
    left: string;
    right: string;
  }>;
  footer: Array<{
    left: string;
    right: string;
  }>;
}

export const generateReceiptHtml = async (params: GenerateReceiptHtmlParams) => {
  const template = Handlebars.compile(receiptTemplate);
  return template(params);
};
