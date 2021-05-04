export default {
  setItem(name: string, value: any) {
    let strValue = value;
    if (typeof value !== 'object') {
      strValue = JSON.stringify(value);
    }
    sessionStorage.setItem(name, strValue);
  },
  getItem(name: string) {
    return sessionStorage.getItem(name);
  }
}