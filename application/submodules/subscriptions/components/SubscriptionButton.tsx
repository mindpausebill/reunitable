interface SubscriptionButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick: () => void;
  classes?: string;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ isLoading, children, onClick, classes }) => {
  return (
    <button disabled={isLoading} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
