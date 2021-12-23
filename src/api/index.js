import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL =
  process.env.VUE_APP_BASE_URL || "http://localhost:3000";


class Api {
 getUsers() {
     return this.__request("get", '/users/O6Jd07x7M09NkSl')
 }
 markUserAsPaid(id) {
     return this.__request("patch", `/mark-paid/${id}`)
 }
 deactivateUser(id) {
     return this.__request("patch", `/deactivate-user/${id}`)
 }
 activateUser(id) {
     return this.__request("patch", `/activate-user/${id}`)
 }
 deleteUser(id) {
     return this.__request("delete", `/remove-user/${id}`)
 }

}

export default new Api();