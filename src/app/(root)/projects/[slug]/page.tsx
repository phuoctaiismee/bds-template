import ProjectDetailScreen from '@/modules/screens/projects/detail';
import { FC } from 'react';
type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};
const ProjectDetailPage: FC<ProjectDetailPageProps> = async ({ params }) => {
  const { slug } = await params;
  return <ProjectDetailScreen slug={slug} />;
};

export default ProjectDetailPage;
