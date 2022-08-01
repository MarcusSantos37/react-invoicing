import { Container } from "./styles";

interface InvoiceFooterProps {
  printMode: boolean;
}

export function InvoiceFooter({ printMode }: InvoiceFooterProps) {
  return (
    <Container hide={printMode}>
      <a href="https://jasdeep.ca/?utm_source=angular_invoicing">
        Jasdeep Singh
      </a>{" "}
      &amp; <a href="https://github.com/manpreetrules">Manpreet Singh</a> Made
      with <span className="love">&#9829;</span> in Toronto by{" "}
      <a href="https://metawarelabs.com/?utm_source=angular_invoicing">
        Metaware Labs Inc.
      </a>
    </Container>
  );
}
