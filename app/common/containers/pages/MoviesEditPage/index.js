import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import { updateMovie, fetchMovie } from '@/redux/data/movies';
import { getMovie } from '@/reducers';

import MovieForm from '@/containers/forms/MovieForm';

import withStyles from 'withStyles';
import styles from './styles.scss';

const MoviesEditPage = ({ onSubmit, movie, movieId, t }) => (
  <div className={styles.root}>
    <div className={styles.title}>{t('Edit movie')}</div>
    <p className={styles.back}>
      <Link to={`/movies/${movieId}`}>{t('Back to movie')}</Link>
    </p>
    <div className={styles.form}>
      <MovieForm onSubmit={onSubmit} initialValues={movie} />
    </div>
  </div>
);

export default compose(
  withStyles(styles),
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, params, setProps }) =>
      dispatch(fetchMovie(params.id)).then((response) => {
        setProps({
          movieId: response.payload.result,
        });
      }),
  }),
  connect(
    (state, ownProps) => ({
      movie: getMovie(state, ownProps.movieId),
    }),
    {
      updateMovie,
    }
  ),
  withHandlers({
    onSubmit: ({ updateMovie, router, movieId }) => async (movie) => {
      const response = await updateMovie(movieId, movie);
      router.push(`/movies/${response.payload.result}`);
    },
  })
)(MoviesEditPage);
