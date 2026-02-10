import { FC } from 'react';
import sanitize from 'sanitize-html';
import styles from './styles.module.scss';

interface HtmlPreviewProps {
  children?: string;
}

const HtmlPreview: FC<HtmlPreviewProps> = ({ children }) => {
  return <div dangerouslySetInnerHTML={{ __html: sanitize(children || '') }} className={styles.wrapper} />;
};

export default HtmlPreview;
