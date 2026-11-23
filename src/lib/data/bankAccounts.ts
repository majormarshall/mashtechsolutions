export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  badge: string;
  tag: string;
  color: string;
  accentColor: string;
}

export const OFFICIAL_BANK_ACCOUNTS: BankAccount[] = [
  {
    bankName: 'OPay Digital Services',
    accountNumber: '7058124966',
    accountName: 'MashTech Solutions / Adeleke Marshall',
    badge: 'Instant 24/7 Verification',
    tag: 'OPay',
    color: 'from-emerald-950/60 to-emerald-900/40 border-emerald-500/40 text-emerald-400',
    accentColor: 'bg-emerald-500 text-slate-950'
  },
  {
    bankName: 'PalmPay',
    accountNumber: '7058124966',
    accountName: 'MashTech Solutions / Adeleke Marshall',
    badge: 'Zero-Fee Transfer',
    tag: 'PalmPay',
    color: 'from-purple-950/60 to-purple-900/40 border-purple-500/40 text-purple-400',
    accentColor: 'bg-purple-500 text-slate-950'
  },
  {
    bankName: 'United Bank for Africa (UBA)',
    accountNumber: '2123103604',
    accountName: 'MashTech Solutions / Adeleke Marshall',
    badge: 'Commercial Bank & Corporate',
    tag: 'UBA',
    color: 'from-rose-950/60 to-red-900/40 border-red-500/40 text-rose-400',
    accentColor: 'bg-red-500 text-white'
  }
];
