"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Search, Heart, Dog, Cat, Check, X, Info, Activity, AlertTriangle, Utensils, Clock, Stethoscope, BookOpen } from 'lucide-react';

// Comprehensive breed list for suggestions
const ALL_BREEDS = {
  dogs: [
  // Razze Italiane
  'Lagotto Romagnolo', 'Cane Corso', 'Mastino Napoletano', 'Spinone Italiano', 'Bracco Italiano',
  'Segugio Italiano', 'Volpino Italiano', 'Levriero Italiano', 'Pastore Maremmano-Abruzzese',

  // Razze Popolari Internazionali
  'Labrador Retriever', 'Golden Retriever', 'Pastore Tedesco', 'Bulldog Francese', 'Bulldog Inglese',
  'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Poodle', 'Barboncino', 'Chihuahua', 'Dachshund',
  'Siberian Husky', 'Pomeranian', 'Boston Terrier', 'Australian Shepherd', 'Border Collie',
  'Cocker Spaniel', 'Maltese', 'Shih Tzu', 'Pug', 'Carlino', 'Jack Russell Terrier',
  'Doberman', 'Great Dane', 'Alano', 'Boxer', 'Weimaraner', 'Vizsla', 'Pointer',
  'Setter Inglese', 'Setter Irlandese', 'Springer Spaniel', 'Cavalier King Charles Spaniel',
  'Bichon Frise', 'Havanese', 'Papillon', 'Pekingese', 'Afghan Hound', 'Saluki',
  'Whippet', 'Greyhound', 'Rhodesian Ridgeback', 'Dalmatian', 'Dalmata',
  'Saint Bernard', 'San Bernardo', 'Bernese Mountain Dog', 'Newfoundland', 'Terranova',
  'Mastiff', 'Bull Terrier', 'Staffordshire Bull Terrier', 'American Pit Bull Terrier',
  'Chow Chow', 'Shar Pei', 'Akita', 'Shiba Inu', 'Basenji', 'Pharaoh Hound',
  'Irish Wolfhound', 'Scottish Deerhound', 'Borzoi', 'Samoyed', 'Malamute',
  'Keeshond', 'Finnish Spitz', 'Norwegian Elkhound', 'Icelandic Sheepdog',
  'Collie', 'Shetland Sheepdog', 'Old English Sheepdog', 'Bearded Collie',
  'Belgian Malinois', 'Belgian Tervuren', 'Briard', 'Bouvier des Flandres',
  'Schnauzer', 'Giant Schnauzer', 'Miniature Schnauzer', 'Wire Fox Terrier',
  'Smooth Fox Terrier', 'Airedale Terrier', 'Welsh Terrier', 'Scottish Terrier',
  'West Highland White Terrier', 'Cairn terrier', 'Norfolk Terrier', 'Norwich Terrier',

  // Meticci e Incroci
  'Meticcio', 'Incrocio', 'Mix', 'Bastardino', 'Cane Fantasia'],

  cats: [
  // Razze di Gatti Popolari
  'Persiano', 'Maine Coon', 'British Shorthair', 'Siamese', 'Ragdoll', 'Bengala',
  'Scottish Fold', 'Sphynx', 'Russian Blue', 'Blu di Russia', 'Abissino', 'Birman',
  'Norwegian Forest Cat', 'Siberian', 'Siberiano', 'Oriental Shorthair', 'Burmese',
  'Tonkinese', 'Somali', 'Turkish Angora', 'Angora Turco', 'Turkish Van',
  'Egyptian Mau', 'Mau Egiziano', 'Ocicat', 'Savannah', 'Selkirk Rex', 'Devon Rex',
  'Cornish Rex', 'LaPerm', 'American Curl', 'Manx', 'Japanese Bobtail',
  'American Shorthair', 'Europeo', 'Charteux', 'Korat', 'Balinese', 'Javanese',
  'Colorpoint Shorthair', 'Havana Brown', 'Bombay', 'Exotic Shorthair',
  'American Wirehair', 'Scottish Straight', 'Highlander', 'Pixie-bob',
  'Toyger', 'Chausie', 'Serengeti', 'Ashera', 'Peterbald', 'Don Sphynx',
  'Munchkin', 'Singapura', 'Snowshoe', 'Ragamuffin', 'Nebelung',

  // Razze Italiane e Europee
  'Gatto Europeo', 'Gatto Comune Europeo', 'Soriano',

  // Meticci
  'Meticcio', 'Incrocio', 'Mix', 'Gatto Comune', 'Trovatello']
};

