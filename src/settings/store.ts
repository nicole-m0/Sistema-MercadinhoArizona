// Dados públicos. Os valores herdados da demonstração ainda aguardam confirmação.
export const demonstrationStore = {
  name: 'Mercadinho Arizona',
  brandTitle: 'ARIZONA',
  brandSubtitle: 'MERCADINHO',
  location: 'Bairro Arizona, Oeiras – PI',
  city: 'Oeiras, PI',
  address: ['Rua 1, nº 31 • Bairro Arizona', 'Oeiras – Piauí'],
  hours: ['Segunda a sábado: 6h30 às 19h30', 'Domingo: 7h às 13h'],
  compactHours: 'Seg. a sáb. 6h30–19h30 • Dom. 7h–13h',
  instagram: 'https://www.instagram.com/mercadinhoarizona.oeiras/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rua+1+31+Bairro+Arizona+Oeiras+PI',
};

export type StoreSettings = typeof demonstrationStore;

// Editar somente após confirmação. Não habilita pedidos nem altera a demonstração.
export const commercialStore: StoreSettings & {confirmed: boolean; officialWhatsApp: string} = {
  ...demonstrationStore,
  address: [...demonstrationStore.address],
  hours: [...demonstrationStore.hours],
  confirmed: false,
  officialWhatsApp: '',
};
