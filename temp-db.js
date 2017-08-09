import dbc, {Matcher, Category} from './app/services/DBC';

dbc.path = '/Users/jcrouch/Library/Application Support/Cyril/cyril.db';
/*
dbc.initialize().then(() => {
  dbc.matchers.insert(new Matcher(/A AND F WEXNER/, new Category('food', 'cafeteria')));
  dbc.matchers.insert(new Matcher(/BENTO GO/, new Category('food', 'restaurants', 'asian')));
});

*/
dbc.initialize().then(() => {
  dbc.getMatchers();
});
