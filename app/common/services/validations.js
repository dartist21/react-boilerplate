import { addValidation } from 'react-nebo15-validate';

addValidation('imageUrl', (value) => {
  const PATTERNS_IMAGE_URL = /(http(s?):)(.*)\.(?:jpg|gif|png)/i;
  return PATTERNS_IMAGE_URL.test(value);
});

addValidation(
  'year',
  value => !isNaN(Number(value)) && (value.length === 4) & (value <= new Date().getFullYear())
);
