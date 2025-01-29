import { SchemasConfig } from '../types/Config/SchemasConfig';
import { SchemaConstraint } from '../types/SchemaConstraint';
import { SupabaseResource } from '../types/SupabaseResource';
import { SupabaseClient } from '@supabase/supabase-js';
import _ from 'lodash';

export const getResources = async (supabase: SupabaseClient, schemasConfig?: SchemasConfig) => {
  const resources: SupabaseResource[] = [];

  const { data: schemaData } = await supabase.rpc('get_schema_data');
  const uniqueSchemas = _.uniqBy(schemaData, 'self_schema');
  const uniqueSchemaNames = uniqueSchemas.map((schema: any) => schema?.self_schema);

  await Promise.all(
    uniqueSchemaNames.map(async (schema) => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        { headers: { 'Accept-Profile': schema } }
      );
      const schemaResources = await data.json();

      const supabaseDefinitions = schemaResources.definitions ?? {};
      const supabaseTables = Object.keys(supabaseDefinitions);

      const resourceObject = supabaseTables.forEach((tableName) => {
        const supabaseProperties = supabaseDefinitions[tableName].properties;
        const supabasePropertyNames = Object.keys(supabaseProperties);
        const thisResourceConstraints = (schemaData ?? []).filter(
          (constraint: SchemaConstraint) =>
            (constraint.self_schema === schema && constraint.self_table === tableName) ||
            (constraint.foreign_schema === schema && constraint.foreign_table === tableName)
        );
        const resourceConfig = schemasConfig?.[schema]?.resourcesConfig?.[tableName];

        resources.push({
          name: tableName,
          properties: supabasePropertyNames.map((supabasePropertyName) => {
            const propertyConfig = resourceConfig?.propertiesConfig?.[supabasePropertyName];
            return {
              name: supabasePropertyName,
              ...supabaseProperties[supabasePropertyName],
              format: propertyConfig?.isFile ? 'file' : supabaseProperties[supabasePropertyName]?.format,
              propertyConfig: propertyConfig
            };
          }),
          schema,
          constraints: thisResourceConstraints.map((constraint: SchemaConstraint) => ({
            ...constraint,
            self_columns: JSON.parse(constraint.self_columns ?? '[]'),
            foreign_columns: JSON.parse(constraint.foreign_columns ?? '[]')
          })),
          resourceConfig: resourceConfig
        });
      });

      return resourceObject;
    })
  );

  return resources;
};
