export type CheckAvailabilityResponse = {
  isTaken: boolean;
  ethscription: {
    current_owner: string;
    transaction_hash: string;
  } | null;
}
