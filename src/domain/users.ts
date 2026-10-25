export type UserRole = 'customer' | 'tailor' | 'admin';
export type UserProfile = { id: string; displayName: string; role: UserRole; phoneMasked?: string };
export const canManageTailorPortfolio = (user: UserProfile, tailorOwnerId: string) =>
  user.role === 'admin' || (user.role === 'tailor' && user.id === tailorOwnerId);
