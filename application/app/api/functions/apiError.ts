import { NextResponse } from 'next/server';

export const apiError = (status: number, error: string, description: string) => {
  return NextResponse.json({ error: error, description: description }, { status: status });
};
