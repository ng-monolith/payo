import { Pipe, PipeTransform } from '@angular/core';

interface Translations {
  [key: string]: string;
}

interface HumanReadableValues {
  [key: string]: { [key: string]: string | undefined } | undefined;
}

@Pipe({
  name: 'translateDetails',
  standalone: true
})
export class TranslateDetailsPipe implements PipeTransform {
  private translations: Translations = {
    'marketType': 'Typ rynku',
    'adSignature': 'Sygnatura',
    'exclusiveOffer': 'Oferta wyłączna',
    'noAgentProvision': 'Bez prowizji',
    'area': 'Powierzchnia',
    'price': 'Cena',
    'currency': 'Waluta',
    'rooms': 'Liczba pokoi',
    'floor': 'Piętro',
    'totalFloors': 'Liczba pięter',
    'elevator': 'Winda',
    'buildingType': 'Typ budynku',
    'yearBuilt': 'Rok budowy',
    'conditionType': 'Stan mieszkania',
    'parkingType': 'Typ parkingu',
    'energeticCert': 'Certyfikat energetyczny',
    'highStandard': 'Wysoki standard',
    'veryGood': 'Bardzo dobry',
    'good': 'Dobry',
    'toRefresh': 'Do odświeżenia',
    'toRenovate': 'Do remontu',
    'developerFinished': 'Deweloperski',
    'newlyFinished': 'Nowe wykończone',
    'block': 'Blok mieszkalny',
    'multifamilyHouse': 'Dom wielorodzinny',
    'detachedHouse': 'Dom wolnostojący',
    'tenement': 'Kamienica',
    'apartmentBuilding': 'Apartamentowiec',
    'loft': 'Loft',
    'residence': 'Rezydencja'
  };

  private humanReadableValues: HumanReadableValues = {
    'exclusiveOffer': { 'true': 'Tak', 'false': 'Nie' },
    'noAgentProvision': { 'true': 'Tak', 'false': 'Nie' },
    'elevator': { 'true': 'Tak', 'false': 'Nie' },
    'energeticCert': { 'true': 'Tak', 'false': 'Nie' },
    'currency': { 'PLN': 'zł', 'EUR': 'Euro', 'USD': 'Dolar amerykański' },
    'buildingType': {
      'block': 'Blok mieszkalny',
      'multifamilyHouse': 'Dom wielorodzinny',
      'detachedHouse': 'Dom wolnostojący',
      'tenement': 'Kamienica',
      'apartmentBuilding': 'Apartamentowiec',
      'loft': 'Loft',
      'residence': 'Rezydencja'
    },
    'conditionType': {
      'highStandard': 'Wysoki standard',
      'veryGood': 'Bardzo dobry',
      'good': 'Dobry',
      'toRefresh': 'Do odświeżenia',
      'toRenovate': 'Do remontu',
      'developerFinished': 'Deweloperski',
      'newlyFinished': 'Nowe wykończone'
    },
    'parkingType': {
      'onStreet': 'Przynależne na ulicy',
      'onFencedGrounds': 'Przynależne na terenie ogrodzonym',
      'inUndergroundGarage': 'W garażu podziemnym',
      'inBuildingGarage': 'Garaż w bryle budynku',
      'detachedGarage': 'Garaż wolnostojący',
      'garageShelter': 'Wiata garażowa',
    },
    'marketType': {
      'primary': 'Pierwotny',
      'secondary': 'Wtórny'
    }
  };

  transform(value: unknown, key: string): string {
    const translation = this.translations[key] || key;
    const valueTranslation = typeof value === 'boolean'
      ? this.humanReadableValues[key] ? this.humanReadableValues[key]![value.toString()] : value
      : this.humanReadableValues[key] ? this.humanReadableValues[key]![value as string] || value : value;

    return `${translation}: ${valueTranslation}`;
  }
}
