import { ImSpinner11 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ImSpinner11
        size={40}
        className="animate-spin text-2xl text-orange-500"
      />
    </div>
  );
}
