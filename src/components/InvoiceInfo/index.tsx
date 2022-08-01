import { Col } from "react-bootstrap";

import { Invoice } from "../../types/invoice";

import { InfoContainer, InputContainer } from "./styles";

interface InvoiceInfoProps {
  invoice: Invoice;
  printMode: boolean;
  setCurrencySymbol: (value: string) => void;
  onChangeInput: (name: null | string, subname: string, value: string) => void;
}

export function InvoiceInfo({
  invoice,
  printMode,
  setCurrencySymbol,
  onChangeInput,
}: InvoiceInfoProps) {
  const currencies = [
    {
      name: "British Pound (£)",
      symbol: "£",
    },
    {
      name: "Canadian Dollar ($)",
      symbol: "CAD $ ",
    },
    {
      name: "Euro (€)",
      symbol: "€",
    },
    {
      name: "Indian Rupee (₹)",
      symbol: "₹",
    },
    {
      name: "Norwegian krone (kr)",
      symbol: "kr ",
    },
    {
      name: "US Dollar ($)",
      symbol: "$",
    },
  ];
  return (
    <InfoContainer>
      <Col className="col-xs-6">
        <InputContainer>
          <input
            value={invoice.customer_info?.name}
            onChange={(e) =>
              onChangeInput("customer_info", "name", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.customer_info?.web_link}
            onChange={(e) =>
              onChangeInput("customer_info", "web_link", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.customer_info?.address1}
            onChange={(e) =>
              onChangeInput("customer_info", "address1", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.customer_info?.address2}
            onChange={(e) =>
              onChangeInput("customer_info", "address2", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.customer_info?.postal}
            onChange={(e) =>
              onChangeInput("customer_info", "postal", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer hide={printMode}>
          <select
            name="currencySymbol"
            onChange={(e) => setCurrencySymbol(e.target.value)}
            defaultValue="$"
          >
            {currencies.map((item, index) => (
              <option key={index} value={item.symbol}>
                {item.name}
              </option>
            ))}
          </select>
        </InputContainer>
      </Col>
      <Col className="col-xs-6 right">
        <InputContainer>
          <input
            value={invoice.company_info?.name}
            onChange={(e) =>
              onChangeInput("company_info", "name", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.company_info?.web_link}
            onChange={(e) =>
              onChangeInput("company_info", "web_link", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.company_info?.address1}
            onChange={(e) =>
              onChangeInput("company_info", "address1", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.company_info?.address2}
            onChange={(e) =>
              onChangeInput("company_info", "address2", e.target.value)
            }
          />
        </InputContainer>
        <InputContainer>
          <input
            value={invoice.company_info?.postal}
            onChange={(e) =>
              onChangeInput("company_info", "postal", e.target.value)
            }
          />
        </InputContainer>
      </Col>
    </InfoContainer>
  );
}
