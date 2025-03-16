import { NextResponse } from "next/server"

// Mock database for complaints (same as in the main route file)
const denuncias = [
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

// GET handler to retrieve a specific complaint by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Find the complaint with the matching ID
  const denuncia = denuncias.find((d) => d.id === id)

  if (!denuncia) {
    return NextResponse.json({ error: "Denúncia não encontrada" }, { status: 404 })
  }

  return NextResponse.json(denuncia)
}

// PATCH handler to update a specific complaint
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // Find the complaint index
    const index = denuncias.findIndex((d) => d.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Denúncia não encontrada" }, { status: 404 })
    }

    // Update only the provided fields
    const updatedDenuncia = {
      ...denuncias[index],
      ...body,
      // Ensure these fields can't be changed
      id: denuncias[index].id,
      dataCriacao: denuncias[index].dataCriacao,
    }

    // If tipo was updated, update tipoNome as well
    if (body.tipo && body.tipo !== denuncias[index].tipo) {
      updatedDenuncia.tipoNome = getTipoNome(body.tipo)
    }

    // Update in mock database
    denuncias[index] = updatedDenuncia

    return NextResponse.json(updatedDenuncia)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

// DELETE handler to remove a specific complaint
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Find the complaint index
  const index = denuncias.findIndex((d) => d.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Denúncia não encontrada" }, { status: 404 })
  }

  // Remove from mock database
  denuncias.splice(index, 1)

  return NextResponse.json({ success: true })
}

// Helper function to get type name from type id
function getTipoNome(tipo: string): string {
  const tiposMap: Record<string, string> = {
    ambiental: "Ambiental",
    seguranca: "Segurança",
    infraestrutura: "Infraestrutura",
    saude: "Saúde Pública",
    outros: "Outros",
  }

  return tiposMap[tipo] || "Desconhecido"
}

