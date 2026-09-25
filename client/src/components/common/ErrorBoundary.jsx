import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-2xl text-center">
            <div className="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-heading font-black mb-2">
              MUTAHIR HARDWARE STORE
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              An unexpected display issue occurred. Click reload to refresh the catalog.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono font-bold text-xs uppercase rounded transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Store</span>
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs uppercase rounded transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
