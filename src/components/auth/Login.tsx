import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../config/msal';
import { Button } from '../ui/Button';

export const Login = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">TraCRM Frontend</h1>
        <Button onClick={handleLogin} className="w-full">Sign in with Microsoft</Button>
      </div>
    </div>
  );
}; 