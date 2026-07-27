import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Store, Delete } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { currentStaff, loginWithPassword, loginWithPin, loginWithGoogle } = useApp();
  const [mode, setMode] = useState("password"); // password | pin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  if (currentStaff) return <Navigate to="/" replace />;

  function handlePasswordSubmit(e) {
    e.preventDefault();
    setError("");
    if (!otpStage) {
      const res = loginWithPassword(email, password);
      if (!res.ok) { setError(res.error); return; }
      // In production the backend sends a real OTP here after verifying the password.
      setOtpStage(true);
      setError("");
    }
  }
  function handleOtpConfirm(e) {
    e.preventDefault();
    if (otp.trim().length !== 4) { setError("Enter the 4-digit code sent to your email."); return; }
    // OTP accepted — currentStaff was already set on password verification.
  }

  function pressPin(d) {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      const res = loginWithPin(next);
      if (!res.ok) { setError(res.error); setPin(""); }
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Store className="w-6 h-6 text-[var(--color-cooking)]" />
          <span className="font-display text-2xl tracking-wide">FloorOps</span>
        </div>

        <div className="ticket p-6 pt-7">
          <div className="ticket-corner" style={{ borderColor: "var(--color-cooking) transparent transparent transparent" }} />
          <div className="flex gap-1 mb-5 bg-[var(--color-ink)] rounded-md p-1">
            <button
              onClick={() => { setMode("password"); setError(""); setOtpStage(false); }}
              className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${mode === "password" ? "bg-[var(--color-panel-2)] text-[var(--color-paper)]" : "text-[var(--color-mute)]"}`}
            >
              Email & Password
            </button>
            <button
              onClick={() => { setMode("pin"); setError(""); setPin(""); }}
              className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${mode === "pin" ? "bg-[var(--color-panel-2)] text-[var(--color-paper)]" : "text-[var(--color-mute)]"}`}
            >
              Quick PIN
            </button>
          </div>

          {mode === "password" && !otpStage && (
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
              <label className="text-xs text-[var(--color-mute)]">Staff email
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                  placeholder="you@floorops.test"
                  className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-cooking)]" />
              </label>
              <label className="text-xs text-[var(--color-mute)]">Password
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required
                  placeholder="••••••••"
                  className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-cooking)]" />
              </label>
              {error && <p className="text-xs text-[var(--color-rush)]">{error}</p>}
              <button type="submit" className="mt-1 bg-[var(--color-cooking)] text-[var(--color-ink)] font-medium text-sm py-2 rounded-md hover:brightness-110">
                Continue
              </button>
              <p className="text-[10px] text-[var(--color-mute)] text-center">Try ananya@floorops.test / password</p>
              <div className="flex items-center gap-2 text-[10px] text-[var(--color-mute)] my-1">
                <div className="flex-1 h-px bg-[var(--color-line)]" /> OR <div className="flex-1 h-px bg-[var(--color-line)]" />
              </div>
              <button type="button" onClick={loginWithGoogle}
                className="flex items-center justify-center gap-2 border border-[var(--color-line)] text-sm py-2 rounded-md hover:bg-[var(--color-panel-2)]">
                <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4z" /><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3c-7.7 0-14.3 4.4-17.7 10.7z" /><path fill="#4CAF50" d="M24 45c5.5 0 10.4-1.8 14.1-5l-6.5-5.4C29.6 36.1 26.9 37 24 37c-5.2 0-9.7-3.3-11.3-8l-6.6 5.1C9.6 40.5 16.2 45 24 45z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.4C41.5 35.7 45 30.5 45 24c0-1.4-.1-2.7-.4-3.5z" /></svg>
                Continue with Google
              </button>
            </form>
          )}

          {mode === "password" && otpStage && (
            <form onSubmit={handleOtpConfirm} className="flex flex-col gap-3">
              <p className="text-xs text-[var(--color-mute)]">We sent a 4-digit code to <span className="text-[var(--color-paper)]">{email}</span>. Enter it to finish signing in.</p>
              <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="0000" inputMode="numeric"
                className="text-center tracking-[0.5em] font-mono text-lg bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 outline-none focus:border-[var(--color-cooking)]" />
              {error && <p className="text-xs text-[var(--color-rush)]">{error}</p>}
              <button type="submit" className="mt-1 bg-[var(--color-cooking)] text-[var(--color-ink)] font-medium text-sm py-2 rounded-md hover:brightness-110">
                Verify & sign in
              </button>
              <p className="text-[10px] text-[var(--color-mute)] text-center">Demo: any 4 digits work</p>
            </form>
          )}

          {mode === "pin" && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border ${pin.length > i ? "bg-[var(--color-cooking)] border-[var(--color-cooking)]" : "border-[var(--color-line)]"}`} />
                ))}
              </div>
              {error && <p className="text-xs text-[var(--color-rush)]">{error}</p>}
              <div className="grid grid-cols-3 gap-3 w-full">
                {["1","2","3","4","5","6","7","8","9"].map((d) => (
                  <button key={d} onClick={() => pressPin(d)}
                    className="bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md py-3 text-lg font-mono hover:bg-[var(--color-panel-2)]">
                    {d}
                  </button>
                ))}
                <div />
                <button onClick={() => pressPin("0")} className="bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md py-3 text-lg font-mono hover:bg-[var(--color-panel-2)]">0</button>
                <button onClick={() => setPin(pin.slice(0, -1))} className="flex items-center justify-center bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md hover:bg-[var(--color-panel-2)]">
                  <Delete className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-[var(--color-mute)]">Demo PINs: 1234 / 2345 / 3456 / 4567</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
