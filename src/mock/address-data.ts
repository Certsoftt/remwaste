export type AddressSuggestion = {
  id: string;
  street: string;
  city: string;
  postcode: string;
  results: number;
};

export const addressSuggestions: AddressSuggestion[] = [
  {
    id: "1",
    street: "Hatchford Park Ockham Lane",
    city: "Cobham",
    postcode: "KT11 1LR",
    results: 3,
  },
  {
    id: "2",
    street: "Half Moon Yard 63 Portsmouth Road",
    city: "Cobham",
    postcode: "KT11 1JQ",
    results: 6,
  },
  {
    id: "3",
    street: "Hillcrest Place",
    city: "Kilwinning",
    postcode: "KA13",
    results: 13,
  },
  {
    id: "4",
    street: "Highburrow Close",
    city: "Scorrier Redruth",
    postcode: "TR16 5FB",
    results: 13,
  },
  {
    id: "5",
    street: "Hampton Court Road",
    city: "East Molesey",
    postcode: "KT8 9BN",
    results: 8,
  },
  {
    id: "6",
    street: "Heathfield Gardens",
    city: "Robertsbridge",
    postcode: "TN32 5BA",
    results: 4,
  },
];
