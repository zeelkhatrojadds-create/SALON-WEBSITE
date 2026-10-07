import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-[#161012] border border-[#CFA46A]/20 rounded-3xl text-center space-y-4">
          <div className="max-w-md space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-[#F7F1E8]">Something went wrong</h3>
            <p className="text-xs text-[#F7F1E8]/60 font-mono bg-black/40 p-3 rounded-xl border border-white/10 text-left overflow-x-auto">
              {this.state.error?.toString() || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 bg-[#CFA46A] hover:bg-[#E5C492] text-[#0D090A] font-bold text-xs uppercase tracking-wider rounded-full inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Section</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
