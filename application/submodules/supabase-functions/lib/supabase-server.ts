import { Database } from '@/types/supabase';
import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestMaybeSingleResponse, PostgrestResponse, PostgrestSingleResponse } from '@supabase/postgrest-js';
import { cookies } from 'next/headers';
import { use } from 'react';
import { SupabaseSchemaType } from '../types/supabaseSchemaType';

export type AnyPostgrestResponse<Result> =
  | PostgrestSingleResponse<Result>
  | PostgrestMaybeSingleResponse<Result>
  | PostgrestResponse<Result>;

export const createSupabaseServerClient = <T extends SupabaseSchemaType>(schema: T) => {
  return createServerComponentClient<Database, T>(
    {
      cookies
    },
    {
      options: {
        db: {
          schema: schema
        }
      }
    }
  );
};

export const createSupabaseRouteHandlerClient = <T extends SupabaseSchemaType>(schema: T) => {
  return createRouteHandlerClient<Database, T>(
    {
      cookies
    },
    {
      options: {
        db: {
          schema: schema
        }
      }
    }
  );
};

export const useServerSupabaseSession = () => {
  const fetchSession = async () => {
    const accessSupabase = createSupabaseServerClient<'public'>('public');
    const { data: sessionRes } = await accessSupabase.auth.getSession();
    return sessionRes?.session;
  };
  return use(fetchSession());
};

export const useServerSupabaseData = <Result>(query: PromiseLike<PostgrestResponse<Result>>) => {
  const fetchData = async () => {
    return await query;
  };
  return use(fetchData());
};
