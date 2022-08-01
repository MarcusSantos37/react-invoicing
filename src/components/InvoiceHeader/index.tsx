import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import defaultLogo from "../../assets/images/metaware_logo.png";

import { Invoice } from "../../types/invoice";

import { Logo, LogoButtons, Container } from "./styles";

interface InvoiceHeaderProps {
  invoice: Invoice;
  printMode: boolean;
  setSelectedLogo: (e: File) => void;
  onChangeInput: (name: null | string, subname: string, value: string) => void;
}

export function InvoiceHeader({
  invoice,
  printMode,
  setSelectedLogo,
  onChangeInput,
}: InvoiceHeaderProps) {
  var hasLogo = !!localStorage["logo"];
  const logo = hasLogo ? localStorage.getItem("logo") : defaultLogo;

  const [logoRemoved, setLogoRemoved] = useState(false);
  const toggleLogo = () => {
    setLogoRemoved(!logoRemoved);
  };

  const editLogo = () => {
    document.getElementById("imgInp").click();
  };

  return (
    <Container>
      <Row>
        <Col className="col-xs-12 heading">INVOICE</Col>
      </Row>
      <Row className="branding">
        <Col className="col-xs-6">
          <div className="invoice-number-container">
            <label htmlFor="invoice-number">Invoice #</label>
            <input
              id="invoice-number"
              value={invoice.invoice_number}
              onChange={(e) =>
                onChangeInput(null, "invoice_number", e.target.value)
              }
            />
          </div>
        </Col>
        <Col className="col-xs-6 logo-container">
          <input
            onChange={(e) => setSelectedLogo(e.target.files[0])}
            type="file"
            id="imgInp"
          />
          <Logo
            hide={logoRemoved}
            id="company_logo"
            src={logo}
            alt="your image"
          />
          <div>
            <LogoButtons hide={printMode}>
              <a onClick={editLogo} href="#">
                Edit Logo
              </a>
              <a onClick={toggleLogo} href="#">
                {logoRemoved ? "Show" : "Hide"} logo
              </a>
            </LogoButtons>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
