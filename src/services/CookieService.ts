import Cookies from "universal-cookie";
import { IUserData } from "../interfaces/interface";

const cookies = new Cookies();

class CookieService {
  // ** Get
  get(name: string) {
    return cookies.get(name);
  }
  // ** Set
  set(name: string, value: string | IUserData | undefined, options: object) {
    return cookies.set(name, value, options);
  }
  // ** Remove
  remove(name: string) {
    return cookies.remove(name);
  }
}

export default new CookieService();
