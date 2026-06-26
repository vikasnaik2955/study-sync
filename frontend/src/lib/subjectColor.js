// One stable accent color per subject/name, derived from the string so it's consistent across
// every screen (note cards, group accents, room banners, chat avatars).
const PALETTE = ['#2ECC71', '#F59E0B', '#5B9DFF', '#14B8A6', '#E0A82E', '#A78BFA', '#EC4899'];

export function subjectColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
