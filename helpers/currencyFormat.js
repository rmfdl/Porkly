function currencyFormat(currency) {
  return `Rp ${currency.toLocaleString("id-ID")}`;
}

module.exports = currencyFormat;
