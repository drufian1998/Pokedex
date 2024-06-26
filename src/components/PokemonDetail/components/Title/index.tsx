import styles from "./styles.module.css";

interface Props {
  content: string;
  backgroundSelected: string;
}

export const Title = ({ content, backgroundSelected }: Props) => {
  return (
    <span className={styles.title} style={{ color: backgroundSelected }}>
      {content}
    </span>
  );
};
