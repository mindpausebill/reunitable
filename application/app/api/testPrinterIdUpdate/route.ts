import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const requestBody: { printerId: string; userId: string } = await request.json();

  const { error: adminError } = await createDangerousSupabaseServiceRoleClient<'public'>(
    'public'
  ).auth.admin.updateUserById(requestBody.userId, {
    user_metadata: {
      printerId: requestBody.printerId
    }
  });

  if (adminError) return new NextResponse('Failed to update admin user', { status: 500 });

  const { data: user } = await createDangerousSupabaseServiceRoleClient<'access'>('access')
    .from('User')
    .select('*')
    .eq('id', requestBody.userId)
    .single();

  if (!user) return new NextResponse(`No user exists with userId ${requestBody.userId}}`, { status: 400 });

  const { error: userUpdateError } = await createDangerousSupabaseServiceRoleClient<'access'>('access')
    .from('User')
    .update({
      metadata: {
        ...(user.metadata as Record<string, unknown>),
        printerId: requestBody.printerId
      }
    })
    .eq('id', requestBody.userId);

  if (userUpdateError) return new NextResponse('Failed to update access user', { status: 500 });

  return new NextResponse('Successfully updated user printerId', { status: 200 });
};
