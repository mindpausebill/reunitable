import { createMixin } from 'schemix';

export default createMixin((location) => {
  location
    .float(`latitude`, { optional: true })
    .float(`longitude`, { optional: true })
    .json(`location`, { optional: true });
});
