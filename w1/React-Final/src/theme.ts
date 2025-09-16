export const theme = {
  shared: {
    primary: '#2563EB',
    danger: '#DC2626',
    radius: 14,
    spacing: (n: number) => n * 8,
    shadow: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3
    }
  },
  light: {
    bg: '#FFFFFF',
    text: '#111827',
    muted: '#6B7280',
    card: '#F8FAFC',
    border: '#E5E7EB'
  },
  dark: {
    bg: '#0B0B0D',
    text: '#F3F4F6',
    muted: '#94A3B8',
    card: '#121216',
    border: '#26272B'
  }
};
