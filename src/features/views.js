export const VIEWS = [
  { id: 'original', label: 'Original (reconstruction)' },
  { id: 'redesign', label: 'Redesign' },
]

const PAGES = {
  original: ['', '/services', '/telehealth'],
  redesign: ['', '/services', '/telehealth', '/request', '/confirmation'],
}

export function pageSuffix(pathname) {
  return pathname.replace(/^\/(original|redesign)/, '') || ''
}

export function pathFor(view, suffix) {
  const safe = PAGES[view].includes(suffix) ? suffix : ''
  return `/${view}${safe}`
}
