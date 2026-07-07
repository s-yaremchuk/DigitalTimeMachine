// Digital Time Machine API Integration Service

// LocalStorage keys for optional user keys
const STORAGE_KEYS = {
  TMDB: 'dtm_tmdb_key',
  GUARDIAN: 'dtm_guardian_key'
};

// Retrieve API keys
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

// -------------------------------------------------------------
// HISTORICAL CURATED DATA FOR ACCURATE FALLBACKS
// -------------------------------------------------------------

const HISTORICAL_MEMES = {
  2000: [
    { title: "All Your Base Are Belong To Us", desc: "Classic early internet gaming flash meme.", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60" },
    { title: "Dancing Baby", desc: "One of the oldest viral 3D animations.", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=60" }
  ],
  2005: [
    { title: "Chuck Norris Facts", desc: "Satirical factoids about the legendary martial artist.", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500&auto=format&fit=crop&q=60" },
    { title: "Badger Badger Badger", desc: "Mushroom, mushroom! The viral flash loop.", image: "https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?w=500&auto=format&fit=crop&q=60" }
  ],
  2007: [
    { title: "Rickroll", desc: "Rick Astley's 'Never Gonna Give You Up' bait-and-switch.", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60" },
    { title: "Chocolate Rain", desc: "Tay Zonday's deep voice and original song take over YouTube.", image: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=500&auto=format&fit=crop&q=60" }
  ],
  2010: [
    { title: "Bed Intruder Song", desc: "Hide yo kids, hide yo wife! Auto-tuned news.", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=500&auto=format&fit=crop&q=60" },
    { title: "Double Rainbow", desc: "What does it mean? A man's emotional response to a double rainbow.", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60" }
  ],
  2011: [
    { title: "Nyan Cat", desc: "Pop-Tart cat flying through space leaving a rainbow trail.", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60" },
    { title: "Trollface", desc: "The defining face of internet trolling and rage comics.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60" }
  ],
  2012: [
    { title: "Gangnam Style", desc: "PSY's horse-riding dance breaks YouTube's view counter.", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60" },
    { title: "Overly Attached Girlfriend", desc: "Laina Morris's parody video becomes the face of relationship intensity.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60" }
  ],
  2013: [
    { title: "Doge", desc: "Much wow, so noble, very doge. The iconic Shiba Inu.", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60" },
    { title: "Harlem Shake", desc: "Short video dance craze featuring wild costumes.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=60" }
  ],
  2014: [
    { title: "Ice Bucket Challenge", desc: "Pouring freezing water over heads for ALS awareness.", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60" },
    { title: "The Dress", desc: "Is it White & Gold or Blue & Black? The debate that divided the internet.", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=60" }
  ],
  2016: [
    { title: "Harimbe", desc: "A tribute to the gorilla whose memory lived on in millions of memes.", image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=500&auto=format&fit=crop&q=60" },
    { title: "Pen Pineapple Apple Pen", desc: "PicoTaro's short, catchy, pineapple-stabbing performance.", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&auto=format&fit=crop&q=60" },
    { title: "Arthur's Fist", desc: "A screenshot of Arthur Read's clenched fist symbolizing anger.", image: "https://images.unsplash.com/photo-1584949091598-c31daaea4de6?w=500&auto=format&fit=crop&q=60" }
  ],
  2017: [
    { title: "Distracted Boyfriend", desc: "Stock photo of a guy looking at another girl while his girlfriend looks mad.", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60" },
    { title: "Fidget Spinners", desc: "The low-friction physical spinner that dominated school classrooms.", image: "https://images.unsplash.com/photo-1596460612719-7b3b3bb98d49?w=500&auto=format&fit=crop&q=60" }
  ],
  2019: [
    { title: "Stonks", desc: "Meme Man showing absolute financial genius in front of rising charts.", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=60" },
    { title: "Woman Yelling at a Cat", desc: "Real Housewives star shouting at Smudge the cat sitting at a dinner plate.", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60" }
  ],
  2020: [
    { title: "Coffin Dance", desc: "Ghanaian pallbearers dancing joyfully while carrying a coffin.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=60" },
    { title: "Nature is Healing", desc: "Satirical observations of clear waters and wildlife during global lockdown.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60" }
  ],
  2023: [
    { title: "Barbenheimer", desc: "The ultimate double feature cultural event of Barbie and Oppenheimer.", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60" },
    { title: "Grimace Shake", desc: "TikTokers filming horror style reactions after drinking McDonald's purple shake.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=60" }
  ]
};

const HISTORICAL_YOUTUBE = {
  2005: [{ title: "Me at the zoo", channel: "jawed", views: "310M", link: "https://www.youtube.com/watch?v=jNQXAC9IVRw", desc: "The very first video uploaded to YouTube." }],
  2007: [{ title: "Charlie bit my finger - again !", channel: "HDCYT", views: "900M", link: "https://www.youtube.com/watch?v=_OBlgSz8sSM", desc: "Two British brothers capture the hearts of the early web." }],
  2010: [{ title: "Bed Intruder Song", channel: "Schmoyoho", views: "150M", link: "https://www.youtube.com/watch?v=hMtZfW2z9dw", desc: "Auto-tuned news remix that went completely viral." }],
  2012: [{ title: "PSY - GANGNAM STYLE (강남스타ール) M/V", channel: "officialpsy", views: "5.1B", link: "https://www.youtube.com/watch?v=9bZkp7q19f0", desc: "The record-shattering K-Pop phenomenon." }],
  2015: [{ title: "Star Wars: The Force Awakens Official Teaser 2", channel: "Star Wars", views: "120M", link: "https://www.youtube.com/watch?v=ngElkyQ6Rhs", desc: "Chewie, we're home. The massive hype return of Star Wars." }],
  2016: [{ title: "PPAP (Pen-Pineapple-Apple-Pen)", channel: "PIKOTARO", views: "450M", link: "https://www.youtube.com/watch?v=Ct6BUPvE2sM", desc: "Viral hit song that holds a Guinness World Record." }],
  2017: [{ title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "LuisFonsiVEVO", views: "8.5B", link: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", desc: "The summer anthem that topped charts worldwide." }],
  2020: [{ title: "Dynamite Official M/V", channel: "HYBE LABELS", views: "1.8B", link: "https://www.youtube.com/watch?v=gdZLi9oWNZg", desc: "BTS breaks the 24-hour YouTube viewing record." }]
};

const HISTORICAL_NEWS = {
  2001: [
    { title: "Wikipedia is Launched", date: "Jan 15", desc: "A new collaborative encyclopedia project goes live online." },
    { title: "Terror Attacks Strike US Targets", date: "Sep 11", desc: "World Trade Center towers and Pentagon struck in unprecedented hijackings." }
  ],
  2004: [
    { title: "Facebook Founded at Harvard", date: "Feb 4", desc: "Mark Zuckerberg launches 'Thefacebook' room directory site." },
    { title: "Massive Indian Ocean Earthquake", date: "Dec 26", desc: "9.1 magnitude quake triggers deadly tsunamis affecting 14 countries." }
  ],
  2007: [
    { title: "Apple Unveils the iPhone", date: "Jan 9", desc: "Steve Jobs showcases three products combined into one: a phone, an iPod, and an internet device." }
  ],
  2008: [
    { title: "Barack Obama Wins US Presidency", date: "Nov 4", desc: "Democratic Senator makes history as first African American elected president." }
  ],
  2012: [
    { title: "Curiosity Rover Lands on Mars", date: "Aug 6", desc: "NASA landing crew celebrates as the rover successfully touches down inside Gale Crater." },
    { title: "CERN Discovers Higgs Boson Particle", date: "Jul 4", desc: "Physicists announce discovery of new boson consistent with the 'God particle'." }
  ],
  2016: [
    { title: "UK Votes to Leave the European Union", date: "Jun 23", desc: "Historically dubbed 'Brexit', British voters narrow election 51.9% to exit EU." },
    { title: "Donald Trump Elected 45th US President", date: "Nov 8", desc: "Republican nominee wins Electoral College victory over Hillary Clinton." }
  ],
  2020: [
    { title: "WHO Declares Global COVID-19 Pandemic", date: "Mar 11", desc: "Coronavirus outbreak labeled global health pandemic as cases surge outside China." }
  ]
};

const HISTORICAL_MOVIES = {
  2001: [
    { title: "Harry Potter and the Sorcerer's Stone", rating: "8.1", overview: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself.", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", rating: "8.9", overview: "A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring.", poster: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500" }
  ],
  2008: [
    { title: "The Dark Knight", rating: "9.0", overview: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept his greatest psychological test.", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500" },
    { title: "Iron Man", rating: "7.9", overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor.", poster: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=500" }
  ],
  2009: [
    { title: "Avatar", rating: "7.9", overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" }
  ],
  2016: [
    { title: "Deadpool", rating: "8.0", overview: "A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers.", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500" },
    { title: "Captain America: Civil War", rating: "7.8", overview: "Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage.", poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500" }
  ],
  2023: [
    { title: "Oppenheimer", rating: "8.4", overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500" },
    { title: "Barbie", rating: "7.2", overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.", poster: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=500" }
  ]
};

// Helper to get nearest decade or year fallback
const getCuratedItem = (dataset, year) => {
  const years = Object.keys(dataset).map(Number).sort((a,b) => b-a); // desc
  // Find exact match
  if (dataset[year]) return dataset[year];
  // Find nearest earlier year
  const nearest = years.find(y => y <= year);
  return dataset[nearest] || dataset[years[years.length - 1]]; // fallback to oldest if none
};

// -------------------------------------------------------------
// API FETCH HANDLERS
// -------------------------------------------------------------

// 1. EXCHANGE RATES (Frankfurter API - Free)
export const fetchRates = async (dateString) => {
  try {
    // Frankfurter works for dates >= 1999-01-04
    const dateObj = new Date(dateString);
    const minDate = new Date('1999-01-04');
    let targetDate = dateString;

    if (dateObj < minDate) {
      targetDate = '1999-01-04'; // clamp to minimum available date
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
    // Mock Exchange Rates
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

// 2. SONGS (iTunes Search API - Free)
export const fetchSongs = async (year) => {
  try {
    // Search top songs of that year
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
    throw new Error('No results from iTunes');
  } catch (error) {
    console.error('iTunes API error, using fallback:', error);
    // Fallback period popular tracks
    return [
      { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500" },
      { id: 2, title: "Stayin' Alive", artist: "Bee Gees", album: "Saturday Night Fever", artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500" },
      { id: 3, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500" },
      { id: 4, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500" }
    ];
  }
};

// 3. MOVIES (TMDB API - Key Optional)
export const fetchMovies = async (dateString, year) => {
  const { tmdb: apiKey } = getApiKeys();
  if (!apiKey) {
    // Generate high quality mock TMDB results
    return getCuratedItem(HISTORICAL_MOVIES, year);
  }

  try {
    const date = new Date(dateString);
    const dateLTE = dateString;
    // Get release dates up to 60 days before the target date
    const dateGTEObj = new Date(date);
    dateGTEObj.setDate(dateGTEObj.getDate() - 60);
    const dateGTE = dateGTEObj.toISOString().split('T')[0];

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${dateGTE}&primary_release_date.lte=${dateLTE}&sort_by=popularity.desc&page=1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('TMDB request failed');
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results.slice(0, 4).map(movie => ({
        title: movie.title,
        rating: movie.vote_average.toFixed(1),
        overview: movie.overview,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500'
      }));
    }
    return getCuratedItem(HISTORICAL_MOVIES, year);
  } catch (error) {
    console.error('TMDB API error, using fallback:', error);
    return getCuratedItem(HISTORICAL_MOVIES, year);
  }
};

// 4. NEWS (The Guardian - Key Optional)
export const fetchNews = async (dateString, year) => {
  const { guardian: apiKey } = getApiKeys();
  if (!apiKey) {
    // Generate high quality mock news events
    return getCuratedItem(HISTORICAL_NEWS, year);
  }

  try {
    const url = `https://content.guardianapis.com/search?api-key=${apiKey}&from-date=${dateString}&to-date=${dateString}&page-size=5`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Guardian request failed');
    const data = await response.json();

    if (data.response?.results && data.response.results.length > 0) {
      return data.response.results.map(article => ({
        title: article.webTitle,
        date: new Date(article.webPublicationDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' }),
        desc: `Розділ: ${article.sectionName.toUpperCase()}`,
        link: article.webUrl
      }));
    }
    return getCuratedItem(HISTORICAL_NEWS, year);
  } catch (error) {
    console.error('Guardian API error, using fallback:', error);
    return getCuratedItem(HISTORICAL_NEWS, year);
  }
};

// 5. MEMES (Curated Database lookup)
export const fetchMemes = (year) => {
  return getCuratedItem(HISTORICAL_MEMES, year);
};

// 6. YOUTUBE TRENDS (Curated Database lookup)
export const fetchYoutube = (year) => {
  return getCuratedItem(HISTORICAL_YOUTUBE, year);
};

// -------------------------------------------------------------
// MASTER FETCH FUNCTION
// -------------------------------------------------------------
export const fetchAllTimeMachineData = async (dateString) => {
  const year = new Date(dateString).getFullYear();

  // Run async network queries concurrently where possible
  const [ratesData, songsData, moviesData, newsData] = await Promise.all([
    fetchRates(dateString),
    fetchSongs(year),
    fetchMovies(dateString, year),
    fetchNews(dateString, year)
  ]);

  // Curated datasets loaded instantly
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
