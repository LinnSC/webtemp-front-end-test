export default function Layout({ children }) {
  return (
    <>
      <div className="wrapper">
        <div className="container">{children}</div>
      </div>
    </>
  );
}
