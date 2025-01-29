interface AccountCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const AccountCard: React.FC<AccountCardProps> = ({ title, description, footer, children }) => {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-zinc-300 text-2xl flex w-full justify-center">{description}</p>
        {children}
      </div>
      <div className="flex w-full border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">{footer}</div>
    </div>
  );
};
