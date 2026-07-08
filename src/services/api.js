// API endpoints and logic

// -----------------------------------------------------------------------------
// CURATED HISTORICAL DATABASES (Movies, Memes, YouTube)
// -----------------------------------------------------------------------------

const HISTORICAL_MOVIES = {
  1970: [
    { title: "The Godfather (1972)", rating: "9.2", overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" },
    { title: "Star Wars (1977)", rating: "8.6", overview: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire.", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500" },
    { title: "Jaws (1975)", rating: "8.1", overview: "When a giant great white shark begins to menace the island community of Amity, a police chief, a marine scientist and a grizzled fisherman set out to stop it.", poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500" },
    { title: "Taxi Driver (1976)", rating: "8.2", overview: "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence feeds his urge for violent action.", poster: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500" }
  ],
  1980: [
    { title: "Back to the Future (1985)", rating: "8.5", overview: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean.", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500" },
    { title: "The Shining (1980)", rating: "8.4", overview: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.", poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500" },
    { title: "Blade Runner (1982)", rating: "8.1", overview: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.", poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500" },
    { title: "E.T. the Extra-Terrestrial (1982)", rating: "7.9", overview: "A troubled child summons the courage to help a friendly alien escape Earth and return to his home-world.", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500" }
  ],
  1990: [
    { title: "Jurassic Park (1993)", rating: "8.2", overview: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure.", poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500" },
    { title: "The Matrix (1999)", rating: "8.7", overview: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth.", poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500" },
    { title: "Titanic (1997)", rating: "7.9", overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", poster: "https://images.unsplash.com/photo-1500077398580-7140026a1d8f?w=500" },
    { title: "Pulp Fiction (1994)", rating: "8.9", overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500" }
  ],
  2000: [
    { title: "Gladiator (2000)", rating: "8.5", overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500" },
    { title: "The Dark Knight (2008)", rating: "9.0", overview: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500" },
    { title: "Avatar (2009)", rating: "7.9", overview: "A paraplegic Marine dispatched to the moon Pandora becomes torn between following his orders and protecting the world.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" },
    { title: "LOTR: Fellowship of the Ring (2001)", rating: "8.9", overview: "A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth.", poster: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500" }
  ],
  2010: [
    { title: "Inception (2010)", rating: "8.8", overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500" },
    { title: "Interstellar (2014)", rating: "8.7", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500" },
    { title: "The Avengers (2012)", rating: "8.0", overview: "Earth's mightiest heroes must come together and learn to fight as a team to stop the mischievous Loki and his alien army.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" },
    { title: "The Social Network (2010)", rating: "7.8", overview: "As Harvard student Mark Zuckerberg creates the social networking site that would become Facebook, he is sued by the co-founders.", poster: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500" }
  ],
  2015: [
    { title: "Mad Max: Fury Road (2015)", rating: "8.1", overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500" },
    { title: "The Martian (2015)", rating: "8.0", overview: "An astronaut becomes stranded on Mars after his crew assumes him dead, and must rely on his ingenuity to find a way to signal Earth.", poster: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500" },
    { title: "Inside Out (2015)", rating: "8.1", overview: "After a young girl is uprooted from her Midwest life, her core emotions conflict on how best to navigate a new city.", poster: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500" },
    { title: "Star Wars: The Force Awakens (2015)", rating: "7.8", overview: "As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, a runaway stormtrooper, must search for the missing Luke Skywalker.", poster: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=500" }
  ],
  2016: [
    { title: "Deadpool (2016)", rating: "8.0", overview: "A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers.", poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500" },
    { title: "La La Land (2016)", rating: "8.0", overview: "While navigating their careers in Los Angeles, a jazz pianist and an aspiring actress fall in love while attempting to reconcile their aspirations.", poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500" },
    { title: "Captain America: Civil War (2016)", rating: "7.8", overview: "Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" },
    { title: "Zootopia (2016)", rating: "8.0", overview: "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" }
  ],
  2017: [
    { title: "Blade Runner 2049 (2017)", rating: "8.0", overview: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.", poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500" },
    { title: "Dunkirk (2017)", rating: "7.8", overview: "Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated.", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500" },
    { title: "Logan (2017)", rating: "8.1", overview: "In a future where mutants are nearly extinct, a weary Logan cares for an ailing Professor X in a hideout on the Mexican border.", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500" },
    { title: "Get Out (2017)", rating: "7.8", overview: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness reaches a boiling point.", poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500" }
  ],
  2018: [
    { title: "Into the Spider-Verse (2018)", rating: "8.4", overview: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions.", poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500" },
    { title: "Avengers: Infinity War (2018)", rating: "8.4", overview: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before he destroys the universe.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" },
    { title: "Black Panther (2018)", rating: "7.3", overview: "T'Challa, heir to the hidden kingdom of Wakanda, must step forward to lead his people into a new era and confront a challenger.", poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500" },
    { title: "Bohemian Rhapsody (2018)", rating: "7.9", overview: "The story of the legendary British rock band Queen and their lead singer Freddie Mercury, leading up to their famous Live Aid performance.", poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500" }
  ],
  2019: [
    { title: "Parasite (2019)", rating: "8.5", overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500" },
    { title: "Joker (2019)", rating: "8.4", overview: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City.", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500" },
    { title: "Avengers: Endgame (2019)", rating: "8.4", overview: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" },
    { title: "1917 (2019)", rating: "8.2", overview: "April 6, 1917. As a regiment assembles to assert an attack deep in enemy territory, two soldiers are assigned to deliver a warning message.", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500" }
  ],
  2020: [
    { title: "Tenet (2020)", rating: "7.3", overview: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" },
    { title: "Soul (2020)", rating: "8.0", overview: "After a gig performing jazz music goes wrong, a middle school music teacher finds his soul projected into the Great Before.", poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500" },
    { title: "Another Round (2020)", rating: "7.7", overview: "Four high school teachers consume alcohol on a daily basis to see how it affects their social and professional lives.", poster: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500" },
    { title: "The Trial of Chicago 7 (2020)", rating: "7.7", overview: "The story of 7 people on trial arising from various charges surrounding the uprising at the 1968 Democratic National Convention.", poster: "https://images.unsplash.com/photo-150566419477-8bebcb95c557?w=500" }
  ],
  2021: [
    { title: "Dune (2021)", rating: "8.0", overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny, must travel to the most dangerous planet in the universe.", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" },
    { title: "Spider-Man: No Way Home (2021)", rating: "8.2", overview: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds appear.", poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500" },
    { title: "No Time to Die (2021)", rating: "7.3", overview: "James Bond has left active service. His peace is short-lived when Felix Leiter from the CIA turns up asking for help.", poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500" },
    { title: "The Power of the Dog (2021)", rating: "6.8", overview: "A domineering but charismatic rancher responds with mocking cruelty when his brother brings home a new wife and her son.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" }
  ],
  2022: [
    { title: "EEAAO (2022)", rating: "8.0", overview: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring alternate universes.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" },
    { title: "Top Gun: Maverick (2022)", rating: "8.3", overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a detachment of graduates for a special mission.", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500" },
    { title: "The Batman (2022)", rating: "7.8", overview: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500" },
    { title: "Avatar: Way of Water (2022)", rating: "7.6", overview: "Jake Sully lives with his newfound family on Pandora. Once a familiar threat returns to finish what was started, Jake must work with the Na'vi.", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500" }
  ],
  2023: [
    { title: "Oppenheimer (2023)", rating: "8.4", overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500" },
    { title: "Barbie (2023)", rating: "7.2", overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.", poster: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=500" },
    { title: "Across the Spider-Verse (2023)", rating: "8.6", overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.", poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500" },
    { title: "Killers of the Flower Moon (2023)", rating: "7.6", overview: "Members of the Osage tribe in northeastern Oklahoma are murdered under mysterious circumstances in the 1920s, sparking a major F.B.I. investigation.", poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500" }
  ],
  2024: [
    { title: "Dune: Part Two (2024)", rating: "8.6", overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" },
    { title: "Inside Out 2 (2024)", rating: "7.7", overview: "Joy, Sadness, Anger, Fear and Disgust, who've been running a successful operation, don't know how to feel when Anxiety shows up.", poster: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500" },
    { title: "Furiosa (2024)", rating: "7.6", overview: "The origin story of renegade warrior Furiosa before her encounter and alliance with Mad Max.", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500" },
    { title: "Civil War (2024)", rating: "7.1", overview: "A journey across a dystopian future America, following a team of military-embedded journalists as they race to reach DC before rebel factions descend.", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500" }
  ],
  2025: [
    { title: "Superman (2025)", rating: "8.1", overview: "The Man of Steel balances his Kryptonian heritage with his human upbringing, guiding humanity with truth and justice.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" },
    { title: "Avatar: Fire and Ash (2025)", rating: "7.9", overview: "Jake Sully and Neytiri face a new aggressive clan of Na'vi, the Ash People, who challenge the peace on Pandora.", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500" },
    { title: "Minecraft (2025)", rating: "6.9", overview: "A live-action adaptation of the sandbox game featuring Jack Black as Steve on an adventure in the Overworld.", poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500" },
    { title: "Captain America: Brave New World (2025)", rating: "7.2", overview: "Sam Wilson takes up the shield as Captain America in a global conspiracy involving a newly elected US President.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" }
  ],
  2026: [
    { title: "Avengers: Doomsday (2026)", rating: "8.8", overview: "Doctor Doom emerges from the multiverse as a major threat, forcing the Avengers to assemble once again.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" },
    { title: "The Mandalorian & Grogu (2026)", rating: "8.0", overview: "Din Djarin and his apprentice Grogu embark on a new cinematic Star Wars adventure across the outer rim.", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" },
    { title: "Toy Story 5 (2026)", rating: "7.9", overview: "Woody, Buzz and the gang return to deal with a new threat: kids being obsessed with electronic screens.", poster: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500" },
    { title: "Shrek 5 (2026)", rating: "8.2", overview: "Shrek, Fiona, Donkey and Puss in Boots return for a brand new adventure in the Kingdom of Far Far Away.", poster: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=500" }
  ]
};

const HISTORICAL_MEMES = {
  1998: [
    { title: "Dancing Baby (1998)", desc: "Один із перших вірусних 3D-роликів в історії інтернету — кумедне немовля, що танцює ча-ча-ча." },
    { title: "Hampster Dance (1998)", desc: "Веб-сторінка з нескінченними рядами миготливих хом'яків, які танцюють під прискорений трек." },
    { title: "First Flash Animations (1998)", desc: "Поява перших коротких флеш-мультфільмів на сайтах Newgrounds та розсилки електронною поштою." }
  ],
  2000: [
    { title: "All Your Base Are Belong To Us (2000)", desc: "Культовий геймерський мем на основі невдалого англійського перекладу з японської гри Zero Wing." },
    { title: "Peanut Butter Jelly Time (2000)", desc: "Ретро-флеш анімація банана, що танцює під однойменну пісню." },
    { title: "Dancing Baby Remixed (2000)", desc: "Масове поширення різноманітних варіацій легендарного малюка в ранніх месенджерах ICQ." }
  ],
  2001: [
    { title: "Badger Badger Badger (2001)", desc: "Нескінченна флеш-анімація з борсуками, які присідають під монотонний реп, мухоморами та змією." },
    { title: "Mahir Cagri / I Kiss You (2001)", desc: "Особиста сторінка турецького громадянина Махіра Чагрі, яка через наївність та щирість стала світовим суперхітом." },
    { title: "Tourist Guy (2001)", desc: "Фотомонтаж із туристом на даху Всесвітнього торгового центру за мить до зіткнення, що став вірусним у пошті." }
  ],
  2002: [
    { title: "Star Wars Kid (2002)", desc: "Відео канадського підлітка, який незграбно махає ключкою, наче світловим мечем. Одне з перших супервірусних відео." },
    { title: "Homestar Runner (2002)", desc: "Смішний флеш-мультфільм, що завоював серця мільйонів користувачів своїм абсурдним гумором." },
    { title: "Whassup? catchphrase (2002)", desc: "Популярна кричалка з реклами Budweiser, яку пародіювали на всіх інтернет-форумах." }
  ],
  2003: [
    { title: "Numa Numa / Dragostea Din Tei (2003)", desc: "Відео Гері Бролсма, який енергійно підспівує та танцює під пісню молдавського гурту O-Zone перед веб-камерою." },
    { title: "Loituma Girl (2003)", desc: "Флеш-анімація з аніме-персонажем, що крутить цибулю-порей під фінську польку." },
    { title: "Joe Cartoon Flash Series (2003)", desc: "Інтерактивні чорногуморні флеш-розіграші, зокрема відома кнопка 'Хом'як у блендері'." }
  ],
  2004: [
    { title: "O RLY? Snowy Owl (2004)", desc: "Зображення здивованої полярної сови з підписом 'O RLY?' (Oh, really?), що виражало сарказм." },
    { title: "The Lazer Collection (2004)", desc: "Абсурдні flash-відеоролики, намальовані у MS Paint, з диким криком та яскравими спалахами лазерів." },
    { title: "Madagascar Penguins Hype (2004)", desc: "Зародження фандому та перших мемів про божевільних пінгвінів-шпигунів задовго до релізу фільму." }
  ],
  2005: [
    { title: "Chuck Norris Facts (2005)", desc: "Сатиричні факти про надлюдську силу та непереможність легендарного Чака Норріса." },
    { title: "Leeroy Jenkins (2005)", desc: "Гравець World of Warcraft зриває тактичний план гільдії, раптово вбігаючи в кімнату з криком власного імені." },
    { title: "Charlie the Unicorn (2005)", desc: "Анімаційна історія про буркотливого єдинорога Чарлі, якого двоє інших єдинорогів обманом заманюють на Чоко-Гору." }
  ],
  2006: [
    { title: "Snakes on a Plane hype (2006)", desc: "Масштабний мем, згенерований фанатами навколо безглуздої назви фільму 'Змії в літаку' ще до виходу в прокат." },
    { title: "Lonelygirl15 (2006)", desc: "Перше велике реаліті-шоу на YouTube про дівчину-підлітка, яка виявилася професійною актрисою." },
    { title: "Diet Coke & Mentos Geysers (2006)", desc: "Відеоролики з гігантськими фонтанами, створеними шляхом кидання цукерок Mentos у пляшки з газованою водою." }
  ],
  2007: [
    { title: "Rickroll (2007)", desc: "Розіграш, коли користувач переходить за цікавим посиланням, а там відкривається кліп Ріка Естлі 'Never Gonna Give You Up'." },
    { title: "Chocolate Rain (2007)", desc: "Вірусне басове виконання пісні Тея Зондея, де він відхиляється від мікрофона, щоб зробити вдих." },
    { title: "I Can Has Cheezburger? (2007)", desc: "Кумедне фото сірого кота із граматично неправильним написом, що започаткувало культуру лолкотів (lolcats)." }
  ],
  2008: [
    { title: "Keyboard Cat (2008)", desc: "Відео рудого кота Бенто в блакитній сорочці, який грає веселу мелодію на синтезаторі." },
    { title: "Dramatic Chipmunk (2008)", desc: "5-секундний ролик із бабаком, який різко обертається під драматичну музику з кінофільму." },
    { title: "Anonymous / LulzSec Rise (2008)", desc: "Початок масової культури анонімних інтернет-активістів та мемів про маску Гая Фокса." }
  ],
  2009: [
    { title: "David After Dentist (2009)", desc: "Відео малого хлопчика Девіда після візиту до стоматолога: 'Це реальне життя?', 'Чому це відбувається зі мною?'." },
    { title: "Kanye Swift VMA Incident (2009)", desc: "Каньє Вест перебиває промову Тейлор Свіфт на премії MTV, відбираючи мікрофон із криком: 'Йоу, Тейлор, я дам тобі закінчити, але...'." },
    { title: "Balloon Boy Hoax (2009)", desc: "Прямий ефір новин про нібито політ хлопчика у саморобній повітряній кулі, що виявилося шоу батьків заради популярності." },
    { title: "Slender Man Creation (2009)", desc: "Поява вигаданого безликого персонажа на форумі Something Awful, що породило цілий жанр хорор-мемів." }
  ],
  2010: [
    { title: "Double Rainbow (2010)", desc: "Емоційне відео чоловіка, який плаче від захвату, споглядаючи подвійну веселку в національному парку Йосеміті." },
    { title: "Bed Intruder Song (2010)", desc: "Автотюнений ремікс новинного інтерв'ю Антуана Додсона, який попереджав про зловмисника." },
    { title: "Sad Keanu (2010)", desc: "Фото Кіану Рівза, який самотньо сидить на лавці в парку та їсть сендвіч." }
  ],
  2011: [
    { title: "Nyan Cat (2011)", desc: "Піксельний котик з тілом печива Pop-Tart, який летить у космосі та залишає за собою веселковий шлейф." },
    { title: "Trollface (2011)", desc: "Графічний символ інтернет-тролінгу, що став обличчям епохи лютих коміксів (Rage Comics)." },
    { title: "Friday - Rebecca Black (2011)", desc: "Музичний кліп 13-річної співачки, який охрестили 'найгіршою піснею у світі', що викликав лавину пародій." }
  ],
  2012: [
    { title: "Gangnam Style (2012)", desc: "Південнокорейський хіт від PSY із характерним танцем вершника, що зламав лічильник переглядів YouTube." },
    { title: "Grumpy Cat (2012)", desc: "Кішка Соус Тардар з постійно незадоволеним виразом мордочки через вроджений неправильний прикус." },
    { title: "Overly Attached Girlfriend (2012)", desc: "Стоп-кадр з дівчиною з шаленим поглядом, що стала символом надмірних ревнощів у стосунках." }
  ],
  2013: [
    { title: "Doge (2013)", desc: "Мемний собака породи сіба-іну, який виражає думки на ламаній англійській шрифтом Comic Sans." },
    { title: "Harlem Shake (2013)", desc: "Короткі відео, де під трек Baauer одна людина танцює в шоломі, а після басового дропу всі присутні починають божеволіти." },
    { title: "What Does The Fox Say? (2013)", desc: "Гумористичний кліп норвезького дуету Ylvis про те, які ж звуки видає лисиця." }
  ],
  2014: [
    { title: "Ice Bucket Challenge (2014)", desc: "Масштабний благодійний челендж із виливанням на себе відра крижаної води для збору коштів на дослідження БАС." },
    { title: "Kermit: None of My Business (2014)", desc: "Жаба Керміт спокійно п'є чай, іронізуючи над абсурдними вчинками людей і додаючи: 'Але це не моя справа'." },
    { title: "Press F to Pay Respects (2014)", desc: "Мем із гри Call of Duty, де гравцеві пропонували натиснути кнопку F для вираження скорботи на похороні." }
  ],
  2015: [
    { title: "The Dress (2015)", desc: "Фото сукні, колір якої викликав глобальні суперечки в мережі: одні бачили її біло-золотою, інші — синьо-чорною." },
    { title: "Left Shark (2015)", desc: "Танцюрист у костюмі акули на виступі Кеті Перрі, який повністю забув хореографію, але танцював з усім серцем." },
    { title: "Why You Always Lying (2015)", desc: "Пародійне відео з піснею та фірмовою посмішкою про людей, які постійно брешуть." }
  ],
  2016: [
    { title: "Harambe (2016)", desc: "Глобальний меморіал та мільйони мемів на честь горили Харамбе із зоопарку Цинциннаті." },
    { title: "Pen-Pineapple-Apple-Pen (PPAP) (2016)", desc: "Короткий та абсурдний музичний вірус від японського коміка ПікоТаро про ручку та яблуко-ананас." },
    { title: "Evil Kermit (2016)", desc: "Темний Керміт у каптурі переконує звичайного Керміта здійснити якусь дурість." },
    { title: "Arthur's Fist (2016)", desc: "Стиснутий кулак мультяшного героя Артура, який використовують для вираження глибокого внутрішнього гніву." }
  ],
  2017: [
    { title: "Distracted Boyfriend (2017)", desc: "Стокове фото, на якому хлопець заглядається на іншу дівчину, поки його партнерка дивиться на нього з обуренням." },
    { title: "Roll Safe (2017)", desc: "Персонаж вказує пальцем на скроню, пропонуючи абсурдні, але логічні рішення життєвих проблем." },
    { title: "Salt Bae (2017)", desc: "Турецький шеф-кухар Нусрет Гьокче, який артистично сипле сіль на м'ясо через лікоть." }
  ],
  2018: [
    { title: "Surprised Pikachu (2018)", desc: "Скріншот здивованого Пікачу з відкритим ротом, який використовують для реакції на передбачуваний фінал." },
    { title: "Tide Pods Challenge (2018)", desc: "Небезпечний та сатиричний тренд щодо споживання капсул прального порошку Tide Pods через їхній яскравий вигляд." },
    { title: "Is This a Pigeon? (2018)", desc: "Кадр з аніме, де герой вказує на метелика та запитує 'Це голуб?', що став шаблоном для повного нерозуміння очевидного." }
  ],
  2019: [
    { title: "Stonks (2019)", desc: "3D-модель голови Meme Man на тлі фінансового графіка, що іронізує над невдалими інвестиціями." },
    { title: "Woman Yelling at a Cat (2019)", desc: "Колаж із розлюченою жінкою з реаліті-шоу та спантеличеним білим котом за обіднім столом." },
    { title: "Area 51 Raid (2019)", desc: "План штурму секретної військової бази США з гаслом 'Вони не зможуть зупинити нас усіх, якщо ми побіжимо як Наруто'." }
  ],
  2020: [
    { title: "Coffin Dance (2020)", desc: "Танцюючі носії труни з Гани, які стали головним символом невдач під час пандемії." },
    { title: "Among Us / Sus (2020)", desc: "Популяризація гри та мемів про пошук зрадників серед членів екіпажу космічного корабля." },
    { title: "Nature is Healing (2020)", desc: "Іронічні повідомлення про повернення диких тварин до міст під час карантину." }
  ],
  2021: [
    { title: "Bernie Sanders' Mittens (2021)", desc: "Сенатор Берні Сандерс сидить у рукавицях на інавгурації президента, ставши символом затишної відчуженості." },
    { title: "Anakin and Padme (2021)", desc: "Шаблон мему про стурбовану Падме, яка сподівається, що Енакін жартує щодо своїх диктаторських планів." },
    { title: "Disaster Girl NFT (2021)", desc: "Дівчинка, яка посміхається на тлі будинку, що горить, продала оригінал фото у вигляді NFT за півмільйона доларів." }
  ],
  2022: [
    { title: "It's Corn! (2022)", desc: "Маленький хлопчик дає щире інтерв'ю про свою безмежну любов до кукурудзи: 'Вона соковита!'." },
    { title: "Will Smith Slaps Chris Rock (2022)", desc: "Інцидент на церемонії Оскар, коли Вілл Сміт вдарив ведучого Кріса Рока за жарт про його дружину, миттєво ставши шаблоном мемів." },
    { title: "GentleMinions (2022)", desc: "Тренд, де підлітки надягали ділові костюми, щоб масово піти в кінотеатри на мультфільм 'Міньйони'." }
  ],
  2023: [
    { title: "Barbenheimer (2023)", desc: "Культурний феномен об'єднання двох абсолютно контрастних прем'єр фільмів 'Барбі' та 'Оппенгеймер'." },
    { title: "Grimace Shake (2023)", desc: "Тренд у TikTok, де користувачі п'ють святковий коктейль від McDonald's та інсценують власну смерть у жахливих декораціях." },
    { title: "Pedro Raccoon (2023)", desc: "Кумедне відео з єнотом, який крутиться під бадьорий ремікс пісні 'Pedro'." }
  ],
  2024: [
    { title: "Chill Guy (2024)", desc: "Намальований пес у светрі, що уособлює повний спокій та незворушність перед будь-якими життєвими негараздами." },
    { title: "Demure & Mindful (2024)", desc: "Іронічний тренд про те, як поводитися скромно, охайно та з повагою в повсякденному житті." },
    { title: "Hawk Tuah (2024)", desc: "Фраза дівчини з вірусного вуличного інтерв'ю, яка миттєво розлетілася на тисячі звукових доріжок та мемів." }
  ],
  2025: [
    { title: "Moo Deng (2025)", desc: "Маленьке гіперактивне дитинча карликового бегемота з Таїланду, яке підкорило соцмережі своєю милою агресією та непосидючістю." },
    { title: "Pesto the Penguin (2025)", desc: "Гігантське пухнасте пінгвінятко королівського пінгвіна з Австралії, яке своєю величезною вагою затьмарило обох батьків." },
    { title: "AI Voice Mode Calls (2025)", desc: "Користувачі масово спілкуються, закохуються та сперечаються з реалістичними AI-голосами, які вміють ідеально зітхати та жартувати." }
  ],
  2026: [
    { title: "Apple Vision Pro in Public (2026)", desc: "Відео людей, які гуляють містом, водять машини чи їдять у ресторанах, дивно «щипаючи» повітря пальцями перед собою." },
    { title: "Sora / AI Video Fails (2026)", desc: "Абсурдні та смішні згенеровані штучним інтелектом ролики, де коти мають вісім лап, а люди їдять макарони крізь власні щоки." },
    { title: "Starship Catch (2026)", desc: "Інженерний тріумф і тисячі мемів про величезні металеві «палички для їжі» (Chopsticks), що ловлять гігантську ракету в повітрі." }
  ]
};

const HISTORICAL_YOUTUBE = {
  2005: [
    { title: "Me at the zoo", channel: "jawed", views: "310M", id: "jNQXAC9IVRw", desc: "The very first video uploaded to YouTube on April 23, 2005." },
    { title: "Ronaldinho: Touch of Gold", channel: "Nike Football", views: "100M", id: "KNw8T_0O18c", desc: "The first video to reach one million views on YouTube, featuring the soccer legend hitting the crossbar repeatedly." },
    { title: "Canon Rock", channel: "funtwo", views: "90M", id: "QjA5faZF1A8", desc: "One of the earliest viral music videos, featuring a shred guitar arrangement of Pachelbel's Canon." }
  ],
  2007: [
    { title: "Charlie bit my finger - again !", channel: "HDCYT", views: "900M", id: "_OBlgSz8sSM", desc: "One of the most famous early viral video clips in web history." },
    { title: "The Evolution of Dance", channel: "Judson Laipply", views: "310M", id: "dMH0bHeiRNg", desc: "One of the first viral comedy skits demonstrating popular dances throughout the decades." },
    { title: "Chocolate Rain", channel: "TayZonday", views: "135M", id: "EwTZ2xpQwpA", desc: "The legendary viral song with deep vocals and quirky keyboard playing." }
  ],
  2009: [
    { title: "David After Dentist", channel: "Booba", views: "145M", id: "txqiwrbYGrs", desc: "Is this real life? Kid's reaction after a dental appointment." },
    { title: "Lady Gaga - Bad Romance", channel: "LadyGagaVEVO", views: "1.8B", id: "qrO4fZqfqCY", desc: "The mega-viral music video that dominated early YouTube rankings." },
    { title: "Susan Boyle - Britain's Got Talent", channel: "BGT", views: "250M", id: "RxPZh4AnWyk", desc: "The viral singing performance that shocked the judges and went worldwide." }
  ],
  2010: [
    { title: "Bed Intruder Song", channel: "Schmoyoho", views: "155M", id: "hMtZfW2z9dw", desc: "Classic auto-tuned news remix that went completely viral." },
    { title: "Eminem - Love The Way You Lie ft. Rihanna", channel: "EminemVEVO", views: "2.7B", id: "uelHwf8o7_U", desc: "One of the most-viewed music videos of 2010 worldwide." },
    { title: "The Annoying Orange", channel: "Daneboe", views: "230M", id: "ZN5PoW7Yj54", desc: "A classic web series about an orange that pestered other kitchen ingredients." }
  ],
  2012: [
    { title: "PSY - GANGNAM STYLE M/V", channel: "officialpsy", views: "5.1B", id: "9bZkp7q19f0", desc: "The record-shattering K-Pop phenomenon that broke YouTube's counter." },
    { title: "Gotye - Somebody That I Used to Know", channel: "gotyemusic", views: "2.3B", id: "8WYHDf5PHCg", desc: "The global indie-pop sensation with an iconic body paint art video." },
    { title: "KONY 2012", channel: "Invisible Children", views: "120M", id: "Y4MnpzRxGCU", desc: "A short documentary that became the fastest-growing viral campaign of its time." }
  ],
  2013: [
    { title: "Ylvis - The Fox (What Does The Fox Say?)", channel: "tvnorge", views: "1.1B", id: "jofNR_WkoCE", desc: "The electronic dance sensation that asked the ultimate animal question." },
    { title: "Miley Cyrus - Wrecking Ball", channel: "MileyCyrusVEVO", views: "1.2B", id: "My2FRPA3Gf8", desc: "The controversial and visually striking pop music video that broke view records." },
    { title: "Harlem Shake (Official Army Edition)", channel: "USArmy", views: "115M", id: "8f7wj_RcoYk", desc: "The viral meme of 2013 showing sudden chaotic dancing to Baauer's hit." }
  ],
  2016: [
    { title: "PPAP (Pen-Pineapple-Apple-Pen)", channel: "PIKOTARO", views: "450M", id: "Ct6BUPvE2sM", desc: "Viral hit song that holds a Guinness World Record." },
    { title: "Adele - Hello Carpool Karaoke", channel: "The Late Late Show", views: "260M", id: "Nck6BZGA7TQ", desc: "The hit talk show segment featuring Adele singing along in the passenger seat." },
    { title: "Alan Walker - Faded", channel: "Alan Walker", views: "3.5B", id: "60ItHLz5WEA", desc: "The atmospheric music video that launched the DJ into global stardom." }
  ],
  2017: [
    { title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "LuisFonsiVEVO", views: "8.5B", id: "kJQP7kiw5Fk", desc: "The absolute summer anthem that topped charts worldwide." },
    { title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", views: "6.2B", id: "JGwWNGJdvx8", desc: "One of the most popular music videos in internet history." },
    { title: "Taylor Swift - Look What You Made Me Do", channel: "TaylorSwiftVEVO", views: "1.5B", id: "3tmd-ClpJxA", desc: "The dramatic, record-breaking music video announcing Taylor's reputation era." }
  ],
  2018: [
    { title: "Childish Gambino - This Is America", channel: "Donald Glover", views: "910M", id: "VYOjWnS4cMY", desc: "The visual masterpiece and political commentary that swept the internet." },
    { title: "Drake - God's Plan", channel: "DrakeVEVO", views: "1.5B", id: "xpVfcZ0ZcFM", desc: "Drake gives away his production budget to strangers in a viral good-will music video." },
    { title: "Maroon 5 - Girls Like You ft. Cardi B", channel: "Maroon5VEVO", views: "3.5B", id: "aJOTlE1K90k", desc: "A star-studded video tribute to powerful women featuring cameos from celebrities." }
  ],
  2020: [
    { title: "BTS - Dynamite Official M/V", channel: "HYBE LABELS", views: "1.8B", id: "gdZLi9oWNZg", desc: "BTS breaks the 24-hour YouTube viewing record." },
    { title: "The Weeknd - Blinding Lights", channel: "The Weeknd", views: "800M", id: "4NRXx6U8ABQ", desc: "The cinematic and synth-wave hit that became a global defining anthem." },
    { title: "Future - Life Is Good ft. Drake", channel: "FutureVEVO", views: "2.1B", id: "l0U7SxXHkPY", desc: "A lighthearted music video showcasing Drake and Future working various blue-collar jobs." }
  ],
  2023: [
    { title: "Minecraft Trial Chamber Reveal", channel: "Minecraft", views: "25M", id: "eJz39eFvC2w", desc: "Huge announcement video for the major trial chambers update." },
    { title: "Miley Cyrus - Flowers", channel: "MileyCyrusVEVO", views: "750M", id: "G7KNmW9a75Y", desc: "The record-shattering self-love anthem of 2023." },
    { title: "Linkin Park - Lost M/V", channel: "Linkin Park", views: "80M", id: "7OBqH_15d10", desc: "A beautifully animated anime-style music video releasing a legendary vault track." }
  ],
  2024: [
    { title: "Inside Out 2 - Official Teaser", channel: "Pixar", views: "80M", id: "LEjhYnP8pKA", desc: "First trailer for Disney Pixar's smash-hit animated sequel Inside Out 2." },
    { title: "Sabrina Carpenter - Espresso", channel: "Sabrina Carpenter", views: "150M", id: "eptjcXZHCp4", desc: "The viral beachside retro music video that became the song of the summer." },
    { title: "GTA VI - Official Trailer 1", channel: "Rockstar Games", views: "210M", id: "QdBZY2fkU-0", desc: "The highly anticipated first trailer for Grand Theft Auto VI, breaking records upon release." }
  ],
  2025: [
    { title: "Minecraft Movie - Teaser Trailer", channel: "Warner Bros.", views: "40M", id: "wJO-2Wf-A8g", desc: "Official first teaser trailer for the live-action Minecraft movie." },
    { title: "Lady Gaga, Bruno Mars - Die With A Smile", channel: "Lady Gaga", views: "90M", id: "kPa7bsKwL-c", desc: "The retro studio-duet music video featuring two legendary vocalists." },
    { title: "Captain America: Brave New World Trailer", channel: "Marvel", views: "30M", id: "1pHDWnP-YsY", desc: "Official action trailer showcasing Sam Wilson's flight in the new shield armor." }
  ],
  2026: [
    { title: "Wicked - Official Trailer", channel: "Universal Pictures", views: "35M", id: "pg1pB6Psn84", desc: "Official trailer for the cinematic musical event adaptation of Wicked." },
    { title: "The Mandalorian Season 3 - Official Trailer", channel: "Star Wars", views: "20M", id: "Znsa4Deavgg", desc: "The official epic promotional video previewing Din Djarin's flight to Mandalore." },
    { title: "Billie Eilish - Birds of a Feather", channel: "Billie Eilish", views: "120M", id: "d5gpCSBw3S0", desc: "Official music video showcase of Billie Eilish's hit single from Hit Me Hard and Soft." }
  ]
};

// Helper to get nearest decade or year fallback
const getCuratedItem = (dataset, year) => {
  const years = Object.keys(dataset).map(Number).sort((a,b) => b-a); // desc
  if (dataset[year]) return dataset[year];
  const nearest = years.find(y => y <= year);
  return dataset[nearest] || dataset[years[years.length - 1]];
};

// -------------------------------------------------------------
// API FETCH HANDLERS
// -------------------------------------------------------------

// 1. EXCHANGE RATES (Frankfurter API - Free, Keyless)
export const fetchRates = async (dateString) => {
  try {
    const dateObj = new Date(dateString);
    const minDate = new Date('1999-01-04');
    let targetDate = dateString;

    if (dateObj < minDate) {
      targetDate = '1999-01-04'; 
    }

    const response = await fetch(`https://api.frankfurter.app/${targetDate}?from=USD&to=EUR,GBP,JPY,CAD,CHF`);
    if (!response.ok) throw new Error('Failed to fetch Frankfurter rates');
    const data = await response.json();
    return {
      date: data.date,
      base: data.base,
      rates: data.rates
    };
  } catch (error) {
    console.error('Frankfurter API error, using fallback:', error);
    return {
      date: dateString,
      base: 'USD',
      rates: {
        EUR: 0.89 + Math.sin(new Date(dateString).getFullYear()) * 0.05,
        GBP: 0.76 + Math.cos(new Date(dateString).getFullYear()) * 0.04,
        JPY: 110.5 + Math.sin(new Date(dateString).getFullYear()) * 10,
        CAD: 1.31 + Math.sin(new Date(dateString).getFullYear()) * 0.08,
        CHF: 0.98 + Math.cos(new Date(dateString).getFullYear()) * 0.03
      }
    };
  }
};

// 2. SONGS (iTunes Search API - Free, Keyless, media=music)
const CURATED_HITS = {
  1950: [
    { title: "Jailhouse Rock", artist: "Elvis Presley" },
    { title: "Johnny B. Goode", artist: "Chuck Berry" },
    { title: "Rock Around the Clock", artist: "Bill Haley & His Comets" },
    { title: "What'd I Say", artist: "Ray Charles" }
  ],
  1960: [
    { title: "Yesterday", artist: "The Beatles" },
    { title: "Satisfaction", artist: "The Rolling Stones" },
    { title: "Purple Haze", artist: "Jimi Hendrix" },
    { title: "Respect", artist: "Aretha Franklin" }
  ],
  1970: [
    { title: "Bohemian Rhapsody", artist: "Queen" },
    { title: "Stayin' Alive", artist: "Bee Gees" },
    { title: "Dancing Queen", artist: "ABBA" },
    { title: "Hotel California", artist: "Eagles" }
  ],
  1980: [
    { title: "Billie Jean", artist: "Michael Jackson" },
    { title: "Like a Virgin", artist: "Madonna" },
    { title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
    { title: "Take On Me", artist: "a-ha" }
  ],
  1990: [
    { title: "Smells Like Teen Spirit", artist: "Nirvana" },
    { title: "...Baby One More Time", artist: "Britney Spears" },
    { title: "I Will Always Love You", artist: "Whitney Houston" },
    { title: "Losing My Religion", artist: "R.E.M." }
  ],
  2000: [
    { title: "Lose Yourself", artist: "Eminem" },
    { title: "Hey Ya!", artist: "Outkast" },
    { title: "Toxic", artist: "Britney Spears" },
    { title: "In the End", artist: "Linkin Park" }
  ],
  2010: [
    { title: "Rolling in the Deep", artist: "Adele" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Somebody That I Used to Know", artist: "Gotye" }
  ],
  2020: [
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Don't Start Now", artist: "Dua Lipa" },
    { title: "Dynamite", artist: "BTS" }
  ],
  2021: [
    { title: "Drivers License", artist: "Olivia Rodrigo" },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber" },
    { title: "Bad Habits", artist: "Ed Sheeran" }
  ],
  2022: [
    { title: "As It Was", artist: "Harry Styles" },
    { title: "Heat Waves", artist: "Glass Animals" },
    { title: "Running Up That Hill", artist: "Kate Bush" }
  ],
  2023: [
    { title: "Flowers", artist: "Miley Cyrus" },
    { title: "Cruel Summer", artist: "Taylor Swift" },
    { title: "Paint The Town Red", artist: "Doja Cat" }
  ],
  2024: [
    { title: "Espresso", artist: "Sabrina Carpenter" },
    { title: "Birds of a Feather", artist: "Billie Eilish" },
    { title: "Too Sweet", artist: "Hozier" },
    { title: "Not Like Us", artist: "Kendrick Lamar" }
  ],
  2025: [
    { title: "Die With a Smile", artist: "Lady Gaga & Bruno Mars" },
    { title: "Birds of a Feather", artist: "Billie Eilish" },
    { title: "Espresso", artist: "Sabrina Carpenter" }
  ],
  2026: [
    { title: "Beautiful Things", artist: "Benson Boone" },
    { title: "Lose Control", artist: "Teddy Swims" },
    { title: "A Bar Song (Tipsy)", artist: "Shaboozey" }
  ]
};

const getCuratedSongsList = (year) => {
  const years = Object.keys(CURATED_HITS).map(Number).sort((a,b) => b-a);
  if (CURATED_HITS[year]) return CURATED_HITS[year];
  const nearest = years.find(y => y <= year);
  return CURATED_HITS[nearest] || CURATED_HITS[years[years.length - 1]];
};

const cleanTracks = (tracks) => {
  const excludelist = ['tribute', 'karaoke', 'cover', 'tribute band', 'instrumental', 'originally performed by', 'tribute to', 'tribute band', 'karaoke version'];
  return tracks.filter(track => {
    const artist = (track.artistName || '').toLowerCase();
    const title = (track.trackName || '').toLowerCase();
    const album = (track.collectionName || '').toLowerCase();
    return !excludelist.some(word => artist.includes(word) || title.includes(word) || album.includes(word));
  });
};

const DECADE_ARTISTS = {
  1950: ['Elvis Presley', 'Chuck Berry', 'Little Richard', 'Bill Haley', 'Frank Sinatra', 'Dean Martin', 'Ray Charles', 'Johnny Cash', 'Buddy Holly', 'Fats Domino'],
  1960: ['The Beatles', 'The Rolling Stones', 'The Beach Boys', 'Aretha Franklin', 'Bob Dylan', 'Marvin Gaye', 'The Supremes', 'Jimi Hendrix', 'The Doors', 'Simon & Garfunkel'],
  1970: ['Queen', 'ABBA', 'Bee Gees', 'Led Zeppelin', 'Pink Floyd', 'Stevie Wonder', 'Elton John', 'David Bowie', 'Fleetwood Mac', 'Donna Summer'],
  1980: ['Michael Jackson', 'Madonna', 'Prince', 'Whitney Houston', 'Bruce Springsteen', 'U2', 'Bon Jovi', 'Phil Collins', 'George Michael', 'a-ha', 'Cyndi Lauper', 'Guns N\' Roses'],
  1990: ['Nirvana', 'Britney Spears', 'Mariah Carey', 'Backstreet Boys', 'Tupac', 'Celine Dion', 'Oasis', 'R.E.M.', 'Red Hot Chili Peppers', 'Whitney Houston'],
  2000: ['Eminem', 'Britney Spears', 'Beyonce', 'Linkin Park', 'Coldplay', 'Rihanna', 'Outkast', 'Justin Timberlake', 'Shakira', 'Alicia Keys'],
  2010: ['Adele', 'Bruno Mars', 'Ed Sheeran', 'Taylor Swift', 'Drake', 'Katy Perry', 'Rihanna', 'Justin Bieber', 'Maroon 5', 'Coldplay'],
  2020: ['The Weeknd', 'Dua Lipa', 'Billie Eilish', 'Harry Styles', 'Olivia Rodrigo', 'Taylor Swift', 'Miley Cyrus', 'Sabrina Carpenter', 'Benson Boone', 'Teddy Swims']
};

export const fetchSongs = async (year) => {
  const decade = Math.floor(year / 10) * 10;
  const artists = DECADE_ARTISTS[decade] || DECADE_ARTISTS[2020];
  
  // Deterministically select 5 artists based on the year to ensure year-by-year variety
  const selectedArtists = [];
  const tempArtists = [...artists];
  for (let i = 0; i < 5; i++) {
    const index = (year + i * 13) % tempArtists.length;
    selectedArtists.push(tempArtists.splice(index, 1)[0]);
  }

  // Fetch a track for each selected artist, querying with the year to get hits of that era
  const songs = await Promise.all(
    selectedArtists.map(async (artist, idx) => {
      try {
        const query = `${artist} ${year}`;
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=5`);
        if (res.ok) {
          const data = await res.json();
          let results = data.results || [];
          
          results = cleanTracks(results);

          if (results.length === 0) {
            const fallbackQuery = `${artist} ${decade}s`;
            const fbRes = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(fallbackQuery)}&media=music&entity=song&limit=5`);
            if (fbRes.ok) {
              const fbData = await fbRes.json();
              results = cleanTracks(fbData.results || []);
            }
          }

          if (results.length > 0) {
            const track = results[0];
            return {
              id: track.trackId || `${year}-song-${idx}`,
              title: track.trackName,
              artist: track.artistName,
              album: track.collectionName || "Top Hits",
              artwork: track.artworkUrl100?.replace('100x100bb', '300x300bb') || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500',
              previewUrl: track.previewUrl
            };
          }
        }
      } catch (e) {
        console.warn(`Failed to fetch dynamic song for artist ${artist} in ${year}:`, e);
      }
      return null;
    })
  );

  const validSongs = songs.filter(Boolean);

  if (validSongs.length >= 3) {
    return validSongs.slice(0, 5);
  }

  // Ultimate fallback
  const songsList = getCuratedSongsList(year);
  
  const songsWithMedia = await Promise.all(
    songsList.map(async (song, index) => {
      try {
        const query = `${song.artist} ${song.title}`;
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=1&entity=song`);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const track = data.results[0];
            return {
              id: track.trackId || `${year}-song-${index}`,
              title: track.trackName || song.title,
              artist: track.artistName || song.artist,
              album: track.collectionName || "Top Hits",
              artwork: track.artworkUrl100?.replace('100x100bb', '300x300bb') || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500',
              previewUrl: track.previewUrl
            };
          }
        }
      } catch (e) {
        console.warn(`Failed to fetch media for curated song ${song.title}:`, e);
      }
      return {
        id: `${year}-song-${index}`,
        title: song.title,
        artist: song.artist,
        album: "Top Hits",
        artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500',
        previewUrl: null
      };
    })
  );
  
  return songsWithMedia;
};

// 3. MOVIES (Curated Local Database with Live Poster Art from iTunes)
export const fetchMovies = async (year) => {
  const curatedMovies = getCuratedItem(HISTORICAL_MOVIES, year);

  // Fetch actual artwork dynamically from iTunes Search for each movie title
  const moviesWithPosters = await Promise.all(
    curatedMovies.map(async (movie) => {
      try {
        const query = movie.title.split(' (')[0];
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=1`);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const artwork = data.results[0].artworkUrl100?.replace('100x100bb', '600x600bb');
            if (artwork) {
              return {
                ...movie,
                poster: artwork
              };
            }
          }
        }
      } catch (e) {
        console.warn(`Failed to fetch live artwork for ${movie.title}:`, e);
      }
      return movie;
    })
  );

  return moviesWithPosters;
};

// Helper to strip HTML tags from Wikipedia snippets
const cleanSnippet = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
};

// 4. TOP HISTORICAL EVENTS (Wikimedia "On This Day" API - Free, Keyless)
export const fetchNews = async (dateString, targetYear) => {
  try {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'];
    const monthName = monthNames[date.getMonth()];

    // 1. Try to fetch Wikipedia On This Day
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
    if (response.ok) {
      const data = await response.json();
      
      // Combine events, births, and deaths from EXACTLY targetYear
      const exactEvents = [
        ...(data.events || []).filter(e => e.year === targetYear).map(e => ({
          title: e.pages && e.pages[0] ? e.pages[0].titles.normalized : "ПОДІЯ ДНЯ",
          desc: e.text,
          link: e.pages && e.pages[0] ? e.pages[0].content_urls.desktop.page : `https://en.wikipedia.org/wiki/${month}_${day}`
        })),
        ...(data.births || []).filter(e => e.year === targetYear).map(e => ({
          title: `Народився: ${e.pages && e.pages[0] ? e.pages[0].titles.normalized : "Постать в історії"}`,
          desc: `У цей день народилася видатна постать: ${e.text}`,
          link: e.pages && e.pages[0] ? e.pages[0].content_urls.desktop.page : `https://en.wikipedia.org/wiki/${month}_${day}`
        })),
        ...(data.deaths || []).filter(e => e.year === targetYear).map(e => ({
          title: `Помер: ${e.pages && e.pages[0] ? e.pages[0].titles.normalized : "Постать в історії"}`,
          desc: `У цей день пішла з життя видатна постать: ${e.text}`,
          link: e.pages && e.pages[0] ? e.pages[0].content_urls.desktop.page : `https://en.wikipedia.org/wiki/${month}_${day}`
        }))
      ];

      if (exactEvents.length >= 3) {
        return exactEvents.map(e => ({
          ...e,
          year: targetYear,
          date: `${day} ${monthName}. ${targetYear} р.`
        })).slice(0, 7);
      }
    }
    
    // 2. Fallback: Search Wikipedia articles containing the exact year for major year events
    const searchQuery = `${targetYear}`;
    const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*&srlimit=15`);
    
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
        // Filter out search results that are just lists or general page titles
        const validResults = searchData.query.search
          .filter(item => !item.title.toLowerCase().includes('list of') && item.title !== `${targetYear}`)
          .map(item => ({
            title: item.title,
            year: targetYear,
            date: `${day} ${monthName}. ${targetYear} р.`,
            desc: cleanSnippet(item.snippet) + "...",
            link: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
          }));

        if (validResults.length > 0) {
          return validResults.slice(0, 7);
        }
      }
    }
    
    throw new Error('No historical data found');
  } catch (error) {
    console.error('fetchNews error, using final fallback:', error);
    return [
      { 
        title: `Хроніка ${targetYear} року`, 
        year: targetYear,
        date: dateString, 
        desc: `У ${targetYear} році відбулися значні світові події, що змінили хід історії. Цей випуск присвячений подіям та культурі цієї визначної епохи.`, 
        link: "https://en.wikipedia.org" 
      }
    ];
  }
};

// 5. MEMES (Curated Local Database for 100% stable Unsplash Images)
export const fetchMemes = (year) => {
  return getCuratedItem(HISTORICAL_MEMES, year);
};

// 6. YOUTUBE TRENDS (Curated Local Database of Video IDs for Iframe Embeds)
export const fetchYoutube = (year) => {
  if (year < 2005) {
    return [
      {
        title: "YouTube ще не існував",
        channel: "Chronos Portal",
        views: "0",
        id: "",
        desc: "YouTube було запущено лише у 2005 році. До цього відео в інтернеті передавали через завантажувальні файли та Flash."
      }
    ];
  }
  return getCuratedItem(HISTORICAL_YOUTUBE, year);
};

// -------------------------------------------------------------
// MASTER FETCH FUNCTION
// -------------------------------------------------------------
export const fetchAllTimeMachineData = async (dateString) => {
  const year = new Date(dateString).getFullYear();

  // Run all active queries concurrently
  const [ratesData, songsData, newsData] = await Promise.all([
    fetchRates(dateString),
    fetchSongs(year),
    fetchNews(dateString, year)
  ]);

  const moviesData = await fetchMovies(year);
  const memesData = fetchMemes(year);
  const youtubeData = fetchYoutube(year);

  return {
    rates: ratesData,
    songs: songsData,
    movies: moviesData,
    news: newsData,
    memes: memesData,
    youtube: youtubeData
  };
};
