import { Address } from "./address";

export interface Customer {
    id?: string;
    name: string;
    trips: number;
    address: Address;
}