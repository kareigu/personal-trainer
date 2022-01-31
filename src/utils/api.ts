
export interface ICustomer {
  city: string,
  content: [],
  email: string,
  firstname: string,
  lastname: string,
  links: ILink[],
  phone: string,
  postcode: string,
  streetaddress: string
}

interface ILink {
  rel: string,
  href: string
}

export interface ICustomers {
  content: ICustomer[],
  links: ILink[]
}


export const API_URL = 'https://customerrest.herokuapp.com/api'