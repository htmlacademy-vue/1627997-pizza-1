import axios from "@/plugins/axios";
import JwtService from "@/services/jwt.service";

//console.log(axios);
//console.log(JwtService);

//запрос на чтение-получение
export class ReadOnlyApiService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  getResource() {
    return this.#resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

//CRUD
export class CrudApiService extends ReadOnlyApiService {
  constructor(resource) {
    super(resource);
  }

  async post(entity) {
    const { data } = await axios.post(super.getResource(), entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(
      `${super.getResource()}/${entity.id}`,
      entity
    );
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${super.getResource()}/${id}`);
    return data;
  }
}

//авторизация
export class AuthApiService {
  setAuthHeader() {
    const token = JwtService.getToken();

    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);

    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");

    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");

    return data;
  }
}
