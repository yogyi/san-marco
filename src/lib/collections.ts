export const COLLECTIONS = [
  {
    id: "venice",
    name: "Venice",
    label: "Venice",
    blurb: "Bold striped new arrivals for contemporary bedrooms.",
  },
  {
    id: "alberta",
    name: "Alberta",
    label: "Alberta",
    blurb: "Garden-inspired floral prints — soft, gift-ready, reversible.",
  },
  {
    id: "tiffany",
    name: "Tiffany",
    label: "Tiffany",
    blurb: "Two-tone solid colours for quiet, curated spaces.",
  },
] as const;

export type CollectionId = (typeof COLLECTIONS)[number]["id"];

export function normalizeCollectionParam(value?: string) {
  if (!value) return undefined;
  const id = value.toLowerCase();
  return COLLECTIONS.find((c) => c.id === id)?.id;
}

export function collectionDisplayName(id?: string) {
  const match = COLLECTIONS.find((c) => c.id === id?.toLowerCase());
  return match?.name;
}
