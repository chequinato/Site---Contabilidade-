import { useState } from "react";
import { Mail, Lock, User, Phone, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    toast({
      title: "Conta criada",
      description: "Agora você pode fazer login.",
    });

    window.location.href = "/login";
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-custom max-w-md">
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Criar conta
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                placeholder="Telefone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Empresa"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Confirmar senha"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <Button className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Criando..." : "Criar conta"}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
