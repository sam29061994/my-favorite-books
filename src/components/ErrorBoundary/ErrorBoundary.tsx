import { Component, ErrorInfo } from "react";
import { Props, State } from "./ErrorBoundary.type";

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}
