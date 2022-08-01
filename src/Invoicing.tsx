import { useEffect, useState } from "react";

import { InvoiceFooter } from "./components/InvoiceFooter";
import { ActionButtons } from "./components/ActionButtons";
import { InvoiceHeader } from "./components/InvoiceHeader";
import { InvoiceTable } from "./components/InvoiceTable";
import { InvoiceInfo } from "./components/InvoiceInfo";

import { Invoice } from "./types/invoice";

const defaultInvoice = {
  tax: 13.0,
  invoice_number: 10,
  customer_info: {
    name: "Mr. John Doe",
    web_link: "John Doe Designs Inc.",
    address1: "1 Infinite Loop",
    address2: "Cupertino, California, US",
    postal: "90210",
  },
  company_info: {
    name: "Metaware Labs",
    web_link: "www.metawarelabs.com",
    address1: "123 Yonge Street",
    address2: "Toronto, ON, Canada",
    postal: "M5S 1B6",
  },
  items: [{ qty: 10, description: "Gadget", cost: 9.95, discount: 0 }],
};

export function Invoicing() {
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [selectedLogo, setSelectedLogo] = useState<File>();
  const [printMode, setPrintMode] = useState(false);
  const [invoice, setInvoice] = useState({} as Invoice);

  const saveInvoice = () => {
    localStorage.setItem("invoice", JSON.stringify(invoice));
  };

  const clearLocalStorage = () => {
    var confirmClear = confirm(
      "Are you sure you would like to clear the invoice?"
    );
    if (confirmClear) {
      localStorage.clear();
      setInvoice(defaultInvoice);
    }
  };

  const onChangeInput = (name: string, subname: string, value: string) => {
    if (name === "customer_info") {
      setInvoice({
        ...invoice,
        [name]: { ...invoice.customer_info, [subname]: value },
      });
    } else if (name === "company_info") {
      setInvoice({
        ...invoice,
        [name]: { ...invoice.company_info, [subname]: value },
      });
    } else {
      setInvoice({ ...invoice, [subname]: value });
    }
  };

  useEffect(() => {
    const getInvoice = async () => {
      const fetchInvoice = await JSON.parse(localStorage.getItem("invoice"));
      if (fetchInvoice) {
        setInvoice(fetchInvoice);
      } else {
        setInvoice(defaultInvoice);
      }
    };
    getInvoice();
  }, []);

  useEffect(() => {
    if (Object.keys(invoice).length > 0) {
      saveInvoice();
    }
  }, [invoice]);

  useEffect(() => {
    if (selectedLogo) {
      const fileReader: FileReader = new FileReader();

      fileReader.onload = function (e: any) {
        const companyLogo = document.getElementById("company_logo");

        if (companyLogo) {
          companyLogo.setAttribute("src", e.target?.result);
        }
        localStorage.setItem("logo", e.target?.result);
      };
      fileReader.readAsDataURL(selectedLogo);
    }
  }, [selectedLogo]);

  useEffect(() => {
    const invoiceNumber = document.getElementById("company_logo");

    if (invoiceNumber) {
      invoiceNumber.focus();
    }
  }, []);

  return (
    <div>
      <div className="container" id="invoice">
        <InvoiceHeader
          invoice={invoice}
          printMode={printMode}
          setSelectedLogo={setSelectedLogo}
          onChangeInput={onChangeInput}
        />
        <InvoiceInfo
          invoice={invoice}
          setCurrencySymbol={setCurrencySymbol}
          onChangeInput={onChangeInput}
          printMode={printMode}
        />
        <InvoiceTable
          currencySymbol={currencySymbol}
          invoice={invoice}
          setInvoice={setInvoice}
          printMode={printMode}
          onChangeInput={onChangeInput}
        />
        <ActionButtons
          clearLocalStorage={clearLocalStorage}
          printMode={printMode}
          setPrintMode={setPrintMode}
        />
      </div>
      <InvoiceFooter printMode={printMode} />
    </div>
  );
}
