import NumberFormat from "react-number-format";
import { Col, Row } from "react-bootstrap";

import { StyledButton } from "../Button";

import { Container, ItemsTable, TableHeader } from "./styles";
import { Invoice, InvoiceItem } from "../../types/invoice";
import axios from "axios";
import { useEffect, useState } from "react";

interface InvoiceTableProps {
  currencySymbol: string;
  invoice: Invoice;
  setInvoice: (value: Invoice) => void;
  printMode: boolean;
  onChangeInput: (name: null | string, subname: string, value: string) => void;
}

export function InvoiceTable({
  currencySymbol,
  invoice,
  setInvoice,
  printMode,
  onChangeInput,
}: InvoiceTableProps) {
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

  const changeValue = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((i, idx) =>
        idx === index
          ? {
              ...i,
              [name]: e.target.value,
            }
          : i
      ),
    });
  };

  const invoiceSubTotal = () => {
    var total = 0.0;

    invoice.items?.forEach((item) => {
      const totalItem = item.cost * item.qty;

      const discount = totalItem * (item.discount / 100);

      const totalWithDiscount = totalItem - discount;

      total += totalWithDiscount;
    });

    return total;
  };

  const calculateTax = () => {
    return Math.round(Number(invoice.tax) * invoiceSubTotal()) / 100;
  };

  const calculateGrandTotal = () => {
    return calculateTax() + invoiceSubTotal();
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { qty: 0, cost: 0, description: "", discount: 0 },
      ],
    });
  };

  const removeItem = (item: InvoiceItem) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter((i) => i !== item),
    });
  };

  const [exchangeValue, setEnchangeValue] = useState();

  const [loading, setLoading] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState("");

  const to = {
    "£": "GBP",
    "CAD $ ": "CAD",
    "€": "EUR",
    "₹": "INR",
    "kr ": "NOK",
    $: "USD",
  }[selectedCurrency];

  const from = {
    "£": "GBP",
    "CAD $ ": "CAD",
    "€": "EUR",
    "₹": "INR",
    "kr ": "NOK",
    $: "USD",
  }[currencySymbol];

  useEffect(() => {
    if (
      selectedCurrency !== "" ||
      (currencySymbol && selectedCurrency !== "")
    ) {
      const getExchangeRates = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${calculateGrandTotal()}`,
            {
              headers: {
                apikey: "IjtPYFyDU2SckveVlKHTf2xqvENAiTTZ",
              },
            }
          );
          setEnchangeValue(data.result);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };

      getExchangeRates();
    }
  }, [selectedCurrency, currencySymbol]);

  return (
    <ItemsTable>
      <TableHeader>
        <Col className="col-xs-1">&nbsp;</Col>
        <Col className="col-xs-3">Description</Col>
        <Col className="col-xs-2">Quantity</Col>
        <Col className="col-xs-2">Cost {currencySymbol}</Col>
        <Col className="col-xs-2">Discount (%)</Col>
        <Col className="col-xs-2 text-right">Total</Col>
      </TableHeader>
      {invoice.items?.map((item, index) => {
        const total = item.cost * item.qty;

        const discount = total * (item.discount / 100);

        const totalWithDiscount = total - discount;

        return (
          <Row key={index}>
            <Col className="col-xs-1">
              <StyledButton
                variant="danger"
                href="#"
                hide={printMode}
                onClick={() => removeItem(item)}
              >
                [X]
              </StyledButton>
            </Col>
            <Col className="col-xs-3">
              <input
                value={item.description}
                onChange={(e) => {
                  changeValue(index, e, "description");
                }}
                placeholder="Description"
              />
            </Col>
            <Col className="col-xs-2">
              <NumberFormat
                value={item.qty}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeValue(index, e, "qty");
                }}
                size={4}
                decimalScale={0}
                placeholder="Quantity"
              />
            </Col>
            <Col className="col-xs-2">
              <NumberFormat
                value={item.cost}
                defaultValue="0.00"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeValue(index, e, "cost");
                }}
                size={6}
                placeholder="Cost"
              />
            </Col>
            <Col className="col-xs-2">
              <NumberFormat
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeValue(index, e, "discount");
                }}
                size={4}
                defaultValue={0}
                decimalScale={0}
                value={item.discount}
                placeholder="Discount"
              />
            </Col>
            <Col className="col-xs-2 text-right">
              <NumberFormat
                prefix={currencySymbol}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale={true}
                value={totalWithDiscount}
                displayType="text"
              />
            </Col>
          </Row>
        );
      })}

      <Row>
        <Container className="col-xs-12" hide={printMode}>
          <StyledButton variant="primary" href="#" onClick={addItem}>
            [+]
          </StyledButton>
        </Container>
      </Row>
      <Row>
        <Col className="col-xs-10 text-right">Sub Total</Col>

        <Col className="col-xs-2 text-right">
          <NumberFormat
            prefix={currencySymbol}
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            value={invoiceSubTotal()}
            displayType="text"
          />
        </Col>
      </Row>
      <Row>
        <Col className="col-xs-10 text-right">
          Tax(%):{" "}
          <input
            value={invoice.tax}
            onChange={(e) => onChangeInput(null, "tax", e.target.value)}
            type="number"
            style={{ width: "43px" }}
          />
        </Col>
        <Col className="col-xs-2 text-right">
          <NumberFormat
            prefix={currencySymbol}
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            value={calculateTax()}
            displayType="text"
          />
        </Col>
      </Row>
      <Row>
        <Col className="col-xs-8 text-right">
          <Container hide={printMode}>
            <span style={{ marginRight: "5px" }}>Convert to:</span>
            <select
              name="currencySymbol"
              onChange={(e) => setSelectedCurrency(e.target.value)}
              defaultValue=""
              disabled={loading}
            >
              <option value="">Choose here</option>
              {currencies.map((item, index) => (
                <option key={index} value={item.symbol}>
                  {item.name}
                </option>
              ))}
            </select>
          </Container>
        </Col>
        <Col className="col-xs-2 text-right">Grand Total:</Col>
        <Col className="col-xs-2 text-right">
          {loading ? (
            "Converting..."
          ) : (
            <NumberFormat
              prefix={selectedCurrency ? selectedCurrency : currencySymbol}
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale={true}
              value={exchangeValue ? exchangeValue : calculateGrandTotal()}
              displayType="text"
            />
          )}
        </Col>
      </Row>
    </ItemsTable>
  );
}
