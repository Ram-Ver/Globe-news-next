export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner">
        <div className="spinner-border"></div>
      </div>
    </div>
  );
}
