export type InvoiceItem = {
  qty: number;
  description: string;
  cost: number;
  discount: number;
};

export interface Invoice {
  tax: number | string;
  invoice_number: number | string;
  customer_info: {
    name: string;
    web_link: string;
    address1: string;
    address2: string;
    postal: string;
  };
  company_info: {
    name: string;
    web_link: string;
    address1: string;
    address2: string;
    postal: string;
  };
  items: InvoiceItem[];
}
