"use client";

import { useSupabase } from "./SupabaseProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface WaitForSessionProps {
	redirectUrl: string;
	setError?: (error: string) => void;
}

export const WaitForSession: React.FC<WaitForSessionProps> = ({
	redirectUrl,
	setError,
}) => {
	const { replace } = useRouter();
	const { session, supabase } = useSupabase();

	if (session) {
		replace(redirectUrl);
	}

	useEffect(() => {
		const setAuth = async () => {
			if (typeof window !== "undefined") {
				const hashParams = new URLSearchParams(
					window.location.hash.substring(1),
				);
				const access_token = hashParams.get("access_token");
				const refresh_token = hashParams.get("refresh_token");

				if (access_token && refresh_token) {
					const { error } = await supabase.auth.setSession({
						access_token,
						refresh_token,
					});

					if (error) {
						setError?.(`An error occurred setting session: ${error}`);
					} else {
						replace(redirectUrl);
					}
				}
			}
		};

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (session) replace(redirectUrl);
		});

		setAuth();

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, redirectUrl, replace, setError]);

	return null;
};
