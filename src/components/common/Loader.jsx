import { ProgressSpinner } from "primereact/progressspinner";

export default function Loader() {
  return (
    <div className="flex justify-content-center">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
}
