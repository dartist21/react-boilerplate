import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { provideHooks } from 'redial';
import { translate } from 'react-i18next';
import { fetchMovie, deleteMovie } from '@/redux/data/movies';
import { fetchActors } from '@/redux/data/actors';
import { getMovie } from '@/reducers';

import Poster from '@/components/Poster';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

import withStyles from 'withStyles';
import styles from './styles.scss';

const MoviesDetailsPage = ({ movie = {}, t, movieId, handleDelete }) => (
  <div className={styles.root}>
    <div className={styles.poster}>
      <Poster src={movie.poster} title={movie.title} />
    </div>
    <div className={styles.content}>
      <div className={styles.title}>
        {movie.title}
        {movie.is_favorite && (
          <span className={styles.star}>
            <Icon name="star" />
          </span>
        )}
      </div>
      <div className={styles.info}>
        <p>{movie.year}</p>
        <p>{movie.description}</p>
        <p>Director: {movie.director}</p>
        <p>
          Actors:{' '}
          {movie.actors.length &&
            movie.actors.map((actor, i) => (
              <span key={actor.id}>
                <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                {i !== movie.actors.length - 1 && ', '}
              </span>
            ))}
        </p>
        <p>
          <Link to={`/movies/${movieId}/edit`}>{t('Edit movie')}</Link>
        </p>
        <p>
          <Link to="/movies">{t('Back to the list of movies')}</Link>
        </p>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleDelete} color="red">
          {t('Delete movie')}
        </Button>
      </div>
    </div>
  </div>
);

export default compose(
  withStyles(styles),
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, params, setProps }) =>
      Promise.all([dispatch(fetchMovie(params.id)), dispatch(fetchActors())]).then((response) => {
        setProps({
          movieId: response[0].payload.result,
        });
      }),
  }),
  connect(
    (state, ownProps) => ({
      movie: getMovie(state, ownProps.movieId),
    }),
    { deleteMovie }
  ),
  withHandlers({
    handleDelete: ({ movieId, deleteMovie, router }) => async () => {
      await deleteMovie(movieId);
      router.push('/movies');
    },
  })
)(MoviesDetailsPage);
