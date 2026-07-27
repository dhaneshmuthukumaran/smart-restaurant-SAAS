import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Store, UserPlus } from "lucide-react";
import { useApp } from "../context/AppContext";

const ROLES = ["Waiter", "Cashier", "Kitchen Staff", "Shift Manager"];

export default function Login() {
  const { currentStaff, loginWithPassword, loginWithGoogle, registerStaff } = useApp();
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Sign-up fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState(ROLES[0]);
  const [regPassword, setRegPassword] = useState("");
  const [regResult, setRegResult] = useState(null);

  if (currentStaff) return <Navigate to="/" replace />;

  function switchMode(next) {
    setMode(next);
    setError("");
    setOtpStage(false);
    setRegResult(null);
  }

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

  function handleRegister(e) {
    e.preventDefault();
    setError("");
    if (regPassword.length < 6) { setError("Choose a password with at least 6 characters."); return; }
    const res = registerStaff({ name: regName, email: regEmail, role: regRole, password: regPassword });
    if (!res.ok) { setError(res.error); return; }
    setRegResult(res.staff);
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
              onClick={() => switchMode("signin")}
              className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${mode === "signin" ? "bg-[var(--color-panel-2)] text-[var(--color-paper)]" : "text-[var(--color-mute)]"}`}
            >
              Sign in
            </button>
            <button
              onClick={() => switchMode("signup")}
              className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${mode === "signup" ? "bg-[var(--color-panel-2)] text-[var(--color-paper)]" : "text-[var(--color-mute)]"}`}
            >
              Sign up
            </button>
          </div>

          {mode === "signin" && !otpStage && (
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
              <p className="text-[10px] text-[var(--color-mute)] text-center">Try ananya@floorops.test / password, or sign up below</p>
              <div className="flex items-center gap-2 text-[10px] text-[var(--color-mute)] my-1">
                <div className="flex-1 h-px bg-[var(--color-line)]" /> OR <div className="flex-1 h-px bg-[var(--color-line)]" />
              </div>
              <button type="button" onClick={() => loginWithGoogle()}
                className="flex items-center justify-center gap-2 border border-[var(--color-line)] text-sm py-2 rounded-md hover:bg-[var(--color-panel-2)]">
                <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4z" /><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3c-7.7 0-14.3 4.4-17.7 10.7z" /><path fill="#4CAF50" d="M24 45c5.5 0 10.4-1.8 14.1-5l-6.5-5.4C29.6 36.1 26.9 37 24 37c-5.2 0-9.7-3.3-11.3-8l-6.6 5.1C9.6 40.5 16.2 45 24 45z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.4C41.5 35.7 45 30.5 45 24c0-1.4-.1-2.7-.4-3.5z" /></svg>
                Continue with Google
              </button>
            </form>
          )}

          {mode === "signin" && otpStage && (
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

          {mode === "signup" && !regResult && (
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
              <p className="text-xs text-[var(--color-mute)] flex items-center gap-1.5"><UserPlus className="w-3.5 h-3.5" /> New here? Create a staff account to sign in.</p>
              <label className="text-xs text-[var(--color-mute)]">Full name
                <input value={regName} onChange={(e) => setRegName(e.target.value)} required
                  className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-cooking)]" />
              </label>
              <label className="text-xs text-[var(--color-mute)]">Email
                <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} type="email" required
                  className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-cooking)]" />
              </label>
              <label className="text-xs text-[var(--color-mute)]">Role
                <select value={regRole} onChange={(e) => setRegRole(e.target.value)}
                  className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none">
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </label>
              <label className="text-xs text-[var(--color-mute)]">Password
                <input value={regPassword} onChange={(e) => setRegPassword(e.target.value)} type="password" required
                  placeholder="At least 6 characters"
                  className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-cooking)]" />
              </label>
              {error && <p className="text-xs text-[var(--color-rush)]">{error}</p>}
              <button type="submit" className="mt-1 bg-[var(--color-cooking)] text-[var(--color-ink)] font-medium text-sm py-2 rounded-md hover:brightness-110">
                Create account
              </button>
            </form>
          )}

          {mode === "signup" && regResult && (
            <div className="flex flex-col gap-3 text-sm">
              <p>You're all set, <span className="font-medium">{regResult.name}</span>. You can sign in now with the email and password you chose.</p>
              <button onClick={() => { setEmail(regResult.email); setPassword(regResult.password); switchMode("signin"); }}
                className="bg-[var(--color-cooking)] text-[var(--color-ink)] font-medium text-sm py-2 rounded-md hover:brightness-110">
                Continue to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
