interface ILink {
  rel: string,
  href: string,
}
export interface ICustomer {
  city: string,
  content: [],
  email: string,
  firstname: string,
  lastname: string,
  links: ILink[],
  phone: string,
  postcode: string,
  streetaddress: string,
}

export interface ICustomers {
  content: ICustomer[],
  links: ILink[],
}

export interface ITraining {
  date: string,
  duration: number,
  activity: string,
  content: [],
  links: ILink[],
}

export interface ITrainings {
  content: ITraining[],
  links: ILink[],
}


export const API_URL = 'https://customerrest.herokuapp.com/api'