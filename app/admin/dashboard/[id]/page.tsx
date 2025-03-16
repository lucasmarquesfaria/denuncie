"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Calendar, MapPin, User, AlertTriangle } from "lucide-react"

// Mock data for complaints (same as in dashboard)
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

export default function DenunciaDetalhes({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [denuncia, setDenuncia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [novoStatus, setNovoStatus] = useState("")
  const [observacao, setObservacao] = useState("")

  useEffect(() => {
    // Simulate API call to fetch complaint details
    const fetchDenuncia = async () => {
      try {
        // Find the complaint with the matching ID
        const found = mockDenuncias.find((d) => d.id === Number.parseInt(params.id))

        if (found) {
          setDenuncia(found)
          setNovoStatus(found.status)
        } else {
          toast({
            title: "Denúncia não encontrada",
            description: "A denúncia solicitada não existe ou foi removida.",
            variant: "destructive",
          })
          router.push("/admin/dashboard")
        }
      } catch (error) {
        toast({
          title: "Erro ao carregar denúncia",
          description: "Ocorreu um erro ao buscar os detalhes da denúncia.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDenuncia()
  }, [params.id, router, toast])

  // Function to update complaint status
  const handleUpdateStatus = async () => {
    try {
      // Simulate API call to update status
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setDenuncia((prev) => ({
        ...prev,
        status: novoStatus,
      }))

      toast({
        title: "Status atualizado com sucesso",
        description: "O status da denúncia foi atualizado.",
      })
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status da denúncia.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Carregando detalhes da denúncia...</p>
        </div>
      </div>
    )
  }

  if (!denuncia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Denúncia não encontrada</p>
          <Button asChild className="mt-4">
            <Link href="/admin/dashboard">Voltar para o Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin/dashboard" className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o Dashboard
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Detalhes da Denúncia #{denuncia.id}</CardTitle>
                <CardDescription>Visualize e gerencie os detalhes desta denúncia</CardDescription>
              </div>
              <div>{getStatusBadge(denuncia.status)}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center mb-1">
                    <User className="h-4 w-4 mr-2" />
                    Denunciante
                  </h3>
                  <p className="text-lg font-medium">{denuncia.nome}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    Endereço
                  </h3>
                  <p className="text-lg">{denuncia.endereco}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Data de Registro
                  </h3>
                  <p className="text-lg">{formatDate(denuncia.dataCriacao)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center mb-1">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Tipo de Denúncia
                  </h3>
                  <p className="text-lg">{denuncia.tipoNome}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Descrição</h3>
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <p>{denuncia.complemento}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Atualizar Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Select value={novoStatus} onValueChange={setNovoStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="em_analise">Em Análise</SelectItem>
                      <SelectItem value="resolvido">Resolvido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Textarea
                    placeholder="Adicione uma observação sobre a atualização de status (opcional)"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard">Cancelar</Link>
            </Button>
            <Button onClick={handleUpdateStatus} disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar Status"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Atualizações</CardTitle>
            <CardDescription>Registro de todas as alterações realizadas nesta denúncia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Denúncia registrada</p>
                    <p className="text-sm text-gray-500">{formatDate(denuncia.dataCriacao)}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Denúncia registrada por {denuncia.nome}</p>
                </div>
              </div>

              {/* Este é um exemplo de histórico. Em uma implementação real, seria carregado do banco de dados */}
              {denuncia.status !== "pendente" && (
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Status atualizado para "Em Análise"</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(new Date(new Date(denuncia.dataCriacao).getTime() + 86400000).toISOString())}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Atualizado por Admin</p>
                  </div>
                </div>
              )}

              {denuncia.status === "resolvido" && (
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Denúncia resolvida</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(new Date(new Date(denuncia.dataCriacao).getTime() + 172800000).toISOString())}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Resolvido por Admin</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

