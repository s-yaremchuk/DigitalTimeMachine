const STORAGE_KEYS = {
  TMDB: 'dtm_tmdb_key',
  GUARDIAN: 'dtm_guardian_key'
};

export const getApiKeys = () => {
  return {
    tmdb: localStorage.getItem(STORAGE_KEYS.TMDB) || '',
    guardian: localStorage.getItem(STORAGE_KEYS.GUARDIAN) || ''
  };
};

export const saveApiKeys = (keys) => {
  if (keys.tmdb !== undefined) localStorage.setItem(STORAGE_KEYS.TMDB, keys.tmdb);
  if (keys.guardian !== undefined) localStorage.setItem(STORAGE_KEYS.GUARDIAN, keys.guardian);
};

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
    { title: "Deadpool (2016)", rating: "8.0", overview: "A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers.", poster: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=500" },
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
  ]
};

const HISTORICAL_MEMES = {
  1998: [
    { title: "Dancing Baby (1998)", desc: "One of the oldest viral 3D animations, rendered as a loop.", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80" }
  ],
  2000: [
    { title: "All Your Base Are Belong To Us (2000)", desc: "Classic early internet gaming flash translation error meme.", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80" }
  ],
  2005: [
    { title: "Chuck Norris Facts (2005)", desc: "Satirical factoids about the legendary martial artist.", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=600&q=80" }
  ],
  2007: [
    { title: "Rickroll (2007)", desc: "Rick Astley's 'Never Gonna Give You Up' bait-and-switch viral link.", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80" }
  ],
  2010: [
    { title: "Double Rainbow (2010)", desc: "What does it mean? A man's emotional response to a double rainbow.", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80" }
  ],
  2011: [
    { title: "Nyan Cat (2011)", desc: "Pop-Tart cat flying through space leaving a rainbow trail.", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80" }
  ],
  2012: [
    { title: "Gangnam Style (2012)", desc: "PSY's dance breaks YouTube's view counter.", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80" }
  ],
  2013: [
    { title: "Doge (2013)", desc: "Much wow, so noble, very doge. The iconic Shiba Inu.", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80" }
  ],
  2015: [
    { title: "The Dress (2015)", desc: "Is it White & Gold or Blue & Black? The debate that divided the internet.", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" }
  ],
  2016: [
    { title: "Harambe (2016)", desc: "A tribute to the gorilla whose memory lived on in millions of memes.", image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=600&q=80" }
  ],
  2017: [
    { title: "Distracted Boyfriend (2017)", desc: "Stock photo of a guy looking at another girl while his girlfriend looks mad.", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80" }
  ],
  2019: [
    { title: "Stonks (2019)", desc: "Meme Man showing absolute financial genius in front of rising charts.", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80" }
  ],
  2020: [
    { title: "Coffin Dance (2020)", desc: "Ghanaian pallbearers dancing joyfully while carrying a coffin.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80" }
  ],
  2023: [
    { title: "Barbenheimer (2023)", desc: "The ultimate double feature cultural event of Barbie and Oppenheimer.", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80" }
  ],
  2024: [
    { title: "Chill Guy (2024)", desc: "Just a chill guy who doesn't care about anything.", image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&q=80" }
  ]
};

const HISTORICAL_YOUTUBE = {
  2005: [
    { title: "Me at the zoo", channel: "jawed", views: "310M", id: "jNQXAC9IVRw", desc: "The very first video uploaded to YouTube on April 23, 2005." }
  ],
  2007: [
    { title: "Charlie bit my finger - again !", channel: "HDCYT", views: "900M", id: "_OBlgSz8sSM", desc: "One of the most famous early viral video clips in web history." }
  ],
  2009: [
    { title: "David After Dentist", channel: "Booba", views: "145M", id: "txqiwrbYGrs", desc: "Is this real life? Kid's reaction after a dental appointment." }
  ],
  2010: [
    { title: "Bed Intruder Song", channel: "Schmoyoho", views: "155M", id: "hMtZfW2z9dw", desc: "Classic auto-tuned news remix that went completely viral." }
  ],
  2012: [
    { title: "PSY - GANGNAM STYLE M/V", channel: "officialpsy", views: "5.1B", id: "9bZkp7q19f0", desc: "The record-shattering K-Pop phenomenon that broke YouTube's counter." }
  ],
  2013: [
    { title: "Ylvis - The Fox (What Does The Fox Say?)", channel: "tvnorge", views: "1.1B", id: "jofNR_WkoCE", desc: "The electronic dance sensation that asked the ultimate animal question." }
  ],
  2016: [
    { title: "PPAP (Pen-Pineapple-Apple-Pen)", channel: "PIKOTARO", views: "450M", id: "Ct6BUPvE2sM", desc: "Viral hit song that holds a Guinness World Record." }
  ],
  2017: [
    { title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "LuisFonsiVEVO", views: "8.5B", id: "kJQP7kiw5Fk", desc: "The absolute summer anthem that topped charts worldwide." }
  ],
  2018: [
    { title: "Childish Gambino - This Is America", channel: "Donald Glover", views: "910M", id: "VYOjWnS4cMY", desc: "The visual masterpiece and political commentary that swept the internet." }
  ],
  2020: [
    { title: "BTS - Dynamite Official M/V", channel: "HYBE LABELS", views: "1.8B", id: "gdZLi9oWNZg", desc: "BTS breaks the 24-hour YouTube viewing record." }
  ],
  2023: [
    { title: "Minecraft Trial Chamber Reveal", channel: "Minecraft", views: "25M", id: "eJz39eFvC2w", desc: "Huge announcement video for the major trial chambers update." }
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
export const fetchSongs = async (year) => {
  try {
    const response = await fetch(`https://itunes.apple.com/search?term=${year}+hits&media=music&limit=6&entity=song`);
    if (!response.ok) throw new Error('iTunes Search failed');
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results.map((track, index) => ({
        id: track.trackId || index,
        title: track.trackName,
        artist: track.artistName,
        album: track.collectionName,
        artwork: track.artworkUrl100?.replace('100x100bb', '400x400bb') || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
        previewUrl: track.previewUrl
      }));
    }
    throw new Error('No results from iTunes music search');
  } catch (error) {
    console.error('iTunes Music error, using fallback:', error);
    return [
      { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500" },
      { id: 2, title: "Stayin' Alive", artist: "Bee Gees", album: "Saturday Night Fever", artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500" },
      { id: 3, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500" }
    ];
  }
};

// 3. MOVIES (Curated Local Database for Absolute Stability & Image Load)
export const fetchMovies = (year) => {
  return getCuratedItem(HISTORICAL_MOVIES, year);
};

// 4. TOP HISTORICAL EVENTS (Wikimedia "On This Day" API - Free, Keyless)
export const fetchNews = async (dateString, targetYear) => {
  try {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/${month}/${day}`);
    if (!response.ok) throw new Error('Wikimedia request failed');
    const data = await response.json();

    if (data.selected && data.selected.length > 0) {
      const sortedEvents = data.selected
        .map(event => ({
          title: event.text,
          year: event.year,
          date: `${day} ${new Date(targetYear, month - 1, day).toLocaleString('uk-UA', { month: 'short' })} ${event.year} р.`,
          desc: event.pages && event.pages[0] ? `Детальніше: ${event.pages[0].titles.normalized}` : 'Історична подія дня.',
          link: event.pages && event.pages[0] ? event.pages[0].content_urls.desktop.page : `https://en.wikipedia.org/wiki/${month}_${day}`
        }))
        .sort((a, b) => Math.abs(a.year - targetYear) - Math.abs(b.year - targetYear));

      return sortedEvents.slice(0, 4);
    }
    throw new Error('No Wikimedia selected events');
  } catch (error) {
    console.error('Wikimedia API error, using fallback:', error);
    return [
      { title: `Важлива світова подія сталася в цей день у ${targetYear} році.`, date: dateString, desc: "Новини з архіву історії.", link: "https://en.wikipedia.org" }
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

  const moviesData = fetchMovies(year);
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
