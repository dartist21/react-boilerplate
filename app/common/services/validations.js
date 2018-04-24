import { addValidation } from 'react-nebo15-validate';

addValidation('imageUrl', (v) => {
  const PATTERNS_IMAGE_URL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  return PATTERNS_IMAGE_URL.test(v);
});
