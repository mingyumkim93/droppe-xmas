export default interface User {
  address: {
    city: string;
    geolocation: {
      lat: number;
      long: number;
    };
    number: number;
    street: string;
    zipcode: string;
  };
  email: string;
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  password: string;
  phone: string;
  username: string;
}
