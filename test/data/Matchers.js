import {Matcher, Category} from '../../app/services/DBC';

export const Matchers = [
  new Matcher(/gr[ae]y/, new Category('color', 'neutral')),
  new Matcher(/forest/, new Category('color', 'cool', 'green')),
  new Matcher(/seafoam/, new Category('color', 'cool', 'green')),
  new Matcher(/navy/, new Category('color', 'cool', 'blue')),
  new Matcher(/royal/, new Category('color', 'cool', 'blue')),
  new Matcher(/mauve/, new Category('color', 'cool', 'purple')),
  new Matcher(/teal/, new Category('color', 'cool')),
  new Matcher(/taupe/, new Category('color', 'neutral', 'brown')),
  new Matcher(/crimson/, new Category('color', 'warm', 'red')),
  new Matcher(/goldenrod/, new Category('color', 'warm', 'yellow')),
  new Matcher(/orange/, new Category('food')),
  new Matcher(/blah/, new Category())
];
