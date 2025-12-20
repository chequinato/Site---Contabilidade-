import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // mock login
    await new Promise((r) => setTimeout(r, 1200));

    toast({
      title: "Login realizado",
      description: "Bem-vindo à área do cliente.",
    });

    window.location.href = "/cliente/dashboard";
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-custom max-w-md">
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Entrar na área do cliente
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    className="pl-10"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
