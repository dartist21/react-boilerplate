import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { provideHooks } from 'redial';
import { translate } from 'react-i18next';
import { fetchActor } from '@/redux/data/actors';
import { getActor } from '@/reducers';

import withStyles from 'withStyles';
import styles from './styles.scss';

const ActorsDetailsPage = ({ actor = {}, t }) => (
  <div className={styles.root}>
    <h1 className={styles.name}>{actor.name}</h1>

    <div className={styles.info}>
      <p>born {actor.born}</p>
      <p>{actor.description}</p>
    </div>

    <div className={styles.links}>
      <p>
        <Link to="/actors">{t('Go to the list of actors')}</Link>
      </p>
    </div>
  </div>
);

export default compose(
  withStyles(styles),
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, params, setProps }) =>
      dispatch(fetchActor(params.id)).then((response) => {
        setProps({
          actorId: response.payload.result,
        });
      }),
  }),
  connect((state, ownProps) => ({
    actor: getActor(state, ownProps.actorId),
  }))
)(ActorsDetailsPage);
