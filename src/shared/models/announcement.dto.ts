export interface TransactionDetails {
  transactionType: 'sell' | 'rent';
}

export interface PropertyDetails {
  propertyType: 'flat' | 'house';
  title: string;
  description: string;
  locality: string;
}

export interface ListingDetails {
  marketType: 'primary' | 'secondary';
  adSignature?: string;
  exclusiveOffer: boolean;
  noAgentProvision: boolean;
  area: number;
  price: number;
  currency: 'PLN' | 'EUR' | 'USD';
  rooms?: number;
  floor?: number;
  totalFloors?: number;
  elevator: boolean;
  buildingType:  'none' | 'block' | 'multifamilyHouse' | 'detachedHouse' | 'tenement' | 'apartmentBuilding' | 'loft' | 'residence';
  yearBuilt?: number;
  conditionType:  'none' | 'highStandard' | 'veryGood' | 'good' | 'toRefresh' | 'toRenovate' | 'developerFinished' | 'newlyFinished';
  parkingType: 'none' | 'onStreet' | 'onFencedGrounds' | 'inUndergroundGarage' | 'inBuildingGarage' | 'detachedGarage' | 'garageShelter';
  energeticCert: boolean;
}
