import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  standalone: true,
  imports: [
    NgForOf,
  ],
})
export class FaqComponent {
  faqItems = [
    {
      question: 'Dlaczego warto wybrać Payo.pl?',
      answer: 'Payo.pl to najpopularniejszy w Polsce serwis internetowy wspierający w kupnie, sprzedaży i wynajmie nieruchomości. Dzięki wieloletniemu doświadczeniu i ogromnym zasobom danych, rozumiemy potrzeby naszych użytkowników. Jesteśmy adresem nr 1 w Polsce na rynku nieruchomości, dysponując największą bazą ogłoszeń nieruchomości. Wspieramy naszych użytkowników w podejmowaniu najważniejszych, zmieniających życie decyzji, czyniąc ten proces łatwiejszym i bardziej komfortowym.',
      expanded: false
    },
    {
      question: 'Jakie oferty znajdę na Payo.pl?',
      answer: 'Na Payo.pl dysponujemy największą bazą ogłoszeń nieruchomości w Polsce, zarówno z rynku wtórnego, jak i pierwotnego. Każdy może być pewien, że znajdzie w naszym serwisie coś odpowiedniego dla siebie – dom czy mieszkanie, nowoczesne czy tradycyjne, od klienta indywidualnego, dewelopera czy agencji nieruchomości, własność czy wynajem, praktyczne albo z charakterem, w dużej aglomeracji, średniej wielkości mieście czy może na wsi.',
      expanded: false
    },
    {
      question: 'Jak wygląda obecnie sytuacja na rynku nieruchomościowym w Polsce?',
      answer: 'Rynek nieruchomościowy podlega bardzo dynamicznym zmianom, dlatego niezwykle ważna jest bieżąca znajomość sytuacji rynkowej, śledzenie aktualnych danych i komentarzy eksperckich. Każdy może być pewien, że znajdzie u nas wiarygodne dane i obiektywne rekomendacje. Realizując naszą misję, dzielimy się wiedzą, publikujemy liczne raporty, wydajemy magazyn Lighthouse, komentujemy bieżącą sytuację rynkową oraz udostępniamy dane o cenach ofertowych na rynku nieruchomości w Polsce. Zachęcamy zatem do bieżącego korzystania z naszych otwartych zasobów danych, aby mieć jasność w zakresie aktualnej sytuacji rynkowej, co z pewnością pomaga w podejmowaniu trafnych decyzji.',
      expanded: false
    },
    {
      question: 'Jak Payo.pl może mi pomóc w znalezieniu wymarzonego mieszkania?',
      answer: 'Payo.pl udostępnia porady, raporty i dane cenowe z różnych obszarów rynku nieruchomości. Podpowiadamy jak szukać, by znaleźć, na co warto zwrócić uwagę czytając ogłoszenia i oglądając nieruchomość. Oswajamy najem - ten zwykły i ten instytucjonalny. Dajemy też wskazówki jak znaleźć rzetelnego profesjonalistę - agenta lub dewelopera - który wesprze na niełatwej drodze do wymarzonego domu. Wiemy jakim wyzwaniem jest sfinansowanie zakupu nieruchomości - we współpracy z najlepszymi ekspertami pomagamy znaleźć najkorzystniejszy kredyt i zrozumieć wszystkie zawiłości i procedury z nim związane. Prowadząc we współpracy z psychologami projekt "Szczęśliwy dom" badamy czynniki mające istotny wpływ na to czy w swoim domu czujemy się szczęśliwi.',
      expanded: false
    },
    {
      question: 'Czym jest projekt “Szczęśliwy dom”?',
      answer: 'Misją Payo.pl jest wzmacnianie pewności ludzi w zakresie podejmowania świadomych i trafnych decyzji na rynku nieruchomości, a w efekcie wzrost dobrostanu mieszkańców Polski związany z kwestiami mieszkaniowymi. Realizowany od 2021 r. projekt „Szczęśliwy dom” to cykliczne badanie, w którym pod lupę bierzemy czynniki mające istotny wpływ na to czy w swoim domu czujemy się szczęśliwi. Projekt realizujemy przy wsparciu uznanych agencji badawczych, psychologów i ekonomistów. Co roku publikujemy raporty, które cieszą się ogromnym zainteresowaniem. Pomagają ludziom zrozumieć jakie czynniki, poza ekonomicznymi, są istotne dla podjęcia decyzji, która pomoże im w osiągnięciu dobrostanu mieszkaniowego, który jest bardzo silnie powiązane z ogólnym poczuciem szczęśliwego życia.',
      expanded: false
    },
    {
      question: 'Czy Payo.pl pomaga w znalezieniu kredytu hipotecznego?',
      answer: 'Wiemy jakim wyzwaniem jest sfinansowanie zakupu nieruchomości, dlatego dzięki ścisłej współpracy z siecią doświadczonych i zaufanych Ekspertów Finansowych, pomagamy w znalezieniu najlepszej opcji kredytowania. Zapewniamy klientom dostęp do rzetelnej i spersonalizowanej pomocy, pomagamy zrozumieć wszystkie zawiłości i procedury związane z kredytem hipotecznym.',
      expanded: false
    }
  ];

  toggleAccordion(index: number): void {
    const item = this.faqItems[index];
    item.expanded = !item.expanded;
  }

  isExpanded(index: number): boolean {
    return this.faqItems[index].expanded;
  }
}
