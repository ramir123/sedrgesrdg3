export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
export type PaymentMethod = 'CCP' | 'Baridimob' | 'flexi';
export type Source = 'Discord' | 'Instagram' | 'Facebook' | 'Other';
export type FishSize = 'crab +1000' | 'Fish +2000' | 'shark +10000';

export interface Order {
  id: string;
  ign: string;
  customerName: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  source: Source;
  fishSize: FishSize;
  rpTotal: number;
  dzdAmount: number;
  skinsPass: string;
  accountUsed: string;
  notes: string;
  createdAt: number;
  timeRemaining: number;
}