/* models/interface.ts */

export interface Municipality {
    id: string;
    name: string;
    district_name: string;
}

// app/models/interfaces.ts

export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
  }
  