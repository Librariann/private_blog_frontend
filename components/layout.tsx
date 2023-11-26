type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <div className="p-0 font-sans">{children}</div>
    </>
  );
}

export default Layout;
