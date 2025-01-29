import { adminConsoleAPIInviteUserByEmails } from '@/submodules/admin-console/lib/auth/adminConsoleInviteUserByEmail';
import { NextRequest } from 'next/server';

export const revalidate = 0;

export const POST = async (request: NextRequest) => {
  const requestBody = await request.json();
  return await adminConsoleAPIInviteUserByEmails(requestBody);
};
