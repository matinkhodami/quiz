interface Props {
  children: React.ReactNode;
}
function Main({ children }: Props) {
  return <main className="w-full max-w-4xl mx-auto">{children}</main>;
}

export default Main;
