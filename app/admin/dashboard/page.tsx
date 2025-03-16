"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Download, FileText, Filter, Home, LogOut, Search, User, AlertTriangle } from "lucide-react"

// Mock data for complaints
const mockDenuncias = [
  {
    id: 1,
    nome: "João Silva",
    endereco: "Rua das Flores, 123 - Centro",
    tipo: "ambiental",
    tipoNome: "Ambiental",
    complemento: "Descarte irregular de lixo próximo ao córrego",
    status: "pendente",
    dataCriacao: "2023-05-15T10:30:00",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    endereco: "Av. Principal, 456 - Jardim Europa",
    tipo: "seguranca",
    tipoNome: "Segurança",
    complemento: "Iluminação pública danificada há mais de 2 semanas",
    status: "em_analise",
    dataCriacao: "2023-05-14T15:45:00",
  },
  {
    id: 3,
    nome: "Carlos Santos",
    endereco: "Rua Ipiranga, 789 - Vila Nova",
    tipo: "infraestrutura",
    tipoNome: "Infraestrutura",
    complemento: "Buraco na via causando acidentes",
    status: "resolvido",
    dataCriacao: "2023-05-10T09:15:00",
  },
  {
    id: 4,
    nome: "Ana Pereira",
    endereco: "Rua das Palmeiras, 321 - Jardim América",
    tipo: "saude",
    tipoNome: "Saúde Pública",
    complemento: "Água parada com possível foco de dengue",
    status: "pendente",
    dataCriacao: "2023-05-16T11:20:00",
  },
  {
    id: 5,
    nome: "Roberto Almeida",
    endereco: "Av. Brasil, 987 - Centro",
    tipo: "outros",
    tipoNome: "Outros",
    complemento: "Poluição sonora de estabelecimento comercial",
    status: "em_analise",
    dataCriacao: "2023-05-13T16:30:00",
  },
]

