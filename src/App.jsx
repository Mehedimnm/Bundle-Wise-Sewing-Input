import React from 'react';
// সঠিক ফোল্ডার থেকে ফাইলটি আনা হচ্ছে
import ContactForm from './components/ContactForm';

// এই অংশটি এরর ধরার জন্য (Error Boundary)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // যদি কোনো সমস্যা হয়, তাহলে সাদা স্ক্রিনের বদলে এই লাল বক্স আসবে
      return (
        <div style={{ padding: '20px', color: '#ff4444', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
          <h2>⚠️ Something went wrong!</h2>
          <p>Please fix the following error:</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#000', padding: '10px', borderRadius: '5px' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <br />
          <p>Common Fixes:</p>
          <ul>
            <li>Try running: <code>npm install framer-motion react-icons</code></li>
            <li>Check if ContactForm.jsx has <code>export default ContactForm</code></li>
          </ul>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ContactForm />
    </ErrorBoundary>
  );
}

export default App;