// Expanded detailed breed information database
const BREED_INFO = {
  'Labrador Retriever': {
    history: `Il Labrador Retriever ha origini canadesi, precisamente dall'isola di Terranova. Inizialmente chiamato "St. John's dog", era utilizzato dai pescatori per recuperare le reti e i pesci che sfuggivano dalle lenze. Nel XIX secolo, alcuni esemplari furono portati in Inghilterra, dove la razza fu selezionata e perfezionata. Il nome "Labrador" deriva dalla regione omonima del Canada. La razza fu riconosciuta ufficialmente dal Kennel Club inglese nel 1903. Grazie alla sua intelligenza, docilità e versatilità, il Labrador è diventato uno dei cani più popolari al mondo, eccellendo come cane da compagnia, da assistenza, da ricerca e soccorso, e nella pet therapy.`,
    characteristics: [
    'Cane di taglia media-grande (25-36 kg)',
    'Temperamento amichevole e socievole',
    'Intelligente e facile da addestrare',
    'Ama l\'acqua e il nuoto',
    'Ottimo con bambini e altri animali',
    'Pelo corto e impermeabile',
    'Aspettativa di vita: 10-12 anni'],

    dailyNeeds: {
      food: '300-400g di cibo secco di qualità al giorno (diviso in 2 pasti)',
      exercise: '2 ore di attività fisica quotidiana',
      mental: 'Giochi di riporto e stimolazione mentale',
      grooming: 'Spazzolatura 2-3 volte a settimana'
    },
    predispositions: [
    'Displasia dell\'anca e del gomito',
    'Problemi oculari (cataratta, atrofia progressiva della retina)',
    'Tendenza al sovrappeso',
    'Allergie alimentari e cutanee',
    'Problemi cardiaci (cardiomiopatia dilatativa)']
  },
  'Golden Retriever': {
    history: `Il Golden Retriever è una razza di origine scozzese, sviluppata nella tenuta di Lord Tweedmouth nelle Highlands scozzesi a metà del 1800. Fu creato incrociando un Retriever giallo con il Tweed Water Spaniel (ormai estinto), e successivamente con Setter irlandesi e Bloodhound. L'obiettivo era creare un cane da riporto ideale per la caccia agli uccelli acquatici nelle brughiere scozzesi. La razza fu riconosciuta ufficialmente nel 1911. Il Golden Retriever è rinomato per il suo carattere equilibrato e la sua versatilità, eccellendo come cane da compagnia, da assistenza per non vedenti, da terapia e nelle operazioni di ricerca e soccorso.`,
    characteristics: [
    'Cane di taglia grande (25-34 kg)',
    'Pelo lungo e dorato che richiede cure regolari',
    'Estremamente gentile e paziente',
    'Eccellente cane da famiglia',
    'Energico ma equilibrato',
    'Aspettativa di vita: 10-12 anni'],

    dailyNeeds: {
      food: '320-420g di cibo secco al giorno (2 pasti)',
      exercise: '1,5-2 ore di attività fisica quotidiana',
      mental: 'Training di obbedienza e giochi intellettuali',
      grooming: 'Spazzolatura quotidiana, bagno mensile'
    },
    predispositions: [
    'Displasia dell\'anca',
    'Problemi cardiaci (stenosi subaortica)',
    'Tumori (emangiosarcoma, linfoma)',
    'Allergie cutanee',
    'Epilessia idiopatica']
  },
  'Pastore Tedesco': {
    history: `Il Pastore Tedesco è una razza relativamente giovane, creata in Germania alla fine del 1800 dal capitano Max von Stephanitz. L'obiettivo era sviluppare il cane da pastore perfetto: intelligente, forte, versatile e facile da addestrare. La prima esposizione della razza avvenne nel 1899. Durante le guerre mondiali, il Pastore Tedesco si distinse per le sue capacità, servendo come messaggero, sentinella e cane da soccorso. Dopo la Seconda Guerra Mondiale, la razza guadagnò popolarità mondiale. Oggi è una delle razze più utilizzate nelle forze dell'ordine, nell'esercito e come cane da assistenza, oltre ad essere un eccellente cane da famiglia.`,
    characteristics: [
    'Cane di taglia grande (22-40 kg)',
    'Molto intelligente e versatile',
    'Leale e protettivo verso la famiglia',
    'Forte istinto di guardia',
    'Richiede socializzazione precoce',
    'Aspettativa di vita: 9-13 anni'],

    dailyNeeds: {
      food: '350-500g di cibo secco al giorno (2-3 pasti)',
      exercise: '2-3 ore di attività fisica intensa',
      mental: 'Training avanzato e compiti da svolgere',
      grooming: 'Spazzolatura quotidiana durante la muta'
    },
    predispositions: [
    'Displasia dell\'anca e del gomito',
    'Mielopatia degenerativa',
    'Torsione gastrica',
    'Allergie alimentari',
    'Insufficienza pancreatica esocrina']
  },
  'Bulldog Francese': {
    history: `Il Bulldog Francese ha origini inglesi, discendendo dai Bulldog miniaturizzati popolari tra i lavoratori tessili di Nottingham nel 1800. Quando questi lavoratori emigrarono in Francia durante la Rivoluzione Industriale, portarono con sé i loro cani. In Francia, la razza fu incrociata con cani locali, probabilmente Terrier e Carlini, sviluppando le caratteristiche orecchie "a pipistrello" che la distinguono. La razza divenne molto popolare tra la società parigina alla fine del 1800. Riconosciuto ufficialmente all'inizio del 1900, il Bouledogue Français (nome francese) è oggi una delle razze più amate nelle città di tutto il mondo per il suo carattere affettuoso e la taglia compatta.`,
    characteristics: [
    'Cane di piccola taglia (8-14 kg)',
    'Aspetto distintivo con muso schiacciato',
    'Temperamento affettuoso e giocoso',
    'Adatto alla vita in appartamento',
    'Non richiede molto esercizio',
    'Aspettativa di vita: 10-12 anni'],

    dailyNeeds: {
      food: '150-250g di cibo secco al giorno (2 pasti)',
      exercise: '30-60 minuti di attività moderata',
      mental: 'Giochi leggeri e socializzazione',
      grooming: 'Pulizia delle pieghe del muso quotidiana'
    },
    predispositions: [
    'Sindrome brachicefalica (problemi respiratori)',
    'Problemi alla colonna vertebrale',
    'Allergie cutanee e alimentari',
    'Problemi oculari',
    'Displasia dell\'anca']
  },
  'Beagle': {
    history: `Il Beagle ha origini antiche, con antenati che risalgono all'epoca romana e greca. La razza moderna si sviluppò in Inghilterra nel 1500, dove veniva utilizzata per la caccia alla lepre e al coniglio. Il nome "Beagle" potrebbe derivare dal francese "beugler" (urlare) o dal celtico "beag" (piccolo). Nel 1800, il Reverendo Phillip Honeywood stabilì un allevamento che divenne la base per la razza moderna. I Beagle furono esportati negli Stati Uniti dove guadagnarono enorme popolarità. La razza è apprezzata per il suo ottimo olfatto, tanto da essere impiegata in aeroporti e dogane per la rilevazione di sostanze. È anche uno dei cani da compagnia più amati per il carattere allegro e socievole.`,
    characteristics: [
    'Cane di taglia media (13-18 kg)',
    'Ottimo olfatto e istinto da caccia',
    'Temperamento allegro e socievole',
    'Buono con i bambini',
    'Tendenza a seguire gli odori',
    'Aspettativa di vita: 12-15 anni'],

    dailyNeeds: {
      food: '200-300g di cibo secco al giorno (2 pasti)',
      exercise: '1-2 ore di attività quotidiana',
      mental: 'Giochi di ricerca e seguire tracce',
      grooming: 'Spazzolatura settimanale'
    },
    predispositions: [
    'Epilessia',
    'Problemi agli occhi (glaucoma)',
    'Tendenza al sovrappeso',
    'Ipotiroidismo',
    'Infezioni alle orecchie']
  },
  'Chihuahua': {
    history: `Il Chihuahua prende il nome dallo stato messicano omonimo ed è considerato una delle razze più antiche delle Americhe. Si ritiene discenda dal Techichi, un cane da compagnia allevato dalle civiltà Tolteca e Azteca già nel IX secolo. Questi piccoli cani erano considerati sacri e si credeva guidassero le anime nell'aldilà. Dopo la conquista spagnola, la razza quasi scomparve, ma fu "riscoperta" nello stato di Chihuahua nella metà del 1800. I turisti americani iniziarono a portare questi cani negli Stati Uniti, dove la razza fu sviluppata e standardizzata. Riconosciuto ufficialmente nel 1904, il Chihuahua è oggi uno dei cani da compagnia più popolari al mondo, apprezzato per le dimensioni ridotte e la personalità vivace.`,
    characteristics: [
    'Cane di piccolissima taglia (1,5-3 kg)',
    'Personalità forte in corpo piccolo',
    'Molto legato al proprietario',
    'Coraggioso e vigile',
    'Sensibile al freddo',
    'Aspettativa di vita: 14-16 anni'],

    dailyNeeds: {
      food: '40-80g di cibo secco al giorno (2-3 piccoli pasti)',
      exercise: '30 minuti di attività leggera',
      mental: 'Giochi indoor e socializzazione controllata',
      grooming: 'Spazzolatura regolare (dipende dal tipo di pelo)'
    },
    predispositions: [
    'Lussazione della rotula',
    'Problemi cardiaci (soffio al cuore)',
    'Ipoglicemia',
    'Problemi dentali',
    'Fontanella aperta (mollera)']
  },
  'Border Collie': {
    history: `Il Border Collie è originario della regione di confine (border) tra Scozia e Inghilterra, da cui prende il nome. La razza si sviluppò nel corso di secoli come cane da pastore, con la selezione focalizzata esclusivamente sulle capacità lavorative piuttosto che sull'aspetto. Il "padre" della razza moderna è considerato Old Hemp, nato nel 1893, famoso per il suo stile di lavoro silenzioso e intenso. Il Border Collie fu riconosciuto ufficialmente solo nel 1995, poiché gli allevatori volevano preservare le caratteristiche lavorative della razza. È considerato il cane più intelligente al mondo secondo gli studi di Stanley Coren. Eccelle nelle competizioni di agility, obedience e naturalmente nel lavoro con il bestiame. Richiede proprietari esperti in grado di soddisfare il suo bisogno di attività mentale e fisica.`,
    characteristics: [
    'Cane di taglia media (14-20 kg)',
    'Estremamente intelligente e attivo',
    'Forte istinto di pastore',
    'Richiede molto esercizio mentale',
    'Pelo medio-lungo',
    'Aspettativa di vita: 12-15 anni'],

    dailyNeeds: {
      food: '250-350g di cibo secco al giorno (2 pasti)',
      exercise: '2-3 ore di attività intensa quotidiana',
      mental: 'Training complesso e sfide intellettuali',
      grooming: 'Spazzolatura quotidiana'
    },
    predispositions: [
    'Displasia dell\'anca',
    'Anomalia dell\'occhio del Collie (CEA)',
    'Epilessia',
    'Osteocondrite dissecante',
    'Sensibilità ai farmaci (gene MDR1)']
  },
  'Persiano': {
    history: `Il gatto Persiano è una delle razze più antiche e iconiche. Le sue origini sono avvolte nel mistero, ma si ritiene provenga dalla Persia (l'attuale Iran) e dalla Turchia. I primi esemplari furono portati in Europa nel 1600 da viaggiatori italiani. La razza divenne molto popolare nell'Inghilterra vittoriana, dove fu selezionata per accentuare il pelo lungo e setoso e il muso piatto. La Regina Vittoria stessa possedeva diversi Persiani blu. Nel 1871, i Persiani furono tra i protagonisti della prima esposizione felina al Crystal Palace di Londra. Nel corso del XX secolo, l'allevamento selettivo ha ulteriormente modificato l'aspetto della razza, creando il profilo ultra-tipizzato che conosciamo oggi. Il Persiano è celebre per il suo aspetto regale e il carattere tranquillo, rendendolo uno dei gatti da compagnia più amati al mondo.`,
    characteristics: [
    'Gatto di taglia media (3,5-5,5 kg)',
    'Pelo lungo e serico che richiede cure quotidiane',
    'Temperamento calmo e tranquillo',
    'Preferisce ambienti domestici tranquilli',
    'Occhi grandi e espressivi',
    'Aspettativa di vita: 10-17 anni'],

    dailyNeeds: {
      food: '60-80g di cibo umido + 30-40g di secco al giorno',
      exercise: 'Gioco moderato, 15-30 minuti al giorno',
      mental: 'Giochi interattivi delicati',
      grooming: 'Spazzolatura quotidiana obbligatoria'
    },
    predispositions: [
    'Malattia del rene policistico (PKD)',
    'Problemi respiratori (sindrome brachicefalica)',
    'Problemi oculari (entropion, cheratite)',
    'Cardiomiopatia ipertrofica',
    'Calcoli urinari']
  },
  'Maine Coon': {
    history: `Il Maine Coon è una razza naturale originaria dello stato del Maine, negli Stati Uniti. Esistono molte leggende sulle sue origini: una narra che discenda da gatti di Maria Antonietta inviati in America, un'altra che sia il risultato dell'incrocio tra gatti domestici e procioni (raccoon in inglese, da cui "Coon"). In realtà, probabilmente discende da gatti a pelo lungo portati in America dai Vichinghi o da marinai europei, che si adattarono al clima rigido del New England sviluppando taglia grande e pelo folto. Il Maine Coon "Cosey" vinse la prima esposizione felina americana nel 1895. La razza rischiò l'estinzione con l'arrivo del Persiano, ma fu salvata negli anni '50. È stato dichiarato gatto ufficiale dello stato del Maine nel 1985. Oggi è una delle razze più popolari per le dimensioni imponenti e il carattere dolce.`,
    characteristics: [
    'Gatto di taglia grande (4-8 kg)',
    'Pelo semi-lungo resistente all\'acqua',
    'Carattere gentile e socievole',
    'Molto comunicativo con miagolii particolari',
    'Crescita lenta (maturità a 3-5 anni)',
    'Aspettativa di vita: 12-15 anni'],

    dailyNeeds: {
      food: '80-120g di cibo umido + 40-60g di secco al giorno',
      exercise: 'Gioco attivo quotidiano, alberi per gatti',
      mental: 'Giochi di caccia e puzzle alimentari',
      grooming: 'Spazzolatura 2-3 volte a settimana'
    },
    predispositions: [
    'Cardiomiopatia ipertrofica',
    'Displasia dell\'anca',
    'Atrofia muscolare spinale',
    'Malattia del rene policistico',
    'Problemi dentali']
  },
  'British Shorthair': {
    history: `Il British Shorthair è considerato la razza felina più antica della Gran Bretagna, con origini che risalgono ai gatti portati dai Romani durante l'invasione della Britannia nel I secolo d.C. Questi gatti si adattarono al clima britannico sviluppando un pelo denso e un fisico robusto. Nel 1800, Harrison Weir, considerato il "padre della cinofilia felina", iniziò a standardizzare la razza selezionando i migliori esemplari di gatti comuni britannici. Il British Shorthair fu una delle razze protagoniste della prima esposizione felina al Crystal Palace nel 1871. Dopo le guerre mondiali, la razza rischiò l'estinzione e fu salvata incrociandola con Persiani, da cui ereditò il corpo massiccio. Il British Shorthair blu (British Blue) è la varietà più iconica, ma la razza esiste in molti colori. È apprezzato per il temperamento tranquillo e indipendente.`,
    characteristics: [
    'Gatto di taglia media-grande (4-8 kg)',
    'Pelo denso e morbido',
    'Temperamento calmo e indipendente',
    'Fisico robusto e muscoloso',
    'Colori vari, famoso il blu',
    'Aspettativa di vita: 14-20 anni'],

    dailyNeeds: {
      food: '70-100g di cibo umido + 35-50g di secco al giorno',
      exercise: 'Gioco moderato, tende alla sedentarietà',
      mental: 'Stimolazione mentale regolare',
      grooming: 'Spazzolatura settimanale'
    },
    predispositions: [
    'Cardiomiopatia ipertrofica',
    'Tendenza al sovrappeso',
    'Malattia del rene policistico',
    'Problemi dentali',
    'Emofilia B (nei maschi)']
  },
  'Siamese': {
    history: `Il Siamese è una delle razze feline più antiche e riconoscibili, originaria del regno del Siam (l'attuale Thailandia). Antichi manoscritti thailandesi del XIV secolo raffigurano gatti dal corpo chiaro con estremità scure, identificabili come antenati dei Siamesi moderni. Questi gatti erano considerati sacri e vivevano nei templi e nei palazzi reali, riservati esclusivamente alla famiglia reale e ai monaci. Il primo Siamese arrivò in Occidente nel 1884, quando il re del Siam regalò alcuni esemplari al console generale britannico. La razza fece il suo debutto al Crystal Palace di Londra nel 1885, suscitando grande interesse per l'aspetto esotico. Nel corso del XX secolo, l'allevamento selettivo ha modificato la razza, creando due tipi: il Siamese moderno (corpo snello e testa triangolare) e il Siamese tradizionale (più robusto). È celebre per la sua vocalità e il forte legame con i proprietari.`,
    characteristics: [
    'Gatto di taglia media (2,5-4,5 kg)',
    'Corpo snello e atletico',
    'Molto vocale e comunicativo',
    'Estremamente socievole e affettuoso',
    'Colori point caratteristici',
    'Aspettativa di vita: 15-20 anni'],

    dailyNeeds: {
      food: '50-70g di cibo umido + 25-35g di secco al giorno',
      exercise: 'Gioco attivo quotidiano, ama arrampicarsi',
      mental: 'Interazione sociale costante e giochi intellettuali',
      grooming: 'Spazzolatura settimanale'
    },
    predispositions: [
    'Asma felina',
    'Problemi dentali',
    'Cardiomiopatia ipertrofica',
    'Amiloidosi',
    'Problemi gastrointestinali']
  },
  'Ragdoll': {
    history: `Il Ragdoll è una razza relativamente moderna, creata negli anni '60 in California dall'allevatrice Ann Baker. La razza nacque da Josephine, una gatta bianca a pelo lungo di tipo Angora, che dopo un incidente automobilistico iniziò a produrre gattini particolarmente docili e rilassati. Ann Baker incrociò Josephine con diversi gatti, inclusi Birmani e Burmesi, selezionando per il temperamento calmo e la tendenza a rilassarsi completamente quando presi in braccio (da cui "Ragdoll", bambola di pezza). La razza fu riconosciuta ufficialmente nel 1965. Ann Baker creò anche una propria associazione, l'International Ragdoll Cat Association (IRCA), con regole molto rigide. Il Ragdoll è oggi una delle razze più popolari per il carattere affettuoso e docile, ideale per famiglie e vita in appartamento.`,
    characteristics: [
    'Gatto di taglia grande (4,5-9 kg)',
    'Temperamento molto docile e rilassato',
    'Pelo semi-lungo e setoso',
    'Colori point con occhi blu',
    'Tendenza a "sciogliersi" quando sollevato',
    'Aspettativa di vita: 12-17 anni'],

    dailyNeeds: {
      food: '80-120g di cibo umido + 40-60g di secco al giorno',
      exercise: 'Gioco tranquillo e moderato',
      mental: 'Giochi delicati e interazione sociale',
      grooming: 'Spazzolatura 2-3 volte a settimana'
    },
    predispositions: [
    'Cardiomiopatia ipertrofica',
    'Malattia del rene policistico',
    'Calcoli urinari',
    'Tendenza al sovrappeso',
    'Problemi dentali']
  },
  'Bengala': {
    history: `Il Bengala è una razza ibrida creata negli anni '60 negli Stati Uniti dalla genetista Jean Mill. L'obiettivo era creare un gatto domestico con l'aspetto di un leopardo. Jean Mill incrociò un gatto leopardo asiatico (Prionailurus bengalensis, da cui il nome "Bengala") con gatti domestici. Il primo incrocio produsse gattini fertili solo dopo diverse generazioni. La razza fu sviluppata ulteriormente incrociando i discendenti con Egyptian Mau, Abissini e altre razze domestiche. Il Bengala fu riconosciuto ufficialmente dalla TICA nel 1983 e dalla CFA nel 2016. Solo i gatti dalla quarta generazione (F4) in poi sono considerati veri Bengala domestici. La razza è celebre per il mantello maculato o marmorizzato che ricorda un felino selvatico, ma con il temperamento affettuoso di un gatto domestico. Molti Bengala amano l'acqua, caratteristica ereditata dall'antenato selvatico.`,
    characteristics: [
    'Gatto di taglia media-grande (3,5-7 kg)',
    'Mantello leopardato distintivo',
    'Molto attivo e atletico',
    'Intelligente e curioso',
    'Ama l\'acqua',
    'Aspettativa di vita: 12-16 anni'],

    dailyNeeds: {
      food: '70-100g di cibo umido + 35-50g di secco al giorno',
      exercise: '1-2 ore di gioco attivo quotidiano',
      mental: 'Giochi complessi e sfide intellettuali',
      grooming: 'Spazzolatura settimanale'
    },
    predispositions: [
    'Cardiomiopatia ipertrofica',
    'Atrofia progressiva della retina',
    'Sindrome del gattino piatto',
    'Problemi gastrointestinali',
    'Displasia dell\'anca']
  },
  'Sphynx': {
    history: `Lo Sphynx, noto come il "gatto nudo", è una razza relativamente recente originaria del Canada. Nel 1966, a Toronto, una gatta domestica diede alla luce un gattino glabro per una mutazione genetica naturale. Questo gattino, chiamato Prune, divenne il capostipite della razza. Allevatori iniziarono un programma di selezione incrociando Prune e i suoi discendenti con gatti Devon Rex per ampliare il pool genetico. Negli anni '70, altri gattini glabri nacquero in Minnesota e furono incorporati nel programma di allevamento. La razza fu riconosciuta ufficialmente nel 1979. Contrariamente all'apparenza, lo Sphynx non è completamente privo di pelo ma ricoperto da una sottile peluria. La mancanza di pelo è dovuta a una mutazione recessiva. Gli Sphynx sono gatti molto affettuosi che cercano costantemente il calore umano, sia per affetto che per termoregolazione. Richiedono bagni regolari per rimuovere gli oli cutanei che normalmente sarebbero assorbiti dal pelo.`,
    characteristics: [
    'Gatto di taglia media (3,5-5 kg)',
    'Privo di pelo o con peluria leggera',
    'Pelle calda al tatto',
    'Molto socievole e affettuoso',
    'Richiede protezione dal sole e dal freddo',
    'Aspettativa di vita: 13-15 anni'],

    dailyNeeds: {
      food: '60-80g di cibo umido + 30-40g di secco al giorno',
      exercise: 'Gioco attivo, ama arrampicarsi',
      mental: 'Interazione sociale costante',
      grooming: 'Bagni regolari per rimuovere oli cutanei'
    },
    predispositions: [
    'Problemi cutanei (acne, irritazioni)',
    'Cardiomiopatia ipertrofica',
    'Problemi dentali',
    'Sensibilità a temperature estreme',
    'Miopatia ereditaria']
  }
};

