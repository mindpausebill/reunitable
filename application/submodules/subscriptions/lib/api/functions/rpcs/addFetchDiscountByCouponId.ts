import { PrismaClient } from '@prisma/client';

export const addFetchDiscountByCouponId = async (prismaClient: PrismaClient) => {
  const sql = `
        CREATE OR REPLACE function "public"."fetchDiscountByCouponId"("couponIdToFetch" text)
        RETURNS table(
            "amountOff" "StripeCoupon"."amountOff"%TYPE,
            "percentOff" "StripeCoupon"."percentOff"%TYPE
        )
        AS $$
            #variable_conflict use_column
            BEGIN
                RETURN QUERY(
                    SELECT
                        "amountOff",
                        "percentOff"
                    FROM
                        "StripeCoupon"
                    WHERE
                        "couponId" = "couponIdToFetch"
                );
            END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

  console.log('Creating fetchDiscountByCouponId on public schema...');
  const fetchDiscountByCouponIdResult = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${fetchDiscountByCouponIdResult}`);
};
