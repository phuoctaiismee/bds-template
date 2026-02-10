'use client';
import { useRouter } from '@/lib/navigation';
import { Grow } from '@mui/material';
import { useSession } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';

type ClientBootstrapProps = object;

const ClientBootstrap: FC<ClientBootstrapProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();
//   const { data: user, isError } = useQuery({
//     queryKey: ['tekgether/auth/me'],
//     queryFn: () => yaahApi.auth.me(),
//     retry: false,
//     enabled: !!session,
//   });
//   const { setUser } = useAuthStore();

//   useEffect(() => {
//     setUser(user?.data as never);
//   }, [setUser, user]);

//   useEffect(() => {
//     if (isError) {
//       signOut({ redirect: false });
//       router.replace('/login');
//     }
//   }, [isError, router]);

//   useQuery({
//     queryKey: ['tekgether/payment-methods'],
//     queryFn: ({ signal }) => yaahApi.paymentMethod.getAll({ signal }),
//   });

//   const { data: tenantSettings } = useQuery({
//     queryKey: ['tenant/settings'],
//     queryFn: ({ signal }) => yaahApi.tenantSetting.getSingleton({ signal }),
//   });

//   const { setSetting, setTenant } = useTenantStore();

//   const onTenantSettingsChange = useEffectEvent((settings: IYaahApiTenantSetting) => {
//     setSetting(settings);
//   });

//   useEffect(() => {
//     if (tenantSettings) onTenantSettingsChange(tenantSettings.data);
//   }, [tenantSettings]);

//   const { data: tenant } = useQuery({
//     queryKey: ['tenant/me'],
//     queryFn: ({ signal }) => yaahApi.tenant.me({ signal }),
//   });

//   const onTenantChange = useEffectEvent((tenant: IYaahApiTenant) => {
//     setTenant(tenant);
//   });

//   useEffect(() => {
//     if (tenant) onTenantChange(tenant.data);
//   }, [tenant]);

  return (
    <>
      <SnackbarProvider autoHideDuration={2000} TransitionComponent={Grow} />
    </>
  );
};

export default ClientBootstrap;
