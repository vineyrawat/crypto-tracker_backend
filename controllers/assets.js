const axios = require("axios").default;
const { baseUrl } = require("../config/coincap");

const get = async (url) => {
  try {
    const data = await axios.get(url);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

const asset = {
  async getAll() {
    return await get(baseUrl + "/assets");
  },
  async get(id) {
    return await get(baseUrl + "/assets/" + id);
  },
  async getFiltered(items) {
    let [data, error] = await this.getAll();
    if (error) {
      return error.message;
    } else {
      data = data.data;
      data = data.data;
      const filtered = [];
      items.forEach((item) => {
        return filtered.push(
          data.find((i) => i.symbol == String(item).toUpperCase())
        );
      });
      return [filtered, null];
    }
  },
};

module.exports = asset;
