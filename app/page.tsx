import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Denúncias</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Registrar Denúncia</CardTitle>
              <CardDescription>Preencha o formulário para registrar uma nova denúncia</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Utilize nosso sistema para registrar denúncias de forma rápida e segura. Todas as informações são
                tratadas com confidencialidade.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/denuncias/criar" passHref>
                <Button>Registrar Denúncia</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Área Administrativa</CardTitle>
              <CardDescription>Acesso restrito para administradores do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Área exclusiva para administradores gerenciarem denúncias, gerar relatórios e monitorar o sistema.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/login" passHref>
                <Button variant="outline">Acessar como Administrador</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">Sistema de Denúncias © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

