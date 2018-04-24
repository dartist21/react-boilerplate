import { addValidation } from 'react-nebo15-validate';

addValidation('imageUrl', (value) => {
  const PATTERNS_IMAGE_URL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  return PATTERNS_IMAGE_URL.test(value);
});

addValidation('year', value => !isNaN(Number(value)) && value <= new Date().getFullYear());
