export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  );
}