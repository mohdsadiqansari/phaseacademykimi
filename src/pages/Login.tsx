import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/providers/trpc";
import { Shield } from "lucide-react";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (isRegister) {
      registerMutation.mutate({ email, password, name });
    } else {
      loginMutation.mutate({ email, password });
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A]">
      <Card className="w-full max-w-md bg-[#111] border-white/10 shadow-2xl shadow-red-900/10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-tight">
            {isRegister ? "Enlist Now" : "System Access"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {isRegister ? "Create your operative profile" : "Enter your credentials to proceed"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {isRegister && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Operative Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors mt-2"
            >
              {isLoading ? "Processing..." : isRegister ? "Initialize Profile" : "Authenticate"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            {isRegister ? "Already have access?" : "Need an operative profile?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              {isRegister ? "Authenticate here" : "Enlist here"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
