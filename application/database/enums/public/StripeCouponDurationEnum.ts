import { SCHEMA_NAME } from './_schemaName';
import { createEnum } from 'schemix';

export default createEnum((StripeCouponDurationEnum) => {
  StripeCouponDurationEnum.addValue('forever')
    .addValue('once')
    .addValue('repeating')
    .addValue(`@@schema("${SCHEMA_NAME}")`);
});
