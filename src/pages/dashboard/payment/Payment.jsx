import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Payment = () => {
  const { data } = useQuery({
    queryKey: ["client_id"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/config/paypal`
      );
      console.log({ data });
      return data;
    },
  });
  console.log(data);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Payment;
