export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  highlightDish: string;
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'The Slow-Cooked Beef Rendang was extraordinary. You can taste the depth of authentic spices married with the precision of a fine dining kitchen.',
    author: 'Datin Serena Lim',
    role: 'Food & Lifestyle Columnist (Demo Review)',
    rating: 5,
    highlightDish: 'Slow-Cooked Beef Rendang'
  },
  {
    id: 'test-2',
    quote: 'From the Pandan Colada cocktail to the warm ambience, Q-RESTOBAR delivers a truly refreshed modern Malaysian dining narrative in Bukit Bintang.',
    author: 'Marcus Tan',
    role: 'Hospitality Director (Demo Review)',
    rating: 5,
    highlightDish: 'Pandan Colada & Satay'
  },
  {
    id: 'test-3',
    quote: 'The Crispy Soft-Shell Crab Laksa was rich without being overwhelming. The service was intuitive and attentive from start to finish.',
    author: 'Aisyah Razak',
    role: 'Culinary Enthusiast (Demo Review)',
    rating: 5,
    highlightDish: 'Soft-Shell Crab Laksa'
  },
  {
    id: 'test-4',
    quote: 'An ideal venue for intimate client dinners and weekend celebrations. The music curation and private booth seating created the perfect evening.',
    author: 'Jonathan Reynolds',
    role: 'Regional Managing Director (Demo Review)',
    rating: 5,
    highlightDish: 'Black Angus Ribeye Percik'
  }
];
