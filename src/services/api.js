const GIPHY_PUBLIC_KEY = 'dc6zaTOxFJmzC';

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

// 3. MOVIES (iTunes Search API - Free, Keyless, media=movie / Overrides to TMDB if key provided)
export const fetchMovies = async (year, dateString = '') => {
  const { tmdb: apiKey } = getApiKeys();
  if (apiKey) {
    try {
      const dateGTEObj = new Date(dateString || `${year}-01-01`);
      dateGTEObj.setDate(dateGTEObj.getDate() - 60);
      const dateGTE = dateGTEObj.toISOString().split('T')[0];
      const dateLTE = dateString || `${year}-12-31`;

      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${dateGTE}&primary_release_date.lte=${dateLTE}&sort_by=popularity.desc&page=1`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results.slice(0, 3).map(movie => ({
            title: movie.title,
            rating: movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : 'PG-13',
            overview: movie.overview || 'Опис фільму відсутній.',
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
            previewUrl: '' 
          }));
        }
      }
    } catch (e) {
      console.warn("TMDB fetch failed, falling back to iTunes:", e);
    }
  }

  // Keyless iTunes fallback
  try {
    const response = await fetch(`https://itunes.apple.com/search?term=${year}&media=movie&limit=5`);
    if (!response.ok) throw new Error('iTunes Movie Search failed');
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results.slice(0, 3).map((movie, index) => {
        const rating = movie.contentAdvisoryRating || 'PG-13';
        return {
          title: movie.trackName,
          rating: rating,
          overview: movie.longDescription || movie.shortDescription || 'Опис фільму відсутній.',
          poster: movie.artworkUrl100?.replace('100x100bb', '600x600bb') || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
          previewUrl: movie.previewUrl 
        };
      });
    }
    throw new Error('No movies found on iTunes');
  } catch (error) {
    console.error('iTunes Movie error, using fallback:', error);
    return [
      { title: `Epic Film of ${year}`, rating: "R", overview: `The greatest hit of ${year} that defined a generation. Blockbuster release that swept the box offices global charts.`, poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500" }
    ];
  }
};

// 4. TOP HISTORICAL EVENTS (Wikimedia "On This Day" API - Free, Keyless / Overrides to Guardian if key provided)
export const fetchNews = async (dateString, targetYear) => {
  const { guardian: apiKey } = getApiKeys();
  if (apiKey) {
    try {
      const url = `https://content.guardianapis.com/search?api-key=${apiKey}&from-date=${dateString}&to-date=${dateString}&page-size=5`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.response?.results && data.response.results.length > 0) {
          return data.response.results.map(article => ({
            title: article.webTitle,
            date: new Date(article.webPublicationDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' }),
            desc: `Розділ: ${article.sectionName.toUpperCase()}`,
            link: article.webUrl
          }));
        }
      }
    } catch (e) {
      console.warn("Guardian fetch failed, falling back to Wikimedia:", e);
    }
  }

  // Keyless Wikimedia fallback
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

// 5. MEMES (Giphy Search API - Keyless via public dev key)
export const fetchMemes = async (year) => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_PUBLIC_KEY}&q=${year}+meme&limit=3&rating=g`);
    if (!response.ok) throw new Error('Giphy Search failed');
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data.slice(0, 2).map((item, idx) => ({
        title: item.title ? item.title.replace(' GIF', '') : `Епічний мем ${year} року`,
        desc: `Популярна вірусна гіфка з архівів інтернету ${year} року.`,
        image: item.images?.original?.url || item.images?.downsized_medium?.url || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'
      }));
    }
    throw new Error('No Giphy memes found');
  } catch (error) {
    console.error('Giphy API error, using static fallback:', error);
    return [
      { title: `Classic Meme of ${year}`, desc: "Viral humor from the vaults of Reddit and Tumblr.", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500" }
    ];
  }
};

// 6. YOUTUBE TRENDS (Invidious Search API - Free, Keyless YouTube Mirror)
export const fetchYoutube = async (year) => {
  const invidiousInstances = [
    'https://yewtu.be',
    'https://invidious.flokinet.to',
    'https://invidious.projectsegfau.lt',
    'https://iv.melmac.space'
  ];

  // Attempt connection to instances sequentially (redundant fallbacks for high availability)
  for (const instance of invidiousInstances) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout per instance

      const response = await fetch(`${instance}/api/v1/search?q=${year}+viral+video&type=video`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) continue;
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        return data.slice(0, 2).map(video => {
          const views = video.viewCount 
            ? (video.viewCount >= 1e6 
                ? `${(video.viewCount / 1e6).toFixed(1)}M` 
                : `${(video.viewCount / 1e3).toFixed(0)}K`)
            : 'N/A';
          return {
            title: video.title,
            channel: video.author,
            views: views,
            desc: video.description || `Відеоролик, що розлетівся мережею у ${year} році.`,
            link: `https://www.youtube.com/watch?v=${video.videoId}`
          };
        });
      }
    } catch (err) {
      console.warn(`Invidious instance ${instance} failed. Trying next...`);
    }
  }

  // Final hardcoded YouTube search link fallback
  return [
    {
      title: `Popular YouTube Videos from ${year}`,
      channel: "Web Archives",
      views: "Multi-Million",
      desc: `Вірусні хіти, огляди та відеоблоги, що формували культуру YouTube у ${year} році.`,
      link: `https://www.youtube.com/results?search_query=${year}+viral+video`
    }
  ];
};

// -------------------------------------------------------------
// MASTER FETCH FUNCTION
// -------------------------------------------------------------
export const fetchAllTimeMachineData = async (dateString) => {
  const year = new Date(dateString).getFullYear();

  // Run all async network queries concurrently
  const [ratesData, songsData, moviesData, newsData, memesData, youtubeData] = await Promise.all([
    fetchRates(dateString),
    fetchSongs(year),
    fetchMovies(year, dateString),
    fetchNews(dateString, year),
    fetchMemes(year),
    fetchYoutube(year)
  ]);

  return {
    rates: ratesData,
    songs: songsData,
    movies: moviesData,
    news: newsData,
    memes: memesData,
    youtube: youtubeData
  };
};
