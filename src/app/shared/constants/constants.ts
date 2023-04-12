import { OrderTypes } from '../models/shared.model';

export const REGEX_PATTERN = {
  email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
};

export const SORTING_OPTIONS = [
  OrderTypes.ascending,
  OrderTypes.descending,
  undefined,
];
