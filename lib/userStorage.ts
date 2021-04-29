export default {
  setItem(name: string, value: any) {
    sessionStorage.setItem(name, value);
  },
  getItem(name: string) {
    return sessionStorage.getItem(name);
  }
}