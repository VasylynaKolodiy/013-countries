import axios from "axios";

export default class getDataCountries {
  static async getAllCountries() {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name,capital,flags,population,region,alpha3Code');
    return response;
  }

  static async getDetailCountry(name) {
    const response = await axios.get('https://restcountries.com/v2/name/' + name);
    return response;
  }

  static async getNameFromCode(code) {
    const response = await axios.get('https://restcountries.com/v2/alpha?codes=' + code);
    return response;
  }
}





