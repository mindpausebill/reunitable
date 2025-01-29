import { adminConsoleAPISendMagicLink } from '@/submodules/admin-console/lib/auth/adminConsoleAPISendMagicLink';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const requestBody = await request.json();
  return await adminConsoleAPISendMagicLink(requestBody);
};
