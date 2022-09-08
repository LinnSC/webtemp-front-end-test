export default function Layout({ children }) {
  return (
    <>
      <div className="flex justify-content-center">
        <div>{children}</div>
      </div>
    </>
  );
}
