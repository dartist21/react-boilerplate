import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withStyles';
import { compose } from 'recompose';

import Poster from '@/components/Poster';
import Icon from '@/components/Icon';

import styles from './styles.scss';

const MovieCard = ({ movie, ...rest }) => (
  <div className={styles.root} {...rest}>
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
    </div>
  </div>
);

MovieCard.propTypes = {
  children: PropTypes.node,
};

export default compose(withStyles(styles))(MovieCard);
