function HeaderPanel({ name, children }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-5">
      <h3 className="mb-0">{name}</h3>
      {children}
    </div>
  );
}
export default HeaderPanel;
