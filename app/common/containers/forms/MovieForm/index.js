import React from 'react';
import { compose, withPropsOnChange } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import Form, { FormRow } from '@/components/Form';
import FormField from '@/components/FormField';
import TextInput from '@/components/TextInput';
import TextareaInput from '@/components/TextareaInput';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';

import { reduxFormValidate } from 'react-nebo15-validate';

const MovieForm = ({ handleSubmit, t, isEdit }) => (
  <Form onSubmit={handleSubmit}>
    <FormRow label={t('Title')}>
      <Field component={FormField} inputComponent={TextInput} name="title" />
    </FormRow>
    <FormRow label={t('Poster url')}>
      <Field component={FormField} inputComponent={TextInput} name="poster" />
    </FormRow>
    <FormRow label={t('Description')}>
      <Field component={FormField} inputComponent={TextareaInput} name="description" />
    </FormRow>
    <FormRow label={t('Year')}>
      <Field component={FormField} inputComponent={TextInput} name="year" type="number" />
    </FormRow>
    <FormRow label={t('Director')}>
      <Field component={FormField} inputComponent={TextInput} name="director" />
    </FormRow>
    <FormRow>
      <Field component={Checkbox} name="is_favorite" />
    </FormRow>
    <FormRow>
      <Button type="submit">{isEdit ? t('Edit') : t('Create')}</Button>
    </FormRow>
  </Form>
);

export default compose(
  withPropsOnChange(['initialValues.id'], ({ initialValues = {} }) => ({
    isEdit: Boolean(initialValues.id),
  })),
  translate(),
  reduxForm({
    form: 'movie-form',
    initialValues: {
      is_favorite: false,
    },
    validate: reduxFormValidate({
      title: {
        required: true,
      },
      poster: {
        required: true,
        imageUrl: true,
      },
      description: {
        required: true,
      },
      year: {
        required: true,
        year: true,
      },
      director: {
        required: true,
      },
    }),
  })
)(MovieForm);
