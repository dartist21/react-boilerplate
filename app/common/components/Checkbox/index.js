import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withStyles';
import { compose } from 'recompose';
import { translate } from 'react-i18next';

import styles from './styles.scss';

const Checkbox = ({ t, input }) => (
  <div>
    <input
      type="checkbox"
      className={styles.checkbox}
      id={input.name}
      checked={input.value}
      {...input}
    />
    <label className={styles.label} htmlFor={input.name}>
      {input.value ? t('Remove from favorite') : t('Add to favorite')}
    </label>
  </div>
);

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
};

export default compose(translate(), withStyles(styles))(Checkbox);
