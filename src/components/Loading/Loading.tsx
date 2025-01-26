import LoadingIcon from "../../assets/icons/_LoadingIcon.png";
import "./Loading.scss";

interface LoadingProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export const Loading = ({ className = "", size = "medium" }: LoadingProps) => {
  return (
    <div className={`loading-container ${className}`}>
      <img
        src={LoadingIcon}
        alt="Loading"
        className={`loading-icon loading-icon--${size}`}
      />
      <p className="loading-text">Loading...</p>
    </div>
  );
};
