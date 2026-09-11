import OrderStats from "./OrderStats";
import OrderFilter from "./OrderFilter";
import OrderTable from "./OrderTable";
import PickupInfo from "./PickupInfo";

interface OrderHistoryProps {
  currentStatus: string;
}

export default function OrderHistory({ currentStatus }: OrderHistoryProps) {
  return (
    <>
      <OrderStats />
      <PickupInfo />
      <OrderFilter currentStatus={currentStatus} />
      <OrderTable currentStatus={currentStatus} />
    </>
  );
}
