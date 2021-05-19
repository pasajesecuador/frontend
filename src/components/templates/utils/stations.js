export const Stations = (params) => {
  const city = params;
  switch (city) {
    case 'QUITO':
      return 'Terminal Quitumbe';
    case 'MANTA':
      return 'Terminal Luis Valdiviezo Morán';
    default:
      return `Terminal ${city}`
  }
}