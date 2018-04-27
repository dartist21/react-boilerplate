import Express from 'express';
import uuid from 'uuid/v4';
import { find, findIndex, omit } from 'lodash';

const router = new Express.Router();
router.use(Express.json());

const actors = [
  {
    id: 1,
    name: 'Thomas Steven Middleditch',
    born: 'March 10, 1982',
    description: 'Canadian actor and television writer.',
  },
  {
    id: 2,
    name: 'Zach Woods',
    born: 'September 25, 1984',
    description: 'American actor and comedian.',
  },
  {
    id: 3,
    name: 'Todd Joseph Miller',
    born: 'June 4, 1981',
    description: ' American actor, stand-up comedian, producer, and writer.',
  },
];

let movies = [
  {
    id: uuid(),
    title: 'The Shawshank Redemption',
    year: 1994,
    poster:
      'https://ia.media-imdb.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    director: 'Frank Darabont',
    genres: ['Crime', 'Drama'],
    is_favorite: false,
    actors: [1, 2],
  },
  {
    id: uuid(),
    title: 'The Godfather',
    year: 1972,
    poster:
      'https://ia.media-imdb.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    director: 'Francis Ford Coppola',
    genres: ['Crime', 'Drama'],
    is_favorite: false,
    actors: [2, 3],
  },
  {
    id: uuid(),
    title: 'The Dark Knight',
    year: 2008,
    poster:
      'https://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    description:
      'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
    genres: ['Action', 'Crime', 'Drama'],
    is_favorite: true,
    actors: [3],
  },
];

router.get('/actors', (req, res) => {
  res.json({
    data: actors,
  });
});

router.get('/actors/:id', (req, res) => {
  const actor = find(actors, { id: Number(req.params.id) });
  if (!actor) {
    return res.sendStatus(404);
  }
  return res.json({
    data: actor,
  });
});

router.get('/movies', (req, res) => {
  res.json({
    data: movies,
  });
});

router.post('/movies', (req, res) => {
  const newMovie = {
    ...req.body.movie,
    id: uuid(),
  };
  movies.push(newMovie);

  res.json({
    data: newMovie,
  });
});

router.get('/movies/:id', (req, res) => {
  const movie = find(movies, { id: req.params.id });
  if (!movie) {
    return res.sendStatus(404);
  }
  return res.json({
    data: movie,
  });
});

router.put('/movies/:id', (req, res) => {
  const movieIndex = findIndex(movies, { id: req.params.id });

  if (movieIndex === -1) {
    return res.sendStatus(404);
  }

  const updatedMovie = omit(req.body.movie, ['id']);
  movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };

  return res.json({
    data: movies[movieIndex],
  });
});

router.delete('/movies/:id', (req, res) => {
  const movie = find(movies, { id: req.params.id });
  if (!movie) {
    return res.sendStatus(404);
  }
  movies = movies.filter(i => i.id !== req.params.id);
  return res.json({
    data: movies,
  });
});

export default router;
