import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withStyles';
import { compose, withProps, pure } from 'recompose';
import { translate } from 'react-i18next';

import ErrorMessages from '@/components/ErrorMessages';
import styles from './styles.scss';

const FormField = ({ t, input, meta, showError, inputComponent: InputComponent }) => (
  <div>
    <div>
      <InputComponent {...input} />
      <label className={styles.label} htmlFor={input.name}>
        {input.value ? t('Remove from favorite') : t('Add to favorite')}
      </label>
    </div>
    {showError && (
      <div>
        <ErrorMessages error={meta.error} />
      </div>
    )}
  </div>
);

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  inputComponent: PropTypes.func.isRequired,
  showError: PropTypes.bool,
};

export default compose(
  translate(),
  withStyles(styles),
  withProps(({ meta }) => ({
    showError: !!((meta.submitFailed || (meta.touched && !meta.active)) && meta.error),
  })),
  pure
)(FormField);
