import { LoadingScreen } from "./LoadingScreen";
import { WaitForSession } from "./WaitForSession";

interface AuthenticationBufferProps {
	redirectUrl: string;
	customLoadingComponent?: React.ReactNode;
	setError?: (error: string) => void;
}

export const AuthenticationBuffer: React.FC<AuthenticationBufferProps> = ({
	redirectUrl,
	customLoadingComponent,
	setError,
}) => {
	return (
		<>
			{customLoadingComponent && customLoadingComponent}
			{!customLoadingComponent && <LoadingScreen />}
			<WaitForSession redirectUrl={redirectUrl} setError={setError} />
		</>
	);
};