export const BreedInfoSection = () => {
  const [selectedType, setSelectedType] = useState('dogs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);

  // Filter breed suggestions based on search term
  const suggestions = useMemo(() => {
    const breeds = ALL_BREEDS[selectedType];
    if (!searchTerm || searchTerm.length < 2) return [];

    return breeds.
    filter((breed) => breed.toLowerCase().includes(searchTerm.toLowerCase())).
    slice(0, 8); // Limit to 8 suggestions
  }, [selectedType, searchTerm]);

  const handleTypeChange = useCallback((type) => {
    setSelectedType(type);
    setSelectedBreed('');
    setSearchTerm('');
    setShowSuggestions(false);
  }, []);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length >= 2);
    if (!value) {
      setSelectedBreed('');
    }
  }, []);

  const handleBreedSelect = useCallback((breed) => {
    setSelectedBreed(breed);
    setSearchTerm(breed);
    setShowSuggestions(false);
    setShowBreedModal(true); // Open modal when breed is selected
  }, []);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSelectedBreed(searchTerm.trim());
      setShowSuggestions(false);
      setShowBreedModal(true); // Open modal on search
    }
  }, [searchTerm]);

  const handleInputFocus = useCallback(() => {
    if (searchTerm.length >= 2) {
      setShowSuggestions(true);
    }
  }, [searchTerm]);

  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow selection
    setTimeout(() => setShowSuggestions(false), 200);
  }, []);

  const breedInfo = BREED_INFO[selectedBreed];

  return (
    <div className="w-full bg-white">
      {/* Unified Section with Header, Toggle, and Search */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              E te quanto ne sai della razza del tuo peloso?
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Cerca qualsiasi razza di cane o gatto per ricevere consigli personalizzati su alimentazione, 
              cure specifiche e benessere del tuo amico a quattro zampe.
            </p>
          </div>

          {/* Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-1 rounded-lg inline-flex shadow-sm">
              <button
                onClick={() => handleTypeChange('dogs')}
                className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                selectedType === 'dogs' ?
                'bg-blue-500 text-white shadow-md' :
                'text-gray-600 hover:text-gray-800'}`
                }>

                <Dog className="w-4 h-4 mr-2" />
                Cane
              </button>
              <button
                onClick={() => handleTypeChange('cats')}
                className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                selectedType === 'cats' ?
                'bg-blue-500 text-white shadow-md' :
                'text-gray-600 hover:text-gray-800'}`
                }>

                <Cat className="w-4 h-4 mr-2" />
                Gatto
              </button>
            </div>
          </div>

          {/* Search Bar with Suggestions */}
          <div className="relative max-w-lg mx-auto mb-6">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={`Cerca o inserisci il nome della razza del tuo ${selectedType === 'dogs' ? 'cane' : 'gatto'}...`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700" />
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 &&
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                {suggestions.map((breed, index) =>
              <button
                key={index}
                onClick={() => handleBreedSelect(breed)}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center justify-between text-sm">
                    <span className="text-gray-700">{breed}</span>
                    <Check className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100" />
                  </button>
              )}
              </div>
            }
          </div>

          {/* Search Tips */}
          <div className="text-center text-xs text-gray-500 max-w-xl mx-auto mb-6">
            <p className="mb-1">
              💡 <span className="font-medium">Suggerimento:</span> Puoi cercare qualsiasi razza, anche quelle non elencate nei suggerimenti.
            </p>
            <p>
              Esempi: "Labrador", "Meticcio", "Incrocio Pastore Tedesco", "Gatto Europeo", "Persiano mix"
            </p>
          </div>

          {/* Empty State - integrated */}
          {!selectedBreed &&
          <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                <Search className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Cerca la Razza del Tuo {selectedType === 'dogs' ? 'Cane' : 'Gatto'}
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Inserisci il nome della razza nella barra di ricerca per ricevere consigli personalizzati 
                su alimentazione, salute e cura del tuo amico a quattro zampe.
              </p>
            </div>
          }
        </div>
      </div>

      {/* Breed Detail Modal */}
      {showBreedModal && selectedBreed && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  {selectedType === 'dogs' ? (
                    <Dog className="w-8 h-8 text-white" />
                  ) : (
                    <Cat className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedBreed}</h2>
                  <p className="text-blue-100 text-sm font-medium">
                    {selectedType === 'dogs' ? 'Cane' : 'Gatto'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBreedModal(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {breedInfo ? (
                <>
                  {/* History Section */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                    <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3" />
                      Storia della Razza
                    </h3>
                    <p className="text-amber-800 leading-relaxed text-base">
                      {breedInfo.history}
                    </p>
                  </div>

                  {/* Characteristics */}
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                      <Info className="w-6 h-6 mr-2" />
                      Principali Caratteristiche
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {breedInfo.characteristics.map((char, index) => (
                        <div key={index} className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                          <Check className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800 text-sm font-medium">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Needs */}
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                      <Clock className="w-6 h-6 mr-2" />
                      Fabbisogno Giornaliero
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center text-sm">
                          <Utensils className="w-4 h-4 mr-2" />
                          Alimentazione
                        </h4>
                        <p className="text-green-700 text-sm">{breedInfo.dailyNeeds.food}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center text-sm">
                          <Activity className="w-4 h-4 mr-2" />
                          Esercizio Fisico
                        </h4>
                        <p className="text-green-700 text-sm">{breedInfo.dailyNeeds.exercise}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center text-sm">
                          <Info className="w-4 h-4 mr-2" />
                          Stimolazione Mentale
                        </h4>
                        <p className="text-green-700 text-sm">{breedInfo.dailyNeeds.mental}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center text-sm">
                          <Heart className="w-4 h-4 mr-2" />
                          Toelettatura
                        </h4>
                        <p className="text-green-700 text-sm">{breedInfo.dailyNeeds.grooming}</p>
                      </div>
                    </div>
                  </div>

                  {/* Health Predispositions */}
                  <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                      <Stethoscope className="w-6 h-6 mr-2" />
                      Predisposizioni Fisiche
                    </h3>
                    <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-orange-400">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-orange-800 font-semibold mb-1">
                            Informazioni importanti per la prevenzione
                          </p>
                          <p className="text-xs text-orange-700">
                            Queste sono predisposizioni comuni della razza. Non significa che il tuo animale 
                            svilupperà necessariamente questi problemi, ma è importante conoscerle per la prevenzione.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {breedInfo.predispositions.map((predisposition, index) => (
                        <div key={index} className="flex items-start bg-white rounded-lg p-3 border-l-4 border-orange-400 shadow-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-orange-800 text-sm font-medium">{predisposition}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Veterinary Recommendation */}
                  <div className="bg-gray-100 rounded-xl p-6 text-center border-2 border-gray-300">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Raccomandazione Veterinaria
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Consulta sempre il tuo veterinario per controlli regolari e consigli specifici 
                      per il tuo {selectedType === 'dogs' ? 'cane' : 'gatto'}. Le informazioni sopra sono 
                      indicative e basate sulle caratteristiche generali della razza.
                    </p>
                  </div>
                </>
              ) : (
                // Generic info for breeds not in database
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Informazioni per {selectedBreed}
                  </h3>
                  <div className="bg-blue-50 rounded-xl p-6 text-left max-w-2xl mx-auto">
                    <p className="text-blue-800 mb-4 font-medium">
                      Le informazioni dettagliate per <strong>{selectedBreed}</strong> non sono ancora 
                      disponibili nel nostro database, ma possiamo comunque aiutarti!
                    </p>
                    <div className="space-y-3">
                      <p className="text-blue-700 text-sm flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Consulenza personalizzata:</strong> I nostri esperti possono fornirti 
                        consigli specifici per questa razza</span>
                      </p>
                      <p className="text-blue-700 text-sm flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Ricerca mirata:</strong> Analizzeremo le caratteristiche e le esigenze 
                        specifiche della razza</span>
                      </p>
                      <p className="text-blue-700 text-sm flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Piano alimentare:</strong> Creeremo un piano nutrizionale su misura 
                        per il tuo {selectedType === 'dogs' ? 'cane' : 'gatto'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg">
                      Richiedi Consulenza Personalizzata
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};