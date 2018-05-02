import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { fetchActors } from '@/redux/data/actors';
import { getActors } from '@/reducers';
import { translate } from 'react-i18next';

import Button from '@/components/Button';
import withStyles from 'withStyles';

import styles from './styles.scss';

const ActorsListPage = ({ actors, t }) => (
  <div className={styles.root}>
    {actors.map(actor => (
      <div className={styles.item} key={actor.id}>
        {actor.name}
      </div>
    ))}

    <div className={styles.action}>
      <Button to="/actors/create">{t('Add new actor')}</Button>
    </div>
  </div>
);

export default compose(
  withStyles(styles),
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, setProps }) =>
      dispatch(fetchActors()).then((response) => {
        setProps({ actorIds: response.payload.result });
      }),
  }),
  connect((state, ownProps) => ({
    actors: getActors(state, ownProps.actorIds || []),
  }))
)(ActorsListPage);
