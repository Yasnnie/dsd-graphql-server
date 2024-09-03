import { ApolloServer, gql } from "apollo-server";

let STATIC_DATA = {
  user: {
    name: "Yasmin Carvalho",
    age: 21,
    description: `Por volta de 2020, comecei a explorar HTML e CSS para criar sites para servidores de RP e Javascrip para bots do Discord. Não demorou muito, logo entrei no mercado de trabalho para minha primeira vaga como desenvolvedora web em uma startup local. Lá, foquei em desenvolver sistemas escaláveis e com uma boa experiência de usuário. Atualmente, faço parte do NADIC, um núcleo de pesquisa dedicado a criar soluções tecnológicas para diversas empresas. Lá trabalho em projetos voltados para educação brasileira. Meu objetivo é contribuir para a sociedade através da tecnologia, buscando impactar positivamente a vida das pessoas. Sempre me dediquei a projetos que têm o potencial de alcançar grandes massas e fazer a diferença no mundo. No meu tempo livre, gosto de jogar Valorant e outros jogos online, ouvir música e assistir a séries e filmes. Fora do computador, priorizo momentos de qualidade com minha família e amigos, como também conhecer novos lugares.`,
  },
  projects: [
    {
      id: 1,
      name: "Observatório RIEH",
      description:
        "Uma ferramenta de análise e monitoramento desenvolvida para acompanhar a implementação da Rede de Inovação para Educação Híbrida (RIEH) em todo o país. Permite coletar e analisar dados e estatísticas para avaliar o progresso da rede.",
      technologies: ["Next.js", "Styled-Components", "Docker", "Microfrontend"],
      link: "https://rieh.mec.gov.br/observatorio",
    },
    {
      id: 2,
      name: "Repositório RIEH",
      description:
        "O Repositório da Rede de Inovação para Educação Híbrida é um sistema que disponibiliza uma variedade de Recursos Educacionais Digitais (REDs), incluindo vídeos, animações, imagens, áudios, textos e planos de aula para enriquecer a oferta de Educação Híbrida.",
      technologies: ["Next.js", "Styled-Components", "Docker", "Microfrontend"],
      link: "https://rieh.mec.gov.br/repositorio",
    },
    {
      id: 3,
      name: "Aplicativo do Repositório RIEH",
      subtitle: "UFAL/MEC",
      description: `O aplicativo da Rede de Inovação para Educação Híbrida (RIEH) foi projetado para disponibilizar Recursos Educacionais Digitais (REDs) offline, adotando a abordagem "Offline First" para garantir acesso contínuo aos REDs, independentemente da conectividade.`,
      technologies: ["React-Native", "Expo", "IOS", "Android"],
      link: null,
    },
  ],
};

const typeDefs = gql`
  type Query {
    projects: [Project]!
    user: User!
  }

  type Mutation {
    createProject(
      name: String!
      description: String!
      technologies: [String]!
      link: String
    ): String!
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    technologies: [String]!
    link: String
  }

  type User {
    name: String!
    age: Int!
    description: String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      projects: () => STATIC_DATA.projects,
      user: () => STATIC_DATA.user,
    },
    Mutation: {
      createProject: (_, args) => {
        const new_project = {
          id: STATIC_DATA.projects.length + 1,
          name: args.name,
          description: args.description,
          technologies: args.technologies,
          link: args.link,
        };

        STATIC_DATA.projects.push(new_project);
        return "Created";
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
