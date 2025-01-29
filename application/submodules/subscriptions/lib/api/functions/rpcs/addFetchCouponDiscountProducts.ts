import { PrismaClient } from '@prisma/client';

export const addFetchCouponDiscountProducts = async (prismaClient: PrismaClient) => {
  const sql = `
        CREATE OR REPLACE function "public"."fetchCouponDiscountProducts"("couponIdToRetrieve" text)
        RETURNS table(
        "productId" text
        )
        AS $$
            #variable_conflict use_column
            BEGIN
                RETURN QUERY(
                    SELECT
                        "productId"
                    FROM
                        "StripeCouponProduct"
                    WHERE
                        "couponId" = "couponIdToRetrieve"
                );
            END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

  console.log('Creating fetchCouponDiscountProducts on public schema...');
  const fetchCouponDiscountProductsResult = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${fetchCouponDiscountProductsResult}`);
};
