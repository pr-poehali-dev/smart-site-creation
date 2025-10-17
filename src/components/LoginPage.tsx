import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });

  useEffect(() => {
    const matrixContainer = document.getElementById('matrix-code');
    if (!matrixContainer) return;

    const containerWidth = matrixContainer.offsetWidth;
    const characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";

    for (let i = 0; i < 30; i++) {
      const column = document.createElement('div');
      column.className = 'code-column';
      column.style.left = Math.random() * containerWidth + 'px';
      column.style.animationDuration = 3 + Math.random() * 5 + 's';

      const columnLength = 10 + Math.floor(Math.random() * 15);
      let columnContent = '';
      for (let j = 0; j < columnLength; j++) {
        columnContent += characterSet.charAt(Math.floor(Math.random() * characterSet.length)) + '<br>';
      }

      column.innerHTML = columnContent;
      matrixContainer.appendChild(column);
    }

    return () => {
      if (matrixContainer) {
        matrixContainer.innerHTML = '';
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: !username.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      onLogin(username);
    }
  };

  const handleFingerprintLogin = () => {
    const fingerprintBox = document.getElementById('fingerprint-box');
    if (!fingerprintBox) return;

    fingerprintBox.style.transform = 'scale(0.95)';

    setTimeout(() => {
      fingerprintBox.style.transform = 'scale(1)';

      setTimeout(() => {
        fingerprintBox.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';

        setTimeout(() => {
          onLogin('Biometric User');
        }, 1000);
      }, 1500);
    }, 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#041504] to-[#072d07] p-5">
      <style>{`
        .code-column {
          position: absolute;
          top: -100px;
          font-size: 12px;
          color: #0f0;
          text-shadow: 0 0 5px #0f0;
          white-space: nowrap;
          opacity: 0.7;
          animation: codeRain linear infinite;
          pointer-events: none;
        }

        @keyframes codeRain {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(450px); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .fingerprint-pulse::before {
          content: '';
          position: absolute;
          width: 120px;
          height: 120px;
          background: rgba(0, 255, 0, 0.08);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
      `}</style>

      <div className="flex w-full max-w-4xl min-h-[450px] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,255,0,0.2)] border border-[#0f0]">
        <div className="flex-1 p-10 bg-[#020e02] flex flex-col justify-center items-center text-[#0f0]">
          <div className="mb-8 text-center">
            <h1 className="text-[38px] font-bold tracking-[2px] mb-2" style={{ textShadow: '0 0 5px #0f0, 0 0 10px #0f0', fontFamily: 'Courier New, monospace' }}>
              TechStore
            </h1>
            <p className="text-[#0c0] text-sm">Your Personal Security Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-5">
              <Label htmlFor="username" className="text-[#0c0] text-sm mb-2 block" style={{ fontFamily: 'Courier New, monospace' }}>
                Username
              </Label>
              <div className="relative">
                <Icon name="User" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a0]" size={18} />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`pl-12 bg-[rgba(0,20,0,0.7)] border-[#0a0] text-[#0f0] placeholder:text-[#0a0]/50 focus:border-[#0f0] focus:ring-[#0f0]/20 ${
                    errors.username ? 'border-[#0f0] ring-2 ring-[#0f0]/20' : ''
                  }`}
                  style={{ fontFamily: 'Courier New, monospace' }}
                />
              </div>
            </div>

            <div className="mb-5">
              <Label htmlFor="password" className="text-[#0c0] text-sm mb-2 block" style={{ fontFamily: 'Courier New, monospace' }}>
                Password
              </Label>
              <div className="relative">
                <Icon name="Lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a0]" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-12 bg-[rgba(0,20,0,0.7)] border-[#0a0] text-[#0f0] placeholder:text-[#0a0]/50 focus:border-[#0f0] focus:ring-[#0f0]/20 ${
                    errors.password ? 'border-[#0f0] ring-2 ring-[#0f0]/20' : ''
                  }`}
                  style={{ fontFamily: 'Courier New, monospace' }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                  className="border-[#0c0] data-[state=checked]:bg-[#0a0] data-[state=checked]:border-[#0a0]"
                />
                <label htmlFor="remember" className="text-sm text-[#0c0] cursor-pointer" style={{ fontFamily: 'Courier New, monospace' }}>
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-[#0f0] hover:underline" style={{ fontFamily: 'Courier New, monospace', textShadow: 'none' }}>
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0a0] hover:bg-[#0f0] text-black font-bold uppercase tracking-wider mb-5 shadow-none hover:shadow-[0_4px_12px_rgba(0,255,0,0.3)] transition-all"
              style={{ fontFamily: 'Courier New, monospace' }}
            >
              Login
            </Button>

            <div className="text-center">
              <p className="text-[#0a0] text-sm mb-4 relative" style={{ fontFamily: 'Courier New, monospace' }}>
                <span className="relative z-10 bg-[#020e02] px-3">Or login with</span>
                <span className="absolute left-0 top-1/2 w-full h-px bg-[#030]" />
              </p>
              <div className="flex justify-center gap-4">
                {['Globe', 'Facebook', 'Apple'].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className="w-10 h-10 rounded-full bg-[#031703] border border-[#0a0] flex items-center justify-center text-[#0f0] hover:bg-[#052605] hover:shadow-[0_0_10px_rgba(0,255,0,0.4)] transition-all"
                  >
                    <Icon name={icon} size={18} />
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1 bg-gradient-to-br from-[#052605] to-[#010801] flex flex-col justify-center items-center text-[#0f0] p-10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(0, 20, 0, 0.9), rgba(0, 10, 0, 0.95))', opacity: 0.3 }}
          />

          <div id="matrix-code" className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden" />

          <div className="text-center mb-8 z-10">
            <h2 className="text-2xl mb-2" style={{ textShadow: '0 0 5px #0f0', fontFamily: 'Courier New, monospace' }}>
              Biometric Login
            </h2>
            <p className="text-sm opacity-80" style={{ fontFamily: 'Courier New, monospace' }}>
              Quick and secure access to your account
            </p>
          </div>

          <div
            id="fingerprint-box"
            onClick={handleFingerprintLogin}
            className="fingerprint-pulse w-[150px] h-[150px] rounded-full bg-[rgba(0,255,0,0.1)] flex justify-center items-center relative cursor-pointer mb-8 z-10 border border-[#0a0] transition-all"
          >
            <Icon name="Fingerprint" size={80} className="text-[#0f0] z-10" />
          </div>

          <div className="text-center text-sm opacity-90 z-10 mb-5" style={{ fontFamily: 'Courier New, monospace' }}>
            Touch the sensor to verify your identity
          </div>

          <div className="text-center z-10" style={{ fontFamily: 'Courier New, monospace' }}>
            <p className="text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-[#0f0] font-bold hover:underline" style={{ textShadow: '0 0 5px #0f0' }}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
