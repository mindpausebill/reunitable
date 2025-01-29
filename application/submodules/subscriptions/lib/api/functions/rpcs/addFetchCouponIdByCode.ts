import { PrismaClient } from '@prisma/client';

export const addFetchCouponIdByCode = async (prismaClient: PrismaClient) => {
  const sql = `
        CREATE OR REPLACE FUNCTION "fetchCouponIdByCode"("codeToRetrieve" text)
        RETURNS table(
            "code" "StripePromotionCode"."code"%TYPE,
            "couponId" "StripePromotionCode"."couponId"%TYPE
        )
        AS $$
            #variable_conflict use_column
            BEGIN
                RETURN QUERY (
                    SELECT
                        "code",
                        "couponId"
                    FROM
                        "StripePromotionCode"
                    WHERE
                        "code" = "codeToRetrieve" AND
                        (
                            "userId" IS null
                            OR
                            "userId" = auth.uid()
                        ) AND
                        "active" = true
                );
            END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

  console.log('Creating fetchCouponIdByCode on public schema...');
  const fetchCouponIdByCodeResult = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${fetchCouponIdByCodeResult}`);
};
