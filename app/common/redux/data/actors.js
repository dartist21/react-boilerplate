import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from '@/config';
import { normalize } from 'normalizr';
import { createUrl } from '@/helpers/url';
import { actor } from '@/schemas';
import { invoke } from '@/redux/api';

export const fetchActors = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/actors`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'actors/FETCH_LIST_REQUEST',
      {
        type: 'actors/FETCH_LIST_SUCCESS',
        payload: (action, state, res) => res.json().then(json => normalize(json.data, [actor])),
      },
      'actors/FETCH_LIST_FAILURE',
    ],
  });

export const fetchActor = (actorId, options) =>
  invoke({
    endpoint: createUrl(`${API_URL}/actors/${actorId}`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'actors/FETCH_DETAILS_REQUEST',
      {
        type: 'actors/FETCH_DETAILS_SUCCESS',
        payload: (action, state, res) => res.json().then(json => normalize(json.data, actor)),
      },
      'actors/FETCH_DETAILS_FAILURE',
    ],
  });

export default handleAction(
  combineActions('actors/FETCH_LIST_SUCCESS', 'actors/FETCH_DETAILS_SUCCESS'),
  (state, action) => ({
    ...state,
    ...action.payload.entities.actors,
  }),
  {}
);
