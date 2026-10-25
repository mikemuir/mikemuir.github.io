/** MuirSandwich-specific settings layered on top of AstroPaper. */

export const ETSY_URL = "https://www.etsy.com/shop/MuirSandwich";

/** Project sections, in display order. A section only renders once it has a published project. */
export const PROJECT_SECTIONS = [
  {
    id: "3d-printing",
    title: "3D Printing",
    blurb: "Voron and Neptune builds, Klipper configs, and functional parts.",
    link: { label: "Shop the VKB mounts on Etsy", url: ETSY_URL },
  },
  {
    id: "drone-mapping",
    title: "Drone Mapping",
    blurb: "Repeat yard surveys with a DJI Mini 5 Pro, Litchi, and WebODM.",
  },
  {
    id: "homelab",
    title: "Homelab",
    blurb: "Proxmox, k3s with GitOps, Synology, and self-hosted services.",
  },
  {
    id: "mesh-networking",
    title: "Mesh Networking",
    blurb: "LoRa experiments with MeshCore and Reticulum.",
  },
] as const;

export type ProjectSectionId = (typeof PROJECT_SECTIONS)[number]["id"];
export const PROJECT_SECTION_IDS = PROJECT_SECTIONS.map(s => s.id) as [
  ProjectSectionId,
  ...ProjectSectionId[],
];
