import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types/order';

interface AuthState {
  isAuthenticated: boolean;
  isDashboardAuthenticated: boolean;
  login: (password: string) => boolean;
  loginDashboard: (password: string) => boolean;
  logout: () => void;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'timeRemaining'>) => void;
  updateOrder: (order: Order) => void;
  updateOrderTime: (id: string) => void;
}

interface Store extends AuthState, OrderState {}

const MAIN_PASSWORD = 'Nex8574@Ra';
const DASHBOARD_PASSWORD = 'NeK948@Ra';

export const useStore = create<Store>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isDashboardAuthenticated: false,
      orders: [],

      login: (password) => {
        const isValid = password === MAIN_PASSWORD;
        if (isValid) {
          set({ isAuthenticated: true });
        }
        return isValid;
      },

      loginDashboard: (password) => {
        const isValid = password === DASHBOARD_PASSWORD;
        if (isValid) {
          set({ isDashboardAuthenticated: true });
        }
        return isValid;
      },

      logout: () => set({ isAuthenticated: false, isDashboardAuthenticated: false }),

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          timeRemaining: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        // Send Discord webhook
        fetch('https://discord.com/api/webhooks/1317290004367675483/sP8sIPXutvaBeH-K91Df9ZxCAoFC_clu4lQXBGL3sgm0_ZZP6FpOWM2CVXiLr3HnFEbC', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              title: '🎮 New Order Created',
              color: 0x3498db,
              fields: [
                { name: 'IGN', value: orderData.ign, inline: true },
                { name: 'Customer', value: orderData.customerName, inline: true },
                { name: 'Status', value: orderData.status, inline: true },
                { name: 'RP Total', value: orderData.rpTotal.toString(), inline: true },
                { name: 'DZD Amount', value: orderData.dzdAmount.toString(), inline: true },
                { name: 'Fish Size', value: orderData.fishSize, inline: true },
              ],
              timestamp: new Date().toISOString(),
            }],
          }),
        });
      },

      updateOrder: (order) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === order.id ? order : o)),
        }));
      },

      updateOrderTime: (id) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id === id) {
              const newTimeRemaining = Math.max(0, order.timeRemaining - 1000);
              return {
                ...order,
                timeRemaining: newTimeRemaining,
                status: newTimeRemaining === 0 ? 'Completed' : order.status,
              };
            }
            return order;
          }),
        }));
      },
    }),
    {
      name: 'order-manager-storage',
    }
  )
);