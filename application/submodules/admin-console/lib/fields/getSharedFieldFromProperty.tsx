import { BooleanField, DateField, ReferenceField, TextField } from 'react-admin';
import { RelationStyle } from '../../types/Config/RelationStyle';
import { Property } from '../../types/Property';
import { SupabaseResource } from '../../types/SupabaseResource';
import { getRelationField } from './getRelationField';
import { FileFieldWithPreview } from './FileFieldWithPreview';
import { getDefaultRelationStyle } from '../getDefaultRelationStyle';
import NullableJSONField from './CheckEmptyJson';

export const getSharedFieldFromProperty = (property: Property, resource: SupabaseResource, screen: string) => {
  // Handle the case where the property is a foreign key (eg, createdById - go and fetch the name of the relation)

  const outgoingFKConstraint = (resource?.constraints ?? []).find(
    (c) =>
      c.constraint_type === 'f' &&
      c.self_table === resource.name &&
      c.self_schema === resource.schema &&
      c.self_columns[0] === property.name
  );
  if (outgoingFKConstraint && outgoingFKConstraint.foreign_table) {
    return (
      <ReferenceField
        key={property.name}
        label={property.name}
        source={property.name}
        reference={outgoingFKConstraint.foreign_table}
        link="show"
      />
    );
  }
  // Handle relations
  const relation = resource?.resourceConfig?.relations?.[property.name];
  const relationStyle = relation?.styles?.[screen] ?? getDefaultRelationStyle(screen);
  if (relation && relationStyle !== RelationStyle.Hidden) {
    return getRelationField(property, relation, screen);
  }
  if (property.format === 'file') {
    return <FileFieldWithPreview property={property} />;
  }
  if (property.format === 'jsonb') {
    return <NullableJSONField source={property.name} />;
  }
  if (property.format === 'date') {
    return <DateField source={property.name} label={property.name} />;
  }
  if (property.format.includes('stamp')) {
    return <DateField source={property.name} label={property.name} showTime />;
  }
  if (property.format === 'boolean') {
    return <BooleanField source={property.name} label={property.name} />;
  }
  return <TextField key={property.name} source={property.name} />;
};
