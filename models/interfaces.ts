/* models/interface.ts */

export interface Municipality {
    id: string;
    district_name: string;
    name: string;
}

// app/models/interfaces.ts

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: number;
  }
  