export default function AdminDashboard() {
  const { toast } = useToast()
  const [denuncias, setDenuncias] = useState([])
  const [filteredDenuncias, setFilteredDenuncias] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [tipoFilter, setTipoFilter] = useState("")

  // Load mock data on component mount
  useEffect(() => {
    setDenuncias(mockDenuncias)
    setFilteredDenuncias(mockDenuncias)
  }, [])

  // Apply filters when search term or filters change
  useEffect(() => {
    let result = denuncias

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (denuncia) =>
          denuncia.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          denuncia.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
          denuncia.complemento.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((denuncia) => denuncia.status === statusFilter)
    }

    // Apply type filter
    if (tipoFilter) {
      result = result.filter((denuncia) => denuncia.tipo === tipoFilter)
    }

    setFilteredDenuncias(result)
  }, [searchTerm, statusFilter, tipoFilter, denuncias])

  // Function to generate PDF report
  const generatePDFReport = () => {
    toast({
      title: "Gerando relatório PDF",
      description: "O relatório será baixado em instantes.",
    })

    // In a real implementation, this would call an API endpoint to generate the PDF
    setTimeout(() => {
      toast({
        title: "Relatório gerado com sucesso!",
        description: "O relatório foi gerado e baixado.",
      })
    }, 2000)
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "pendente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pendente
          </Badge>
        )
      case "em_analise":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Em Análise
          </Badge>
        )
      case "resolvido":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolvido
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold">Painel Admin</h2>
          <p className="text-sm text-gray-500">Sistema de Denúncias</p>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center px-4 py-2 text-sm bg-gray-100 rounded-md text-primary font-medium"
              >
                <Home className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                <User className="mr-3 h-4 w-4" />
                Usuários
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                <FileText className="mr-3 h-4 w-4" />
                Relatórios
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 border-t p-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={generatePDFReport}>
                <Download className="mr-2 h-4 w-4" />
                Gerar Relatório PDF
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total de Denúncias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{denuncias.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {denuncias.filter((d) => d.status === "pendente").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Resolvidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {denuncias.filter((d) => d.status === "resolvido").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Filtre as denúncias por diferentes critérios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar por nome, endereço..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filtrar por status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em_analise">Em Análise</SelectItem>
                    <SelectItem value="resolvido">Resolvido</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filtrar por tipo" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="ambiental">Ambiental</SelectItem>
                    <SelectItem value="seguranca">Segurança</SelectItem>
                    <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                    <SelectItem value="saude">Saúde Pública</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Denúncias</CardTitle>
              <CardDescription>Visualize e gerencie todas as denúncias registradas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todas">
                <TabsList className="mb-4">
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                  <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                  <TabsTrigger value="em_analise">Em Análise</TabsTrigger>
                  <TabsTrigger value="resolvidas">Resolvidas</TabsTrigger>
                </TabsList>

                <TabsContent value="todas" className="space-y-4">
                  {filteredDenuncias.length > 0 ? (
                    filteredDenuncias.map((denuncia) => (
                      <Card key={denuncia.id} className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="mr-4 bg-primary/10 p-2 rounded-full">
                                <AlertTriangle className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{denuncia.nome}</h3>
                                <p className="text-sm text-gray-500">{denuncia.endereco}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(denuncia.status)}
                              <Badge variant="outline" className="bg-gray-50">
                                {denuncia.tipoNome}
                              </Badge>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-md mb-3">
                            <p className="text-sm">{denuncia.complemento}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              Registrado em: {formatDate(denuncia.dataCriacao)}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Detalhes
                              </Button>
                              <Button size="sm">Atualizar Status</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Nenhuma denúncia encontrada com os filtros aplicados.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pendentes" className="space-y-4">
                  {filteredDenuncias.filter((d) => d.status === "pendente").length > 0 ? (
                    filteredDenuncias
                      .filter((d) => d.status === "pendente")
                      .map((denuncia) => (
                        <Card key={denuncia.id} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="mr-4 bg-yellow-100 p-2 rounded-full">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{denuncia.nome}</h3>
                                  <p className="text-sm text-gray-500">{denuncia.endereco}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(denuncia.status)}
                                <Badge variant="outline" className="bg-gray-50">
                                  {denuncia.tipoNome}
                                </Badge>
                              </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-md mb-3">
                              <p className="text-sm">{denuncia.complemento}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">
                                Registrado em: {formatDate(denuncia.dataCriacao)}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                                <Button size="sm">Atualizar Status</Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Nenhuma denúncia pendente encontrada.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="em_analise" className="space-y-4">
                  {filteredDenuncias.filter((d) => d.status === "em_analise").length > 0 ? (
                    filteredDenuncias
                      .filter((d) => d.status === "em_analise")
                      .map((denuncia) => (
                        <Card key={denuncia.id} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="mr-4 bg-blue-100 p-2 rounded-full">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{denuncia.nome}</h3>
                                  <p className="text-sm text-gray-500">{denuncia.endereco}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(denuncia.status)}
                                <Badge variant="outline" className="bg-gray-50">
                                  {denuncia.tipoNome}
                                </Badge>
                              </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-md mb-3">
                              <p className="text-sm">{denuncia.complemento}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">
                                Registrado em: {formatDate(denuncia.dataCriacao)}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                                <Button size="sm">Atualizar Status</Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Nenhuma denúncia em análise encontrada.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="resolvidas" className="space-y-4">
                  {filteredDenuncias.filter((d) => d.status === "resolvido").length > 0 ? (
                    filteredDenuncias
                      .filter((d) => d.status === "resolvido")
                      .map((denuncia) => (
                        <Card key={denuncia.id} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="mr-4 bg-green-100 p-2 rounded-full">
                                  <AlertTriangle className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{denuncia.nome}</h3>
                                  <p className="text-sm text-gray-500">{denuncia.endereco}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(denuncia.status)}
                                <Badge variant="outline" className="bg-gray-50">
                                  {denuncia.tipoNome}
                                </Badge>
                              </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-md mb-3">
                              <p className="text-sm">{denuncia.complemento}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">
                                Registrado em: {formatDate(denuncia.dataCriacao)}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                                <Button size="sm">Reabrir</Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Nenhuma denúncia resolvida encontrada.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

