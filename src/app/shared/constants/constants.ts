import { OrderTypes } from '../models/shared.model';

export const REGEX_PATTERN = {
  email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
};

export const SORTING_OPTIONS = [
  OrderTypes.ascending,
  OrderTypes.descending,
  undefined,
];

export const REGEX_PATTERNS = {
  email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  mobile: '[6789][0-9]{9}',
  decimal: '^\\d{1,2}(.\\d{1,2})?$',
};
