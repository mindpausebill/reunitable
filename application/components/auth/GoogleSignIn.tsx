export interface GoogleSignInProps {}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({}) => {
  return (
    <div className="p-6 border border-gray-300 bg-white rounded-md flex items-center gap-3">
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path
          fill="#4285F4"
          fillRule="evenodd"
          d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z"
          clipRule="evenodd"
        />
        <path
          fill="#34A853"
          fillRule="evenodd"
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
          clipRule="evenodd"
        />
        <path
          fill="#FBBC05"
          fillRule="evenodd"
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
          clipRule="evenodd"
        />
        <path
          fill="#EA4335"
          fillRule="evenodd"
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.462.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
          clipRule="evenodd"
        />
      </svg>
      <span className="leading-none">Sign in with Google</span>
    </div>
  );
};

export default GoogleSignIn;
