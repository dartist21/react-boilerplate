import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withStyles';
import { compose } from 'recompose';

import styles from './styles.scss';

const Checkbox = ({ name, value, ...rest }) => (
  <input type="checkbox" className={styles.checkbox} id={name} checked={value} {...rest} />
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

export default compose(withStyles(styles))(Checkbox);
