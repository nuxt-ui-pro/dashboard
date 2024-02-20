const members = [{
  name: 'Anthony Fu',
  username: 'antfu',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' }
}, {
  name: 'Sébastien Chopin',
  username: 'Atinux',
  role: 'owner',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux' }
}, {
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/benjamincanac' }
}, {
  name: 'Céline Dumerc',
  username: 'celinedumerc',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/celinedumerc' }
}, {
  name: 'Daniel Roe',
  username: 'danielroe',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' }
}, {
  name: 'Farnabaz',
  username: 'farnabaz',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/farnabaz' }
}, {
  name: 'Ferdinand Coumau',
  username: 'FerdinandCoumau',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/FerdinandCoumau' }
}, {
  name: 'Florent Delerue',
  username: 'Flosciante',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/Flosciante' }
}, {
  name: 'Baptiste Leproux',
  username: 'larbish',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/larbish' }
}, {
  name: 'Pooya Parsa',
  username: 'pi0',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' }
}, {
  name: 'Sarah Moriceau',
  username: 'SarahM19',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/SarahM19' }
}, {
  name: 'Sylvain Marroufin',
  username: 'smarroufin',
  role: 'member',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/smarroufin' }
}]

export default eventHandler(async () => {
  return members
})
