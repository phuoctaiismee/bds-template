import PropertyDetailScreen from '@/modules/screens/property';
import { FC } from 'react';

type PropertyDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    type: string;
  }>;
};
const PropertyDetailPage: FC<PropertyDetailPageProps> = async ({ params, searchParams }) => {
  const { id } = await params;
  const { type } = await searchParams;
  return <PropertyDetailScreen id={id} type={type} />;
};

export default PropertyDetailPage;
