import { Pipe, PipeTransform } from '@angular/core';

interface Translations {
  [key: string]: string;
}

interface HumanReadableValues {
  [key: string]: string;
}

@Pipe({
  name: 'translateDetails',
  standalone: true
})
export class TranslateDetailsPipe implements PipeTransform {
  transform(value: unknown, key: string): string {
    const translations: Translations = {
      'primary': 'Pierwotny',
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
    };

    const humanReadableValues: HumanReadableValues = {
      'true': 'Tak',
      'false': 'Nie'
    };

    const translatedValue = typeof value === 'boolean' ? humanReadableValues[value.toString()] : value;

    return `${translations[key] || key}: ${translatedValue}`;
  }
}
