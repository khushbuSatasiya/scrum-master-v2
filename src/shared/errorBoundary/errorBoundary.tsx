import React from 'react';

interface OwnProps {
	children?: any;
}

class ErrorBoundary extends React.Component<OwnProps> {
	state = {
		error: null
	};
	static getDerivedStateFromError(error: Error | null) {
		return { error };
	}

	componentDidMount() {
		//window.onerror = this.logError;
	}

	componentDidCatch(error: Error | null) {
		this.logError(error);
	}

	render() {
		if (this.state.error) {
			return 'Application has errors. Please check logs to fix this';
		}
		return this.props.children;
	}

	logError(args: Error | null) {
		console.log(args);
	}
}

export default ErrorBoundary;
