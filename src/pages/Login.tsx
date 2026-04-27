import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/providers/trpc";
import { Shield } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const firebaseAuthMutation = trpc.auth.firebaseAuth.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (err) => {
      setError(err.message);
      setIsLoading(false);
    }
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      firebaseAuthMutation.mutate({ idToken });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A]">
      <Card className="w-full max-w-md bg-[#111] border-white/10 shadow-2xl shadow-red-900/10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-tight">
            System Access
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Authenticate with your Google account to proceed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-6 text-lg bg-white hover:bg-zinc-200 text-black font-medium transition-colors flex items-center justify-center gap-3"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            {isLoading ? "Authenticating..." : "Sign in with Google"}
          </Button>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 py-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <div className="mt-6 text-center text-xs text-zinc-500 uppercase tracking-widest">
            Secured via Firebase Authentication
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
