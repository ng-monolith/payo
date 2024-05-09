import {
  BuildingType,
  ConditionType,
  CurrencyType,
  MarketType,
  ParkingType,
  PropertyType,
  TransactionType,
} from './types';

export interface ListingConfig {
  transactionType?: TransactionType;
  propertyType?: PropertyType;
}

export interface Listing {
  id?: string;
  userId: string;
  transactionDetails: {
    transactionType: TransactionType;
  };
  propertyDetails: {
    propertyType: PropertyType;
    title: string;
    description: string;
    locality: string;
    street: string;
    fullName: string;
    phone: string;
    images?: string[];
  };
  listingDetails: {
    marketType: MarketType;
    adSignature?: string;
    exclusiveOffer?: boolean;
    noAgentProvision?: boolean;
    area: number;
    price: number;
    deposit?: number;
    rent?: number;
    currency: CurrencyType;
    rooms?: number;
    floor?: string;
    totalFloors?: number;
    elevator?: boolean;
    buildingType?: BuildingType;
    yearBuilt?: string | number
    conditionType?: ConditionType;
    parkingType?: ParkingType;
    energeticCert?: boolean;
  };
}
