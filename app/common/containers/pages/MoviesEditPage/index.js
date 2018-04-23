import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';

const MoviesEditPage = () => <div>MoviesEditPage</div>;

export default compose(translate(), withRouter)(MoviesEditPage);
