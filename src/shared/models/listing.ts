export interface ListingConfig {
  transactionType?: 'sell' | 'rent' | 'buy' | 'exchange' | 'other'
  propertyType?: 'flat' | 'house' | 'other';
}

export interface Listing {
  id: string;
  userId: string;
  transactionDetails: {
    transactionType: string;
  };
  propertyDetails: {
    propertyType: string;
    title: string;
    description: string;
    locality: string;
    street: string;
    fullName: string;
    phone: string;
    images?: [string]
  };
  listingDetails: {
    marketType: string;
    adSignature?: string;
    exclusiveOffer?: boolean;
    noAgentProvision?: boolean;
    area: number;
    price: number;
    currency: string;
    rooms?: number;
    floor?: string;
    totalFloors?: number;
    elevator?: boolean;
    buildingType?: string;
    yearBuilt?: string;
    conditionType?: string;
    parkingType?: string;
    energeticCert?: boolean;
  };
}
