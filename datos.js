/* ==========================================================
   BOCADILLO A40 · datos compartidos y motor de idiomas
   El mismo fichero está en a40/, a40b/ y a40c/.
   Carta publicada en Google (2026) y pizarra del local.
   Cada texto es [castellano, català, français, english, الدارجة].
   ========================================================== */
(() => {
'use strict';

const LANGS = [
  { k: 'es', n: 'Castellano', s: 'ES', html: 'es' },
  { k: 'ca', n: 'Català', s: 'CA', html: 'ca' },
  { k: 'fr', n: 'Français', s: 'FR', html: 'fr' },
  { k: 'en', n: 'English', s: 'EN', html: 'en' },
  { k: 'ar', n: 'الدارجة', s: 'دارجة', html: 'ar-MA', rtl: true }
];

/* ---------- ingredientes ---------- */
const ING = {
  pan:       { ar: 'خبز', c: '#D9A35B', n: ['Pan', 'Pa', 'Pain', 'Bread', 'الخبز'],
    note: ['Barra crujiente abierta a lo largo: el pan de bocadillo a los dos lados del Estrecho.', 'Barra cruixent oberta pel llarg: el pa d’entrepà als dos costats de l’Estret.', 'Baguette croustillante ouverte sur la longueur : le pain du bocadillo, des deux côtés du détroit.', 'A crusty baguette split lengthwise: sandwich bread on both sides of the Strait.', 'كوميرة مقرمشة محلولة بالطول، خبز البوكاديو فجوج جهات البوغاز.'] },
  lechuga:   { ar: 'خس', c: '#7DBA5C', n: ['Lechuga', 'Enciam', 'Laitue', 'Lettuce', 'خس'],
    note: ['Fresca y crujiente, del mostrador.', 'Fresc i cruixent, del taulell.', 'Fraîche et croquante, du comptoir.', 'Fresh and crunchy, from the counter.', 'طري و مقرمش، من الكونطوار.'] },
  tomate:    { ar: 'ماطيشة', c: '#D9483B', n: ['Tomate', 'Tomàquet', 'Tomate', 'Tomato', 'ماطيشة'],
    note: ['En darija se dice maticha, otra palabra que cruzó desde el español.', 'En dàrija es diu maticha, una altra paraula que va arribar del castellà.', 'En darija on dit maticha, encore un mot venu de l’espagnol.', 'In Darija it’s maticha, another word that crossed over from Spanish.', 'كنقولو ليها ماطيشة، كلمة جات من الإسبانية.'] },
  cebolla:   { ar: 'بصلة', c: '#E9DDF0', n: ['Cebolla', 'Ceba', 'Oignon', 'Onion', 'بصلة'],
    note: ['En aros finos.', 'En anelles fines.', 'En fines rondelles.', 'In thin rings.', 'مقطعة رقيقة.'] },
  pimientos: { ar: 'فلفلة', c: '#3E9B4F', n: ['Pimientos', 'Pebrots', 'Poivrons', 'Peppers', 'فلفلة'],
    note: ['Rojos y verdes: la felfla de la cocina marroquí.', 'Vermells i verds: la felfla de la cuina marroquina.', 'Rouges et verts : la felfla de la cuisine marocaine.', 'Red and green: the felfla of Moroccan cooking.', 'حمرا و خضرا، الفلفلة ديال الماكلة المغربية.'] },
  maiz:      { ar: 'ذرة', c: '#F2C232', n: ['Maíz', 'Blat de moro', 'Maïs', 'Sweetcorn', 'ذرة'],
    note: ['Dulce.', 'Dolç.', 'Doux.', 'Sweet.', 'حلوة.'] },
  aceitunas: { ar: 'زيتون', c: '#6F7D2C', n: ['Aceitunas', 'Olives', 'Olives', 'Olives', 'زيتون'],
    note: ['En Marruecos no hay mesa sin aceitunas.', 'Al Marroc no hi ha taula sense olives.', 'Au Maroc, pas de table sans olives.', 'In Morocco, no table is without olives.', 'ف المغرب ما كايناش طبلة بلا زيتون.'] },
  ensalada:  { ar: 'شلاضة', c: '#4CC36A', n: ['Ensalada', 'Amanida', 'Salade', 'Salad', 'شلاضة'],
    note: ['La ensalada fresca del mostrador: la shlada de cada día.', 'L’amanida fresca del taulell: la shlada de cada dia.', 'La salade fraîche du comptoir : la shlada de tous les jours.', 'Fresh salad from the counter: the everyday shlada.', 'الشلاضة الطرية ديال الكونطوار، ديال كل نهار.'] },
  pollo:     { ar: 'دجاج', c: '#E3A653', n: ['Pollo marinado', 'Pollastre marinat', 'Poulet mariné', 'Marinated chicken', 'دجاج مشرمل'], s: ['Pollo', 'Pollastre', 'Poulet', 'Chicken', 'دجاج'],
    note: ['Marinado en la casa. En Marruecos el adobo lleva especias como el comino, el pimentón o el ajo.', 'Marinat a la casa. Al Marroc l’adob porta espècies com el comí, el pebre vermell o l’all.', 'Mariné maison. Au Maroc, la marinade se fait avec des épices comme le cumin, le paprika ou l’ail.', 'Marinated in-house. In Morocco the marinade uses spices like cumin, paprika or garlic.', 'مشرمل ف الدار. ف المغرب الشرمولة فيها الكامون، التحميرة و الثوم.'] },
  ternera:   { ar: 'لحم', c: '#8E4A30', n: ['Carne de ternera', 'Carn de vedella', 'Bœuf', 'Beef', 'لحم البقري'], s: ['Ternera', 'Vedella', 'Bœuf', 'Beef', 'لحم'],
    note: ['Ternera halal, como toda la carne de la casa.', 'Vedella halal, com tota la carn de la casa.', 'Bœuf halal, comme toute la viande de la maison.', 'Halal beef, like all the meat here.', 'لحم حلال، بحال كاع اللحم ديال الدار.'] },
  kefta:     { ar: 'كفتة', c: '#7A3F28', n: ['Kefta', 'Kefta', 'Kefta', 'Kefta', 'كفتة'],
    note: ['Carne de ternera picada y especiada: la kefta de los zocos de Marruecos.', 'Carn de vedella picada i especiada: la kefta dels socs del Marroc.', 'Bœuf haché et épicé : la kefta des souks du Maroc.', 'Spiced minced beef: the kefta of Morocco’s souks.', 'لحم مفروم بالعطرية، الكفتة ديال السواق ف المغرب.'] },
  salchicha: { ar: 'صوصيص', c: '#C25A44', n: ['Salchicha de ternera', 'Salsitxa de vedella', 'Saucisse de bœuf', 'Beef sausage', 'صوصيص ديال البقري'], s: ['Salchicha', 'Salsitxa', 'Saucisse', 'Sausage', 'صوصيص'],
    note: ['De ternera, halal.', 'De vedella, halal.', 'De bœuf, halal.', 'Beef, halal.', 'ديال البقري، حلال.'] },
  gambas:    { ar: 'قمرون', c: '#F08A5D', n: ['Gambas a la plancha', 'Gambes a la planxa', 'Crevettes à la plancha', 'Grilled prawns', 'قمرون ف البلانشا'], s: ['Gambas', 'Gambes', 'Crevettes', 'Prawns', 'قمرون'],
    note: ['En Tánger se dicen qamroun, del español camarón. Ciudad de puerto: el marisco es de casa.', 'A Tànger en diuen qamroun, del castellà camarón. Ciutat de port: el marisc és de casa.', 'À Tanger on dit qamroun, de l’espagnol camarón. Ville portuaire : les fruits de mer y sont chez eux.', 'In Tangier they’re called qamroun, from Spanish camarón. A port city: seafood is home turf.', 'ف طنجة كنسميوه القمرون، من الإسبانية camarón. مدينة ديال المرسى: الحوت ديالنا.'] },
  calamar:   { ar: 'كلامار', c: '#F1E4C8', n: ['Calamares', 'Calamars', 'Calamars', 'Squid rings', 'كلامار'],
    note: ['En anillas, para el mixto de mar.', 'En anelles, per al mixt de mar.', 'En anneaux, pour le mixte de la mer.', 'In rings, for the seafood mix.', 'دواير، للميكس ديال البحر.'] },
  sepia:     { ar: 'شوبية', c: '#EFE2C4', n: ['Sepia', 'Sípia', 'Seiche', 'Cuttlefish', 'شوبية'],
    note: ['Como en los puertos del Estrecho.', 'Com als ports de l’Estret.', 'Comme dans les ports du détroit.', 'Just like in the ports of the Strait.', 'بحال ف المراسي ديال البوغاز.'] },
  higado:    { ar: 'كبدة', c: '#6A2A26', n: ['Hígado', 'Fetge', 'Foie', 'Liver', 'كبدة'],
    note: ['La kebda: un clásico de los puestos callejeros de Marruecos.', 'La kebda: un clàssic de les parades de carrer del Marroc.', 'La kebda : un classique des stands de rue au Maroc.', 'Kebda: a classic of Moroccan street stalls.', 'الكبدة، ماكلة الزنقة المعروفة ف المغرب.'] },
  salsa:     { ar: 'صلصة', c: '#F2B36B', n: ['Salsa de la casa', 'Salsa de la casa', 'Sauce maison', 'House sauce', 'صلصة الدار'], s: ['Salsa', 'Salsa', 'Sauce', 'Sauce', 'صلصة'],
    note: ['La receta es de la casa. Junto a la plancha hay más: andaluza, pimienta…', 'La recepta és de la casa. Al costat de la planxa n’hi ha més: andalusa, pebre…', 'Recette maison. À côté de la plancha, il y en a d’autres : andalouse, poivre…', 'A house recipe. By the grill there are more: andalouse, pepper…', 'الوصفة ديال الدار. حدا البلانشا كاينين خرين: أندلوس، الإبزار…'] },
  huevo:     { ar: 'بيض', c: '#FFF4D6', n: ['Huevo duro', 'Ou dur', 'Œuf dur', 'Boiled egg', 'بيض مسلوق'], s: ['Huevo', 'Ou', 'Œuf', 'Egg', 'بيض'],
    note: ['Como en el bocadillo estilo Tánger del mural.', 'Com a l’entrepà estil Tànger del mural.', 'Comme dans le bocadillo style Tanger de la fresque.', 'Like the Tangier-style bocadillo on the mural.', 'بحال البوكاديو الطنجاوي اللي مرسوم ف الحيط.'] },
  remolacha: { ar: '', c: '#9A2357', n: ['Remolacha', 'Remolatxa', 'Betterave', 'Beetroot', 'شمندر'],
    note: ['Del mostrador.', 'Del taulell.', 'Du comptoir.', 'From the counter.', 'من الكونطوار.'] },
  zanahoria: { ar: 'خيزو', c: '#EE8A2E', n: ['Zanahoria', 'Pastanaga', 'Carotte', 'Carrot', 'خيزو'],
    note: ['En darija, khizou.', 'En dàrija, khizou.', 'En darija, khizou.', 'In Darija, khizou.', 'خيزو، بالدارجة.'] },
  cebmorada: { ar: 'بصلة حمرا', c: '#9C4A88', n: ['Cebolla morada', 'Ceba vermella', 'Oignon rouge', 'Red onion', 'بصلة حمرا'],
    note: ['Del mostrador.', 'Del taulell.', 'Du comptoir.', 'From the counter.', 'من الكونطوار.'] }
};
const EXTRAS = ['huevo', 'aceitunas', 'maiz', 'remolacha', 'zanahoria', 'cebmorada'];

/* ---------- bocadillos ---------- */
const BOC = [
  { id: 'vegetal', p: 5, ar: 'خضرة', cat: 'veg', ings: ['lechuga', 'tomate', 'cebolla', 'pimientos', 'maiz', 'aceitunas', 'salsa'],
    n: ['Vegetal', 'Vegetal', 'Végétarien', 'Veggie', 'بالخضرة'],
    d: ['Lechuga, tomate, cebolla, pimientos, maíz, aceitunas y salsa de la casa. El más ligero de la carta.', 'Enciam, tomàquet, ceba, pebrots, blat de moro, olives i salsa de la casa. El més lleuger de la carta.', 'Laitue, tomate, oignon, poivrons, maïs, olives et sauce maison. Le plus léger de la carte.', 'Lettuce, tomato, onion, peppers, sweetcorn, olives and house sauce. The lightest on the menu.', 'خس، ماطيشة، بصلة، فلفلة، ذرة، زيتون و صلصة الدار. الأخف ف المنيو.'],
    tip: ['Pídelo estilo Tánger: en el mostrador eliges tus ingredientes favoritos.', 'Demana’l estil Tànger: al taulell tries els teus ingredients preferits.', 'Demandez-le style Tanger : au comptoir, vous choisissez vos ingrédients préférés.', 'Ask for it Tangier style: pick your favourite toppings at the counter.', 'طلبو على الطريقة الطنجاوية: ف الكونطوار كتختار داكشي اللي كيعجبك.'] },
  { id: 'pollo', p: 6, ar: 'دجاج', cat: 'pollo', ings: ['lechuga', 'pollo', 'salsa'],
    n: ['Pollo', 'Pollastre', 'Poulet', 'Chicken', 'دجاج'],
    d: ['Pollo marinado, lechuga y salsa de la casa.', 'Pollastre marinat, enciam i salsa de la casa.', 'Poulet mariné, laitue et sauce maison.', 'Marinated chicken, lettuce and house sauce.', 'دجاج مشرمل، خس و صلصة الدار.'] },
  { id: 'kefta', p: 6, ar: 'كفتة', cat: 'carne', ings: ['ensalada', 'kefta', 'salsa'],
    n: ['Kefta', 'Kefta', 'Kefta', 'Kefta', 'كفتة'],
    d: ['Carne de ternera especiada, ensalada y salsa de la casa. El sabor de los puestos de la medina, en barra.', 'Carn de vedella especiada, amanida i salsa de la casa. El gust de les parades de la medina, en barra.', 'Bœuf épicé, salade et sauce maison. Le goût des stands de la médina, en baguette.', 'Spiced beef, salad and house sauce. The taste of the medina’s stalls, in a baguette.', 'لحم بالعطرية، شلاضة و صلصة الدار. البنة ديال المدينة القديمة ف كوميرة.'] },
  { id: 'salchicha', p: 6, ar: 'صوصيص', cat: 'carne', ings: ['lechuga', 'salchicha', 'salsa'],
    n: ['Salchicha', 'Salsitxa', 'Saucisse', 'Sausage', 'صوصيص'],
    d: ['Salchicha de ternera, lechuga y salsa de la casa.', 'Salsitxa de vedella, enciam i salsa de la casa.', 'Saucisse de bœuf, laitue et sauce maison.', 'Beef sausage, lettuce and house sauce.', 'صوصيص ديال البقري، خس و صلصة الدار.'] },
  { id: 'mixto', p: 7, ar: 'دجاج و لحم', cat: 'carne pollo', ings: ['ensalada', 'pollo', 'ternera', 'salsa'],
    n: ['Mixto pollo y carne', 'Mixt pollastre i carn', 'Mixte poulet et bœuf', 'Chicken & beef mix', 'ميكس دجاج و لحم'],
    d: ['Pollo marinado y carne de ternera, con ensalada y salsa de la casa. Para quien no quiere elegir.', 'Pollastre marinat i carn de vedella, amb amanida i salsa de la casa. Per a qui no vol triar.', 'Poulet mariné et bœuf, avec salade et sauce maison. Pour ceux qui ne veulent pas choisir.', 'Marinated chicken and beef, with salad and house sauce. For those who can’t choose.', 'دجاج مشرمل و لحم، بالشلاضة و صلصة الدار. للي ما بغاش يختار.'] },
  { id: 'gambas', p: 7, ar: 'قمرون', cat: 'mar', ings: ['ensalada', 'gambas', 'salsa'],
    n: ['Gambas', 'Gambes', 'Crevettes', 'Prawns', 'قمرون'],
    d: ['Gambas a la plancha, ensalada y salsa de la casa.', 'Gambes a la planxa, amanida i salsa de la casa.', 'Crevettes à la plancha, salade et sauce maison.', 'Grilled prawns, salad and house sauce.', 'قمرون ف البلانشا، شلاضة و صلصة الدار.'] },
  { id: 'mar', p: 7, ar: '', cat: 'mar', ings: ['ensalada', 'calamar', 'gambas', 'salsa'],
    n: ['Mixto gambas y sepia', 'Mixt gambes i sípia', 'Mixte crevettes et seiche', 'Prawn & cuttlefish mix', 'ميكس قمرون و شوبية'],
    d: ['Calamares y gambas, con ensalada y salsa de la casa. El bocadillo de puerto.', 'Calamars i gambes, amb amanida i salsa de la casa. L’entrepà de port.', 'Calamars et crevettes, avec salade et sauce maison. Le sandwich du port.', 'Squid and prawns, with salad and house sauce. The harbour sandwich.', 'كلامار و قمرون، بالشلاضة و صلصة الدار. البوكاديو ديال المرسى.'] },
  { id: 'carne', p: 6, ar: 'لحم', board: true, cat: 'carne', ings: ['ensalada', 'ternera', 'salsa'],
    n: ['Carne', 'Carn', 'Bœuf', 'Beef', 'لحم'],
    d: ['Carne de ternera. Está en la pizarra del local; aquí lo montamos con ensalada y salsa, como los demás: pregunta en el mostrador cómo lo quieres.', 'Carn de vedella. És a la pissarra del local; aquí el muntem amb amanida i salsa, com els altres: pregunta al taulell com el vols.', 'Bœuf. Il est sur l’ardoise du local ; ici on le compose avec salade et sauce, comme les autres : demandez au comptoir comment vous le voulez.', 'Beef. It’s on the shop’s chalkboard; here we build it with salad and sauce like the others — ask at the counter how you’d like it.', 'لحم البقري. مكتوب ف اللوحة ديال المحل؛ هنا ركبناه بالشلاضة و الصلصة بحال الآخرين: سول ف الكونطوار كيفاش بغيتيه.'] },
  { id: 'higado', p: 6, ar: 'كبدة', board: true, cat: 'carne', ings: ['ensalada', 'higado', 'salsa'],
    n: ['Hígado', 'Fetge', 'Foie', 'Liver', 'كبدة'],
    d: ['Hígado, la kebda de los puestos de Tánger. Está en la pizarra del local; aquí lo montamos con ensalada y salsa.', 'Fetge, la kebda de les parades de Tànger. És a la pissarra del local; aquí el muntem amb amanida i salsa.', 'Foie, la kebda des stands de Tanger. Il est sur l’ardoise du local ; ici on le compose avec salade et sauce.', 'Liver: the kebda of Tangier’s stalls. It’s on the shop’s chalkboard; here we build it with salad and sauce.', 'الكبدة ديال طنجة. مكتوبة ف اللوحة ديال المحل؛ هنا ركبناها بالشلاضة و الصلصة.'] },
  { id: 'sepia', p: 7, ar: '', board: true, cat: 'mar', ings: ['ensalada', 'sepia', 'salsa'],
    n: ['Sepia', 'Sípia', 'Seiche', 'Cuttlefish', 'شوبية'],
    d: ['Sepia. Está en la pizarra del local; aquí la montamos con ensalada y salsa, como el resto.', 'Sípia. És a la pissarra del local; aquí la muntem amb amanida i salsa, com la resta.', 'Seiche. Elle est sur l’ardoise du local ; ici on la compose avec salade et sauce, comme les autres.', 'Cuttlefish. It’s on the shop’s chalkboard; here we build it with salad and sauce like the rest.', 'الشوبية. مكتوبة ف اللوحة ديال المحل؛ هنا ركبناها بالشلاضة و الصلصة بحال الباقي.'] }
];

/* ---------- carta ---------- */
const HOUSE = ['salsa de la casa', 'salsa de la casa', 'sauce maison', 'house sauce', 'صلصة الدار'];
const MENU = [
  { id: 'boc', ar: 'بوكاديو', n: ['Bocadillos', 'Entrepans', 'Sandwichs', 'Sandwiches', 'بوكاديو'],
    sub: ['En barra, con la salsa de la casa · todo halal', 'En barra, amb la salsa de la casa · tot halal', 'En baguette, avec la sauce maison · tout halal', 'In a baguette, with the house sauce · all halal', 'ف الكوميرة، بصلصة الدار · كلشي حلال'],
    items: BOC.map((b) => ({ id: b.id, p: b.p, board: b.board, n: b.n, d: b.board ? null : b.d.map((s) => s.split('. ')[0].replace(/\.?$/, '.')) })) },
  { id: 'tacos', ar: 'طاكوس', n: ['Tacos', 'Tacos', 'Tacos', 'Tacos', 'طاكوس'],
    sub: ['Tacos franceses: tortilla maison a la plancha, con las patatas dentro.', 'Tacos francesos: tortilla de blat feta a la planxa, amb les patates a dins.', 'French tacos : galette maison à la plancha, avec les frites dedans.', 'French tacos: a house wrap toasted on the grill, with the fries inside.', 'طاكوس فرنسي: طورطية ديال الدار ف البلانشا، و الفريت داخلها.'],
    items: [
      { p: 7, n: ['Pollo', 'Pollastre', 'Poulet', 'Chicken', 'دجاج'], d: ['Pollo marinado, patatas fritas, salsa de la casa.', 'Pollastre marinat, patates fregides, salsa de la casa.', 'Poulet mariné, frites, sauce maison.', 'Marinated chicken, fries, house sauce.', 'دجاج مشرمل، فريت، صلصة الدار.'] },
      { p: 7, n: ['Kefta', 'Kefta', 'Kefta', 'Kefta', 'كفتة'], d: ['Carne de ternera, patatas fritas, salsa de la casa.', 'Carn de vedella, patates fregides, salsa de la casa.', 'Bœuf, frites, sauce maison.', 'Beef, fries, house sauce.', 'لحم، فريت، صلصة الدار.'] },
      { p: 8, n: ['Cordon bleu', 'Cordon bleu', 'Cordon bleu', 'Cordon bleu', 'كوردون بلو'], d: ['Pollo empanado, jamón, queso fundido, patatas fritas, salsa de la casa.', 'Pollastre arrebossat, pernil, formatge fos, patates fregides, salsa de la casa.', 'Poulet pané, jambon, fromage fondu, frites, sauce maison.', 'Breaded chicken, ham, melted cheese, fries, house sauce.', 'دجاج مقرمش، جمبون، فرماج دايب، فريت، صلصة الدار.'] },
      { p: 8, nuevo: true, n: ['Mixto pollo y carne', 'Mixt pollastre i carn', 'Mixte poulet et bœuf', 'Chicken & beef mix', 'ميكس دجاج و لحم'], d: ['Pollo marinado, carne de ternera, patatas fritas, salsa de la casa.', 'Pollastre marinat, carn de vedella, patates fregides, salsa de la casa.', 'Poulet mariné, bœuf, frites, sauce maison.', 'Marinated chicken, beef, fries, house sauce.', 'دجاج مشرمل، لحم، فريت، صلصة الدار.'] },
      { p: 8, board: true, n: ['Pescado', 'Peix', 'Poisson', 'Fish', 'حوت'] }
    ] },
  { id: 'burger', ar: 'برغر', n: ['Hamburguesas', 'Hamburgueses', 'Burgers', 'Burgers', 'برغر'],
    sub: ['Hamburguesa halal.', 'Hamburguesa halal.', 'Burgers halal.', 'Halal burgers.', 'برغر حلال.'],
    items: [
      { p: 5, n: ['Burger', 'Burger', 'Burger', 'Burger', 'برغر'], d: ['Carne, lechuga, tomate, cebolla, salsa de la casa.', 'Carn, enciam, tomàquet, ceba, salsa de la casa.', 'Steak, laitue, tomate, oignon, sauce maison.', 'Beef patty, lettuce, tomato, onion, house sauce.', 'لحم، خس، ماطيشة، بصلة، صلصة الدار.'] },
      { p: 6, n: ['Burger + huevo', 'Burger + ou', 'Burger + œuf', 'Burger + egg', 'برغر + بيض'], d: ['Carne, huevo, queso, lechuga, salsa de la casa.', 'Carn, ou, formatge, enciam, salsa de la casa.', 'Steak, œuf, fromage, laitue, sauce maison.', 'Beef patty, egg, cheese, lettuce, house sauce.', 'لحم، بيض، فرماج، خس، صلصة الدار.'] },
      { p: 7, n: ['Burger super', 'Burger super', 'Burger super', 'Super burger', 'برغر سوبر'], d: ['Carne doble, queso, huevo, lechuga, bacon, salsa de la casa.', 'Carn doble, formatge, ou, enciam, bacó, salsa de la casa.', 'Double steak, fromage, œuf, laitue, bacon, sauce maison.', 'Double patty, cheese, egg, lettuce, bacon, house sauce.', 'جوج ديال اللحم، فرماج، بيض، خس، بيكون، صلصة الدار.'] }
    ] },
  { id: 'patatas', ar: 'بطاطا', n: ['Patatas', 'Patates', 'Frites', 'Fries', 'فريت'],
    sub: ['Patatas fritas cargadas.', 'Patates fregides carregades.', 'Frites garnies.', 'Loaded fries.', 'فريت معمرة.'],
    items: [
      { p: 4, n: ['Jalapeño y cheddar', 'Jalapeño i cheddar', 'Jalapeño et cheddar', 'Jalapeño & cheddar', 'خالابينيو و شيدر'], d: ['Jalapeños, salsa de queso cheddar y cebolla crujiente.', 'Jalapeños, salsa de formatge cheddar i ceba cruixent.', 'Jalapeños, sauce cheddar et oignons croustillants.', 'Jalapeños, cheddar cheese sauce and crispy onion.', 'خالابينيو، صلصة الفرماج شيدر و بصلة مقرمشة.'] },
      { p: 4, n: ['Bacon y cheddar', 'Bacó i cheddar', 'Bacon et cheddar', 'Bacon & cheddar', 'بيكون و شيدر'], d: ['Bacon y salsa de queso cheddar.', 'Bacó i salsa de formatge cheddar.', 'Bacon et sauce cheddar.', 'Bacon and cheddar cheese sauce.', 'بيكون و صلصة الفرماج شيدر.'] },
      { p: 4, n: ['Kebab', 'Kebab', 'Kebab', 'Kebab', 'كباب'], d: ['Kebab, salsa de 4 quesos y salsa andaluza.', 'Kebab, salsa de 4 formatges i salsa andalusa.', 'Kebab, sauce 4 fromages et sauce andalouse.', 'Kebab, four-cheese sauce and andalouse sauce.', 'كباب، صلصة 4 ديال الفرماج و صلصة أندلوس.'] },
      { p: 4, n: ['Patatas fritas', 'Patates fregides', 'Frites', 'Fries', 'فريت'], d: ['Solas, para acompañar.', 'Soles, per acompanyar.', 'Nature, en accompagnement.', 'Plain, on the side.', 'بوحدها، مع الماكلة.'] }
    ] },
  { id: 'ens', ar: 'شلاضة', n: ['Ensaladas', 'Amanides', 'Salades', 'Salads', 'شلاضة'],
    sub: ['Frescas.', 'Fresques.', 'Fraîches.', 'Fresh.', 'طرية.'],
    items: [
      { p: 5.9, n: ['César', 'Cèsar', 'César', 'Caesar', 'سيزار'], d: ['Lechuga o mezclum, tomate cherry, pan tostado, pollo y salsa César.', 'Enciam o mesclum, tomàquet cherry, pa torrat, pollastre i salsa Cèsar.', 'Laitue ou mesclun, tomates cerises, croûtons, poulet et sauce César.', 'Lettuce or mesclun, cherry tomatoes, toasted bread, chicken and Caesar dressing.', 'خس ولا مسكلون، ماطيشة صغيرة، خبز محمر، دجاج و صلصة سيزار.'] },
      { p: 6.9, n: ['Queso de cabra', 'Formatge de cabra', 'Chèvre', 'Goat’s cheese', 'فرماج المعزة'], d: ['Lechuga, tomate, cebolla, aceitunas negras y queso de cabra.', 'Enciam, tomàquet, ceba, olives negres i formatge de cabra.', 'Laitue, tomate, oignon, olives noires et fromage de chèvre.', 'Lettuce, tomato, onion, black olives and goat’s cheese.', 'خس، ماطيشة، بصلة، زيتون كحل و فرماج المعزة.'] }
    ] },
  { id: 'picar', ar: 'مقبلات', n: ['Para picar', 'Per picar', 'À grignoter', 'Snacks', 'حاجة خفيفة'],
    sub: ['Para compartir… o no.', 'Per compartir… o no.', 'À partager… ou pas.', 'For sharing… or not.', 'باش تقسمها… ولا لا.'],
    items: [
      { p: 4.9, n: ['Alitas de pollo', 'Aletes de pollastre', 'Ailes de poulet', 'Chicken wings', 'جوانح الدجاج'] },
      { p: 4.5, n: ['Nuggets', 'Nuggets', 'Nuggets', 'Nuggets', 'ناغتس'], d: ['Seis unidades.', 'Sis unitats.', 'Six pièces.', 'Six pieces.', 'ستة ديال الحبات.'] }
    ] },
  { id: 'beber', ar: 'عصير', n: ['Batidos y bebidas', 'Batuts i begudes', 'Shakes et boissons', 'Shakes & drinks', 'عصير و مشروبات'],
    sub: ['El batido de aguacate es un clásico de las zumerías de Marruecos.', 'El batut d’alvocat és un clàssic de les botigues de sucs del Marroc.', 'Le jus d’avocat est un classique des bars à jus marocains.', 'Avocado shake is a classic of Moroccan juice bars.', 'عصير الأفوكا كلاسيك ف المحلبات ديال المغرب.'],
    items: [
      { p: 3, n: ['Batido de aguacate', 'Batut d’alvocat', 'Shake à l’avocat', 'Avocado shake', 'ميلكشيك الأفوكا'] },
      { p: 3, n: ['Batido de mango', 'Batut de mango', 'Shake à la mangue', 'Mango shake', 'ميلكشيك المانغو'] },
      { p: 3, n: ['Batido de fresa', 'Batut de maduixa', 'Shake à la fraise', 'Strawberry shake', 'ميلكشيك الفريز'] },
      { p: 3, n: ['Zumo de aguacate', 'Suc d’alvocat', 'Jus d’avocat', 'Avocado juice', 'عصير الأفوكا'] },
      { p: 1.5, n: ['Refresco en lata', 'Refresc en llauna', 'Soda en canette', 'Canned soft drink', 'مونادا ف الكانيط'], d: ['Coca-Cola, Fanta, Sprite, Oasis o Nestea.', 'Coca-Cola, Fanta, Sprite, Oasis o Nestea.', 'Coca-Cola, Fanta, Sprite, Oasis ou Nestea.', 'Coca-Cola, Fanta, Sprite, Oasis or Nestea.', 'Coca-Cola، Fanta، Sprite، Oasis ولا Nestea.'] },
      { p: 1, n: ['Agua', 'Aigua', 'Eau', 'Water', 'الما'] }
    ] }
];

/* ---------- textos comunes ---------- */
const COMMON = {
  pizarra: ['pizarra', 'pissarra', 'ardoise', 'chalkboard', 'اللوحة'],
  nuevo: ['nuevo', 'nou', 'nouveau', 'new', 'جديد'],
  open: ['Abierto · hasta las 24:00', 'Obert · fins a les 24:00', 'Ouvert · jusqu’à minuit', 'Open · until midnight', 'محلول · حتى لـ 12 ديال الليل'],
  closedMon: ['Cerrado · el martes a las 12:00', 'Tancat · dimarts a les 12:00', 'Fermé · mardi à 12 h', 'Closed · Tuesday at 12:00', 'مسدود · نهار الثلاث مع 12 ديال النهار'],
  closedAm: ['Cerrado · abrimos a las 12:00', 'Tancat · obrim a les 12:00', 'Fermé · ouverture à 12 h', 'Closed · opens at 12:00', 'مسدود · كنحلو مع 12 ديال النهار'],
  lang: ['Idioma', 'Idioma', 'Langue', 'Language', 'اللغة'],
  extra: ['extra', 'extra', 'extra', 'extra', 'زيادة'],
  board: ['En la pizarra del local', 'A la pissarra del local', 'Sur l’ardoise du local', 'On the shop’s chalkboard', 'ف اللوحة ديال المحل']
};

/* ---------- motor ---------- */
const P = new URLSearchParams(location.search);
let saved = null;
try { saved = localStorage.getItem('a40-lang'); } catch (e) { /* sin almacenamiento */ }
const valid = (k) => LANGS.some((l) => l.k === k);
let cur = valid(P.get('lang')) ? P.get('lang') : valid(saved) ? saved : 'es';
const subs = [];
const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const GLOBE = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 2.8c2.6 2.6 3.8 5.7 3.8 9.2s-1.2 6.6-3.8 9.2M12 2.8C9.4 5.4 8.2 8.5 8.2 12s1.2 6.6 3.8 9.2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

const A40 = window.A40 = {
  LANGS, ING, BOC, MENU, EXTRAS, COMMON,
  UI: {}, SITE: {},
  get lang() { return cur; },
  get i() { return LANGS.findIndex((l) => l.k === cur); },
  get rtl() { return cur === 'ar'; },
  L(v) { if (v == null) return ''; if (!Array.isArray(v)) return String(v); return v[A40.i] ?? v[0]; },
  t(k) { const v = A40.UI[k] || COMMON[k]; return v ? A40.L(v) : ''; },
  eur(p) { return cur === 'en' ? '€' + p.toFixed(2) : p.toFixed(2).replace('.', ',') + ' €'; },
  eur0(p) { const s = Number.isInteger(p) ? String(p) : p.toFixed(2).replace('.', cur === 'en' ? '.' : ','); return cur === 'en' ? '€' + s : s + ' €'; },
  on(fn) { subs.push(fn); },
  set(k) {
    if (!valid(k) || k === cur) return;
    cur = k;
    try { localStorage.setItem('a40-lang', k); } catch (e) { /* sin almacenamiento */ }
    const u = new URL(location.href);
    if (k === 'es') u.searchParams.delete('lang'); else u.searchParams.set('lang', k);
    history.replaceState(null, '', u);
    A40.apply();
  },
  apply() {
    const l = LANGS[A40.i], root = document.documentElement;
    root.lang = l.html; root.dir = l.rtl ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-t]').forEach((el) => { const s = A40.t(el.dataset.t); if (s) el.innerHTML = s; });
    document.querySelectorAll('[data-ta]').forEach((el) => el.dataset.ta.split(',').forEach((p) => { const [a, k] = p.split(':'); const s = A40.t(k); if (s) el.setAttribute(a, strip(s)); }));
    if (A40.UI['meta.title']) document.title = strip(A40.t('meta.title'));
    const md = document.querySelector('meta[name="description"]');
    if (md && A40.UI['meta.desc']) md.setAttribute('content', strip(A40.t('meta.desc')));
    document.querySelectorAll('[data-lang]').forEach((box) => {
      const b = box.querySelector('.lang__btn');
      b.querySelector('span').textContent = l.s;
      b.setAttribute('aria-label', A40.t('lang') + ': ' + l.n);
      box.querySelectorAll('[data-l]').forEach((o) => o.setAttribute('aria-checked', o.dataset.l === cur));
    });
    document.querySelectorAll('a[data-keep-lang]').forEach((a) => {
      const base = a.getAttribute('href').split('?')[0];
      a.setAttribute('href', cur === 'es' ? base : base + '?lang=' + cur);
    });
    subs.forEach((fn) => { try { fn(cur); } catch (e) { console.error(e); } });
  },
  start() {
    document.querySelectorAll('[data-lang]').forEach((box) => {
      box.innerHTML = `<button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false">${GLOBE}<span>ES</span></button>
        <ul class="lang__menu" role="menu">${LANGS.map((l) => `<li role="none"><button type="button" role="menuitemradio" data-l="${l.k}" lang="${l.html}" aria-checked="false">${l.n}</button></li>`).join('')}</ul>`;
      const btn = box.querySelector('.lang__btn');
      const close = () => { box.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
      btn.addEventListener('click', (e) => { e.stopPropagation(); const o = !box.classList.contains('is-open'); box.classList.toggle('is-open', o); btn.setAttribute('aria-expanded', o); if (o) box.querySelector('[aria-checked="true"]')?.focus(); });
      box.addEventListener('click', (e) => { const o = e.target.closest('[data-l]'); if (o) { A40.set(o.dataset.l); close(); btn.focus(); } });
      document.addEventListener('click', (e) => { if (!box.contains(e.target)) close(); });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { close(); btn.focus(); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const os = [...box.querySelectorAll('[data-l]')], k = os.indexOf(document.activeElement);
          if (k >= 0) { e.preventDefault(); os[(k + (e.key === 'ArrowDown' ? 1 : -1) + os.length) % os.length].focus(); }
        }
      });
    });
    A40.apply();
  }
};
})();
