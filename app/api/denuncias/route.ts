import { NextResponse } from "next/server"

// Mock database for complaints
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

// GET handler to retrieve all complaints or filter them
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Extract filter parameters
  const status = searchParams.get("status")
  const tipo = searchParams.get("tipo")
  const search = searchParams.get("search")

  let filteredDenuncias = [...denuncias]

  // Apply filters if provided
  if (status) {
    filteredDenuncias = filteredDenuncias.filter((d) => d.status === status)
  }

  if (tipo) {
    filteredDenuncias = filteredDenuncias.filter((d) => d.tipo === tipo)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredDenuncias = filteredDenuncias.filter(
      (d) =>
        d.nome.toLowerCase().includes(searchLower) ||
        d.endereco.toLowerCase().includes(searchLower) ||
        d.complemento.toLowerCase().includes(searchLower),
    )
  }

  return NextResponse.json(filteredDenuncias)
}

// POST handler to create a new complaint
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.nome || !body.endereco || !body.tipo) {
      return NextResponse.json({ error: "Campos obrigatórios não preenchidos" }, { status: 400 })
    }

    // Create new complaint
    const newDenuncia = {
      id: denuncias.length + 1,
      nome: body.nome,
      endereco: body.endereco,
      tipo: body.tipo,
      tipoNome: getTipoNome(body.tipo),
      complemento: body.complemento || "",
      status: "pendente",
      dataCriacao: new Date().toISOString(),
    }

    // Add to mock database
    denuncias.push(newDenuncia)

    return NextResponse.json(newDenuncia, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
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

