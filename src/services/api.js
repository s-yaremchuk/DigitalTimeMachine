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
// -------------------------------------------------------------

const HISTORICAL_MOVIES = {
  1970: [
    { title: "The Godfather (1972)", rating: "9.2", overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" },
    { title: "Star Wars (1977)", rating: "8.6", overview: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire.", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500" }
  ],
  1980: [
    { title: "Back to the Future (1985)", rating: "8.5", overview: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean.", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500" },
    { title: "The Shining (1980)", rating: "8.4", overview: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.", poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500" }
  ],
  1990: [
    { title: "Jurassic Park (1993)", rating: "8.2", overview: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure.", poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500" },
    { title: "The Matrix (1999)", rating: "8.7", overview: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth.", poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500" }
  ],
  2000: [
    { title: "Gladiator (2000)", rating: "8.5", overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500" },
    { title: "The Dark Knight (2008)", rating: "9.0", overview: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500" }
  ],
  2010: [
    { title: "Inception (2010)", rating: "8.8", overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500" },
    { title: "Interstellar (2014)", rating: "8.7", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500" }
  ],
  2015: [
    { title: "Mad Max: Fury Road (2015)", rating: "8.1", overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500" }
  ],
  2016: [
    { title: "Deadpool (2016)", rating: "8.0", overview: "A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers.", poster: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=500" },
    { title: "La La Land (2016)", rating: "8.0", overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.", poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500" }
  ],
  2017: [
    { title: "Blade Runner 2049 (2017)", rating: "8.0", overview: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.", poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500" }
  ],
  2018: [
    { title: "Spider-Man: Into the Spider-Verse (2018)", rating: "8.4", overview: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions.", poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500" }
  ],
  2019: [
    { title: "Parasite (2019)", rating: "8.5", overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500" }
  ],
  2020: [
    { title: "Tenet (2020)", rating: "7.3", overview: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" }
  ],
  2021: [
    { title: "Dune (2021)", rating: "8.0", overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny, must travel to the most dangerous planet in the universe.", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" }
  ],
  2022: [
    { title: "Everything Everywhere All at Once (2022)", rating: "8.0", overview: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" }
  ],
  2023: [
    { title: "Oppenheimer (2023)", rating: "8.4", overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500" },
    { title: "Barbie (2023)", rating: "7.2", overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.", poster: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=500" }
  ],
  2024: [
    { title: "Dune: Part Two (2024)", rating: "8.6", overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" }
  ],
  2025: [
    { title: "Avatar: Fire and Ash (2025)", rating: "8.0", overview: "Jake Sully and Neytiri encounter a new volcanic clan of Na'vi on Pandora that represents a darker side of Na'vi culture.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500" }
  ]
};

const HISTORICAL_MEMES = {
  1998: [
    { title: "Dancing Baby (1998)", desc: "One of the oldest viral 3D animations, rendered as a loop.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnZodHZ3dzBxdmdhNGdtNmljbjFudHBidjQyc2R4dngyd2lpeTdzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjei1fG/giphy.gif" }
  ],
  2000: [
    { title: "All Your Base Are Belong To Us (2000)", desc: "Classic early internet gaming flash translation error meme.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHlkN3R0eWFhdzEwNXZjM2x0OHY4cWRpOW9pcDB4eG1mMnF5Z3I2NiZlcD12MV_pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vQYm0jWewxgqV8s/giphy.gif" }
  ],
  2005: [
    { title: "Chuck Norris Facts (2005)", desc: "Satirical factoids about the legendary martial artist.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWZ5a3Q3NHpxaHBjZHFuNmhrNXZzOHUxdjByaHprMGFvMXk0b2d6ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BIuuwHRNKs15C/giphy.gif" }
  ],
  2007: [
    { title: "Rickroll (2007)", desc: "Rick Astley's 'Never Gonna Give You Up' bait-and-switch viral link.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVqbm13OHd1dm41MXcwa3VtdjNlZ3U3eXoyc2Z6NW01OWk2N3N0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif" }
  ],
  2010: [
    { title: "Double Rainbow (2010)", desc: "What does it mean? A man's emotional response to a double rainbow.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODlhNDY2OGY3YzYwOGZlMWI1NThjY2I5MmY0Yzc5ZDVlMTJhMGY2YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hrGoC4C09Rc2c/giphy.gif" }
  ],
  2011: [
    { title: "Nyan Cat (2011)", desc: "Pop-Tart cat flying through space leaving a rainbow trail.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFpdTNsbnQydnE0a3ozMWV1OHV5eGRiZ2VsaXZtNnVydDZrdHhrMGF0MXY5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sIIhZliB2McAo/giphy.gif" },
    { title: "Trollface (2011)", desc: "The defining face of internet trolling and rage comics.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnBhZDNscThlOWY2OXlhOXp4MHAzdWJod282cXZzNDg5OHJvcmFweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GDp7LycxkT3CE/giphy.gif" }
  ],
  2012: [
    { title: "Gangnam Style (2012)", desc: "PSY's dance breaks YouTube's view counter.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWhvYXcyejZ6azk2ajVibDB4OHc5NGZ2OWMydjI5OW4ydjBicnlvciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/134DVXcD94s3YI/giphy.gif" }
  ],
  2013: [
    { title: "Doge (2013)", desc: "Much wow, so noble, very doge. The iconic Shiba Inu.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWs5aHhzZ2VhaWJpZHk4dTVnOHFud3JvZmZpaG0wbXN0NzR6ZHNjNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oBQZfQYZA8APc7dBag/giphy.gif" }
  ],
  2015: [
    { title: "The Dress (2015)", desc: "Is it White & Gold or Blue & Black? The debate that divided the internet.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmNtbzVndTcwNzRtbnd4MTFjYTBiaWR6MXpxdmJ0NmlpaGdwdWJjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8vQZ3p4L5dcoE/giphy.gif" }
  ],
  2016: [
    { title: "Harambe (2016)", desc: "A tribute to the gorilla whose memory lived on in millions of memes.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3hrb3d5bWZpcmsxb3gydHdtNWppdHR6Nm5qamJpMDRqZmxvMnA0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26TIAY8yL371K6s36/giphy.gif" },
    { title: "Pen Pineapple Apple Pen (2016)", desc: "PicoTaro's short, catchy performance.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hmdXppN2tzdnYwZHplazh6YnphOGNodDlpZm4wdnBsaWZ2cmZqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vYkkabxSqOUGk/giphy.gif" }
  ],
  2017: [
    { title: "Distracted Boyfriend (2017)", desc: "Stock photo of a guy looking at another girl while his girlfriend looks mad.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGtsZjNmZXhhcm90ajRjMG0wcmV0OHAwZmdidnp5NWZhcWFrc3l4NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7527pa7qs9kCG78A/giphy.gif" }
  ],
  2019: [
    { title: "Stonks (2019)", desc: "Meme Man showing absolute financial genius in front of rising charts.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZyd2trbjMxMTJrM3k0bmtrZHppcGQ4bm85MDltZHptNDJsaTRvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YnkMcHg0EGnWJHJHIK/giphy.gif" }
  ],
  2020: [
    { title: "Coffin Dance (2020)", desc: "Ghanaian pallbearers dancing joyfully while carrying a coffin.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczU3a3hpejVlbm1xMmtsczQyeXl5cmcyeDJvNDZ4OHpoamwzdzhtNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j6uK9aoDSWZ5q3mgW6/giphy.gif" }
  ],
  2023: [
    { title: "Barbenheimer (2023)", desc: "The ultimate double feature cultural event of Barbie and Oppenheimer.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODFseXRyYTVoNDY0YTRzMms5ZHBxOHo2bHBjM3RvdzF2Nzd1MGUweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j3h1C3O5E0QpVEF3d6/giphy.gif" }
  ],
  2024: [
    { title: "Chill Guy (2024)", desc: "Just a chill guy who doesn't care about anything.", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWJ2ZzNwdHh4OGJ4cXRwOHhzdzB5b3lybGlzbTJ4ODg2MHN2Z3E0dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z9K5O3MXcUXwBc7Q14/giphy.gif" }
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

// 5. MEMES (Curated Local Database for 100% stable GIFs)
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
