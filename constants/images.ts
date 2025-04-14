export type KorriganName =
  | 'korry_gan'
  | 'queen_aman'
  | 'poudredesscampec'
  | 'rouledepecs'
  | 'captain_o_ssec'
  | 'barbobec'
  | 'selfie'
  | 'beursalec'
  | 'kronomec'
  | 'panosolec'
  | 'marin_d_odouss'
  | 'cromatik'
  | 'epidanlbec'
  | 'pluzinkopec'
  | 'darkann';

export const macarons: Record<KorriganName, any>  = {
    korry_gan: require('../assets/images/korrigans/korry_gan_macaron.png'),
    queen_aman: require('../assets/images/korrigans/queen_aman_macaron.png'),
    poudredesscampec: require('../assets/images/korrigans/poudredesscampec_macaron.png'),
    rouledepecs: require('../assets/images/korrigans/rouledepecs_macaron.png'),
    captain_o_ssec: require('../assets/images/korrigans/captain_o_ssec_macaron.png'),
    barbobec: require('../assets/images/korrigans/barbobec_macaron.png'),
    selfie: require('../assets/images/korrigans/selfie_macaron.png'),
    beursalec: require('../assets/images/korrigans/beursalec_macaron.png'),
    kronomec: require('../assets/images/korrigans/kronomec_macaron.png'),
    panosolec: require('../assets/images/korrigans/panosolec_macaron.png'),
    marin_d_odouss: require('../assets/images/korrigans/marin_d_odouss_macaron.png'),
    cromatik: require('../assets/images/korrigans/cromatik_macaron.png'),
    epidanlbec: require('../assets/images/korrigans/epidanlbec_macaron.png'),
    pluzinkopec: require('../assets/images/korrigans/pluzinkopec_macaron.png'),
    darkann: require('../assets/images/korrigans/darkann_macaron.png'),
}

export const iskorriganName = (name: string): name is KorriganName => {
    return name in macarons;
};
