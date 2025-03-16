"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, MapPin } from "lucide-react"

export default function CriarDenuncia() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    tipo: "",
    complemento: "",
  })

  // Simulated complaint types
  const tiposDenuncia = [
    { id: "ambiental", nome: "Ambiental" },
    { id: "seguranca", nome: "Segurança" },
    { id: "infraestrutura", nome: "Infraestrutura" },
    { id: "saude", nome: "Saúde Pública" },
    { id: "outros", nome: "Outros" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, tipo: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success notification
      toast({
        title: "Denúncia registrada com sucesso!",
        description: "Sua denúncia foi enviada e será analisada em breve.",
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      toast({
        title: "Erro ao registrar denúncia",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle address autocomplete
  const handleAddressSearch = () => {
    // In a real implementation, this would integrate with a geolocation API
    toast({
      title: "Buscando endereço...",
      description: "Esta funcionalidade utilizaria uma API de geolocalização real.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Registrar Nova Denúncia</CardTitle>
            <CardDescription>Preencha todos os campos obrigatórios para registrar sua denúncia</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <div className="flex gap-2">
                  <Input
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    placeholder="Digite o endereço completo"
                    className="flex-1"
                    required
                  />
                  <Button type="button" variant="outline" onClick={handleAddressSearch} className="flex-shrink-0">
                    <MapPin className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Clique em "Buscar" para utilizar a localização automática</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Denúncia *</Label>
                <Select onValueChange={handleSelectChange} required>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo de denúncia" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDenuncia.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complemento">Informações Complementares</Label>
                <Textarea
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Descreva detalhes adicionais sobre a denúncia (opcional)"
                  className="min-h-[120px]"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Registrar Denúncia"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-xs text-gray-500">Campos marcados com * são obrigatórios</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

