module.exports = {
  baseUrl: "https://api.coincap.io/v2",
  logoUrl(id, symbol) {
    return `https://cryptologos.cc/logos/${id}-${symbol}-logo.svg?v=012`;
  },
};
