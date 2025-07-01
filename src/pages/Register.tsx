import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuthStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { PenSquare } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Kullanıcı adı en az 2 karakter olmalıdır.",
  }),
  displayName: z.string().min(2, {
    message: "Görünen ad en az 2 karakter olmalıdır.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır.",
  }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuthStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    setTimeout(() => {
      const success = register(
        values.username,
        values.displayName,
        values.password
      );
      
      if (success) {
        toast({
          title: "Kayıt Başarılı",
          description: "Şiir platformuna hoş geldiniz!",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Kayıt Başarısız",
          description: "Bu kullanıcı adı zaten kullanılıyor.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center mb-4">
            <PenSquare className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold">ŞiirPlatformu</h1>
          </Link>
          <p className="text-muted-foreground">Şiirlerinizi paylaşın, başkalarından ilham alın</p>
        </div>
        
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Kayıt Ol</CardTitle>
            <CardDescription>
              Yeni bir hesap oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="kullaniciadi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Görünen Ad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ad Soyad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre Tekrar</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <Link to="/login" className="text-primary underline-offset-2 hover:underline">
                Giriş Yap
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <MobileNav />
    </div>
  );
}