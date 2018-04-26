import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './index';

storiesOf('components/Checkbox', module)
  .add('General', () => <Checkbox />)
  .add('Checked', () => <Checkbox value />);
