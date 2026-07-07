---
name: digital_time_machine_apis
description: "Guidelines for querying the Digital Time Machine APIs (Frankfurter, TMDB, Guardian, iTunes) and handling fallback mock generation."
---

# Digital Time Machine APIs & Data Integration Guidelines

This skill guides data fetching, query formatting, and mock data generation.

## Supported APIs

### 1. Exchange Rates (Frankfurter API)
- **Host**: `https://api.frankfurter.app`
- **Method**: `GET /<date>?from=<base>&to=<symbols>`
- **Example**: `https://api.frankfurter.app/2016-05-12?from=USD&to=EUR,UAH,PLN,GBP`
- **CORS**: Supported out of the box, no API keys needed.
- **Data Range**: Historical data back to Jan 4, 1999.

### 2. Movies (TMDB API)
- **Endpoint**: `https://api.themoviedb.org/3/discover/movie`
- **Parameters**:
  - `api_key`: User provided key (fallback to mock if empty)
  - `primary_release_date.lte`: selected date (e.g., `2016-05-12`)
  - `primary_release_date.gte`: selected date minus 60 days
  - `sort_by`: `popularity.desc`
  - `language`: `uk-UA` or `en-US`
- **Fallback**: Generates blockbusters based on the year (e.g., *Avatar* in 2009, *Deadpool* or *Captain America: Civil War* in May 2016, etc.) using a year-matching lookup table.

### 3. Top News (The Guardian API)
- **Endpoint**: `https://content.guardianapis.com/search`
- **Parameters**:
  - `api-key`: User provided key (fallback to mock if empty)
  - `from-date`: selected date
  - `to-date`: selected date
  - `order-by`: `relevance` or `oldest`
  - `page-size`: 10
- **Fallback**: Generates headlines of actual historical events from a lookup table (e.g., Brexit, US Elections, iPhone launch, COVID-19, etc.).

### 4. Popular Songs (iTunes Search API)
- **Endpoint**: `https://itunes.apple.com/search`
- **Parameters**:
  - `term`: Year/Month query (e.g., `"2016 top hits"`)
  - `media`: `music`
  - `limit`: 15
- **CORS**: iTunes API does not block cross-origin requests.

### 5. Memes & YouTube Trends
- **Strategy**: Because direct daily historical APIs for memes and YouTube do not exist, use a robust year-based mapping of cult cultural moments:
  - **2010-2012**: Trollface, Nyan Cat, Double Rainbow, Gangnam Style, Rebecca Black's Friday.
  - **2013-2015**: Doge, Harlem Shake, What Does the Fox Say, Ice Bucket Challenge, Left Shark.
  - **2016-2018**: Harambe, PPAP, Distracted Boyfriend, Despacito, Tide Pods, Drake Hotline Bling.
  - **2019-2021**: Stonks, Area 51, Bernie Sanders Mittens, Rickroll resurgence, Squid Game.
  - **2022-2025**: Barbenheimer, Grimace Shake, Pedro Raccoon, Skibidi Toilet, Chill Guy.
