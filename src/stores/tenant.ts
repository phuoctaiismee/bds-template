import { IYaahApiTenant, IYaahApiTenantSetting } from '@/apis/yaah';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  settings: IYaahApiTenantSetting;
  tenant?: IYaahApiTenant;
}

interface Action {
  setSetting: (settings: IYaahApiTenantSetting) => void;
  setTenant: (tenant: IYaahApiTenant) => void;
}

export const useTenantStore = create<State & Action>()(
  persist(
    (set) => ({
      setSetting(settings) {
        set({ settings });
      },
      settings: {
        id: 'tenant_settings',
        expiring_soon_threshold_minutes: 0,
        max_open_ended_duration_hours: 0,
        no_show_grace_period_minutes: 0,
        overtime_threshold_minutes: 0,
        unpaid_grace_period_minutes: 0,
      },
      setTenant(tenant) {
        set({ tenant });
      },
    }),
    { name: 'tenant', version: 1 },
  ),
);
