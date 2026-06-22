import { TechEntry } from './types';

export const i18nData = {
  en: {
    skip: "Skip to main content",
    nav: {
      cases: "Case Studies",
      decisions: "Decisions",
      stack: "Stack",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Backend Engineer · Remote · Cartagena, Colombia",
      h1: "Your backend handles millions of transactions.\nWhen it fails — every second costs.",
      promise: "I architect the distributed systems that process 10M+ transactions/day without degradation — and I reduce transition integrations for new providers by 30%.",
      bio: "I design and implement the backend systems that digital banks, CPaaS platforms, and fintechs use to process payments and real-time messaging at scale — without the infrastructure becoming the bottleneck. Based in Cartagena, Colombia. I have worked with teams in Guatemala, Mexico, and Colombia building infrastructure that processes the digital currency of millions of people.",
      cta_bottleneck: "Describe your bottleneck →",
      cta_schedule: "Schedule a Call",
    },
    metrics: {
      throughput: "throughput",
      throughput_val: "10M+",
      throughput_desc: "10M+ messages/day — CPaaS IPCOM · zero session drops",
      
      cicd: "ci/cd",
      cicd_val: "−94%",
      cicd_desc: "6h → 20 min — Upwork Consulting · build pipeline caching & affected builds",
      
      cloud_cost: "cloud cost",
      cloud_cost_val: "−25%",
      cloud_cost_desc: "−25% cloud spend — Terraform Audit · cluster right-sizing & auto-scaling",
      
      uptime: "uptime",
      uptime_val: "99.5%",
      uptime_desc: "99.5% uptime — BYONDIT / Tigo Money · multi-zone high availability",
    },
    cases: {
      title: "Case Studies",
      intro: "Three production systems and the architectural decisions behind each. Metrics are the primary signal — each number links to a specific technical choice.",
      featured: {
        company: "IPCOM Telecomunicaciones · CPaaS & Real-Time Messaging",
        role: "Lead Backend Engineer | Real-Time Systems",
        period: "Nov 2024 – May 2025",
        desc: "Designed and built high-concurrency backend for an enterprise CPaaS platform handling real-time messaging across RCS, WhatsApp, and OTP channels. Go microservices with NATS async routing, Redis distributed caching, and OpenTelemetry tracing across all service boundaries. Migrated SIP infrastructure to PJSIP via zero-downtime session bridge. Implemented OPA Policy Generator for RBAC. Reduced MTTR by 35% through distributed tracing and Grafana operational dashboards.",
      },
      secondary1: {
        company: "Tigo Money · Fintech Guatemala",
        role: "Backend Engineer | Wallet Integrations",
        period: "Nov 2022 – Jun 2023",
        desc: "Bridged a legacy SOAP/Oracle core banking system to modern digital wallet APIs for Tigo Money Guatemala. Built custom Go plugins for KrakenD API Gateway to normalize legacy responses behind a unified surface. Implemented OAuth2/OIDC with AWS Cognito, multi-device PIN auth with lockout, and serverless fraud checks via Lambda.",
      },
      secondary2: {
        company: "Upwork Consulting · CI/CD",
        role: "SRE & Cloud Architect",
        period: "Jan 2021 – Present · Multi-client",
        desc: "Independent consulting across multiple clients with distributed Go backends running 6-hour CI pipelines. Implemented dependency graph analysis for affected-only builds, remote artifact caching, and pipeline parallelization. Same GitHub Actions quota went from one full build/day to 20+ incremental builds.",
      },
      wide: {
        company: "Tigo Money / BYONDIT · Panama Remote / Upwork",
        role: "Migrated Seams & CI/CD Pipelines",
        desc: "KrakenD acted as a migration seam with OAuth2/OIDC, AWS Cognito, multi-device PIN storage, serverless fraud validation, and PCI DSS compliance. For Upwork clients, implemented affected-only builds and remote artifact caching on GitHub Actions, paired with Terraform Kubernetes right-sizing that reduced cloud spend by 25%.",
      }
    },
    decisions: {
      heading: "Why I chose X over Y — and how much it cost to be wrong",
      intro: "Three architectural tradeoffs made in production, with the constraint, the choice, and the measurable outcome.",
      d1: {
        project: "IPCOM CPaaS",
        title: "NATS over Kafka for internal routing",
        text: "Provider adapters for Google, Meta, and Telcel needed async delivery but didn't need log compaction or replay. NATS gave us sub-millisecond latency with simpler operations — no ZooKeeper, no partition rebalancing. Direct outcome: 10M+ real-time messages/day with lower operational cost than a Kafka cluster would have required.",
      },
      d2: {
        project: "Tigo Money",
        title: "KrakenD as migration seam, not rewrite",
        text: "The wallet backend had 5+ years of SOAP/XML contracts with no single owner. Rewriting would have blocked features for months. Instead, KrakenD Go plugins normalized legacy responses behind a unified API — new services consumed the gateway, old services kept running. Direct outcome: −30% integration time for new providers, zero regression.",
      },
      d3: {
        project: "Upwork Consulting",
        title: "Affected-only builds over monorepo pipelines",
        text: "Six-hour pipeline runtimes weren't a resource problem — they were a scope problem. Building a dependency graph at CI time meant only changed services and their dependents ran tests. Combined with remote artifact caching, same GitHub Actions quota went from 1 to 20+ runs/day. Direct outcome: 6h → 20min, same infra budget.",
      }
    },
    stack: {
      heading: "Technical Index — Production",
      subtitle: "23 entries · 4 categories · 0 logos — production only",
      bio: "I architect backend systems for high-stakes environments — fintech payment platforms, real-time CPaaS infrastructure, and cloud-native distributed systems — where concurrency, security, and reliability are non-negotiable. Go is my primary tool. I own the full technical lifecycle: from architecture design to production observability. My focus is eliminating the operational debt that makes distributed systems brittle over time.",
      cat1: "Infrastructure & Cloud",
      cat2: "Languages & Runtimes",
      cat3: "Data & Messaging",
      cat4: "Observability & Architecture",
      idLabel: "ID",
      nameLabel: "NAME",
      useLabel: "PRODUCTION REVENUE / UTILIZATION",
      catLabel: "CATEGORY",
    },
    experience: {
      heading: "Experience",
      intro: "Backend engineering roles across fintech, telecom, and platform infrastructure. Each entry links to the same systems referenced in the case studies above.",
      exp1: {
        title: "Senior Backend Engineer / Cloud Architect",
        company: "Independent · Upwork · Remote",
        period: "Jan 2021 – Present",
        metric: "−94% CI/CD · −25% cloud costs · 99.5% uptime",
        desc: "Backend engineering for distributed systems teams across multiple clients — Go microservices, AI/LLM orchestration backends, CI/CD modernization, and Kubernetes infrastructure on AWS and GCP. Reduced CI/CD pipeline times from 6 hours to 20 minutes via dependency graph analysis and remote artifact caching. Designed and optimized cloud infrastructure using Terraform, cutting costs through right-sized K8s workloads.",
      },
      exp2: {
        title: "Backend Engineer | CPaaS & Real-Time Messaging",
        company: "IPCOM Telecomunicaciones · Remote · Colombia",
        period: "Nov 2024 – May 2025",
        metric: "1M+ msg/day · +50% session stability · −40% DB load · −35% MTTR",
        desc: "High-concurrency backend for an enterprise CPaaS platform handling real-time messaging across RCS, WhatsApp, and OTP channels. Built Go microservices with NATS async routing, Redis distributed caching, and OpenTelemetry tracing. Migrated SIP infrastructure to PJSIP via zero-downtime session bridge. Implemented OPA Policy Generator for RBAC. Reduced MTTR by 35% through distributed tracing and Grafana operational dashboards.",
      },
      exp3: {
        title: "Backend Engineer | Fintech & Digital Wallets",
        company: "BYONDIT · Tigo Money (Millicom) · Remote · Panama",
        period: "Nov 2022 – Jun 2023",
        metric: "−30% integration time",
        desc: "Bridged a legacy SOAP/Oracle core banking system to modern digital wallet APIs for Tigo Money Guatemala. Built custom Go plugins for KrakenD API Gateway to normalize legacy responses behind a unified surface. Implemented OAuth2/OIDC with AWS Cognito, multi-device PIN auth with lockout, and serverless fraud checks via Lambda.",
      },
      exp4: {
        title: "Software QA Tester | Quality Assurance & Testing",
        company: "Elemento 43 · Internship · Cartagena, Colombia",
        period: "Jun 2020 – Nov 2020",
        metric: "−25% defect rate",
        desc: "Automated end-to-end and API test suites using Cypress, Cucumber (BDD), and Postman. Integrated regression suites into CI/CD pipelines. Reduced pre-production defect rate by 25%.",
      }
    },
    certs: {
      heading: "Certifications",
      education: "Education",
      edu1: {
        title: "B.S. Systems Engineering",
        school: "Tecnológico Comfenalco · Academically completed",
        date: "Expected Oct 2026",
      },
      edu2: {
        title: "Diploma in Data & Information Analytics",
        school: "Tecnológico Comfenalco · In progress",
        date: "Expected Jul 2026",
      },
      edu3: {
        title: "Software Development Technologist",
        school: "Tecnológico Comfenalco · 104 credits completed",
        date: "Completed 2024",
      },
      edu4: {
        title: "Associate's in Software Programming",
        school: "SENA · Completed",
        date: "Completed 2017",
      }
    },
    contact: {
      heading: "Contact",
      intro: "If you're scaling a distributed backend and the infrastructure is becoming the bottleneck — payment processing, messaging pipelines, cloud costs growing faster than usage — that's a good reason to talk.",
      step1: "15-minute call",
      desc1: "You describe the system and the problem. I ask the questions that define scope and whether I can actually help.",
      step2: "Architecture audit",
      desc2: "I review current state — services, infra, CI/CD, cloud spend — and identify the real bottleneck, not the visible symptom.",
      step3: "Proposal",
      desc3: "Concrete scope, timeline, and engagement structure. No retainer until there's agreement on the problem definition.",
      async: "Prefer async?",
      book: "Book a 15-min call",
      caltext: "Prefer a quick sync? I keep open slots for architecture reviews and scoping calls — no commitment needed.",
      callink: "Open scheduling page →",
      fallback: "Send an email →"
    }
  },
  es: {
    skip: "Saltar al contenido principal",
    nav: {
      cases: "Casos de Estudio",
      decisions: "Decisiones",
      stack: "Stack",
      experience: "Experiencia",
      contact: "Contacto",
    },
    hero: {
      eyebrow: "Ingeniero Backend · Remoto · Cartagena, Colombia",
      h1: "Tu backend maneja millones de transacciones.\nCuando falla — cada segundo cuesta.",
      promise: "Arquitecto los sistemas distribuidos que procesan 10M+ transacciones/día sin degradación — y reduzco el tiempo de integración de nuevos proveedores en un 30%.",
      bio: "Diseño e implemento los sistemas de backend que bancos digitales, plataformas CPaaS y fintechs usan para procesar pagos y mensajes en tiempo real a escala — sin que la infraestructura se convierta en el cuello de botella. Basado en Cartagena, Colombia. He trabajado con equipos en Guatemala, México y Colombia construyendo infraestructura que procesa el dinero digital de millones de personas.",
      cta_bottleneck: "Describe tu cuello de botella →",
      cta_schedule: "Agendar una Llamada",
    },
    metrics: {
      throughput: "transacciones",
      throughput_val: "10M+",
      throughput_desc: "10M+ eventos/día — CPaaS IPCOM · sin caída de sesiones",
      
      cicd: "ci/cd",
      cicd_val: "−94%",
      cicd_desc: "−94% CI/CD — Consultoría Upwork · automatización de pruebas y caché",
      
      cloud_cost: "costo cloud",
      cloud_cost_val: "−25%",
      cloud_cost_desc: "−25% costo cloud — Auditoría Terraform · redimensionamiento de clusters",
      
      uptime: "uptime",
      uptime_val: "99.5%",
      uptime_desc: "99.5% uptime — BYONDIT / Tigo Money · alta disponibilidad multizona",
    },
    cases: {
      title: "Casos de Estudio",
      intro: "Tres sistemas en producción y las decisiones arquitectónicas detrás de cada uno. Las métricas son la señal primaria — cada número enlaza a una elección técnica específica.",
      featured: {
        company: "IPCOM Telecomunicaciones · CPaaS & Real-Time Messaging",
        role: "Lead Backend Engineer | Real-Time Systems",
        period: "Nov 2024 – May 2025",
        desc: "Diseñado y construido backend de alta concurrencia para plataforma CPaaS empresarial con mensajería en tiempo real a través de RCS, WhatsApp y OTP. Microservicios Go con routing asíncrono NATS, caché distribuida Redis y trazabilidad OpenTelemetry. Migración de infraestructura SIP a PJSIP con session bridge cero downtime. Implementé OPA Policy Generator para RBAC. Reduje MTTR en 35% mediante trazabilidad distribuida y dashboards operativos en Grafana.",
      },
      secondary1: {
        company: "Tigo Money · Fintech Guatemala",
        role: "Backend Engineer | Wallet Integrations",
        period: "Nov 2022 – Jun 2023",
        desc: "Puente entre un sistema core bancario legacy SOAP/Oracle y APIs modernas de billetera digital para Tigo Money Guatemala. Plugins Go personalizados para KrakenD API Gateway normalizando respuestas legacy. Implementé OAuth2/OIDC con AWS Cognito, autenticación PIN multi-dispositivo con bloqueo y validación de fraudes serverless con Lambda.",
      },
      secondary2: {
        company: "Upwork Consulting · CI/CD",
        role: "SRE & Cloud Architect",
        period: "Ene 2021 – Presente · Multi-cliente",
        desc: "Consultoría independiente para múltiples clientes con backends Go distribuidos y pipelines CI de 6 horas. Implementé análisis de grafo de dependencias para builds afectados, caché remoto de artefactos y paralelización de pipelines. La misma cuota de GitHub Actions pasó de 1 build completo/día a 20+ builds incrementales.",
      },
      wide: {
        company: "Tigo Money / BYONDIT · Panamá Remote / Upwork",
        role: "Costura de Migración & Pipelines CI/CD",
        desc: "KrakenD funcionó como costura de migración con OAuth2/OIDC, AWS Cognito, PIN de almacenamiento multidispositivo, validación serverless contra fraudes y alineación de normativas PCI DSS. Para clientes de Upwork, logramos builds selectivos (affected-only) y caché remoto de artefactos en GitHub Actions, respaldado por una reoptimización de cargas en Kubernetes con Terraform de −25% costo.",
      }
    },
    decisions: {
      heading: "Por qué elegí X sobre Y — y cuánto costó equivocarse",
      intro: "Tres decisiones de diseño tomadas en producción, con la restricción, la elección y el resultado medible.",
      d1: {
        project: "CPaaS IPCOM",
        title: "NATS sobre Kafka para routing interno",
        text: "Los adaptadores de Google, Meta y Telcel necesitaban entrega asíncrona pero no requerían log compaction ni replay. NATS nos dio latencia submilisegundo con operación más simple — sin ZooKeeper, sin rebalanceo de particiones. Direct outcome: 10M+ reales de mensajes/día con menor costo operativo.",
      },
      d2: {
        project: "Tigo Money",
        title: "KrakenD como seam de migración, no reescritura",
        text: "El backend de billetera tenía 5+ años de contratos SOAP/XML sin un solo dueño. Reescribir habría bloqueado funcionalidades por meses. En su lugar, plugins Go de KrakenD normalizaron respuestas legacy detrás de una API unificada. Direct outcome: −30% en tiempo de integración, cero regresiones.",
      },
      d3: {
        project: "Consultoría Upwork",
        title: "Builds afectados vs pipelines monorepo",
        text: "Pipelines de 6 horas no eran un problema de recursos — eran un problema de alcance. Construir un grafo de dependencias en CI significó que solo los servicios modificados y sus dependientes ejecutaran tests. Con caché remoto, la misma cuota de GitHub Actions pasó de un build completo por día a 20+ builds incrementales. Direct outcome: 6h → 20min, misma infra.",
      }
    },
    stack: {
      heading: "Índice Técnico — Producción",
      subtitle: "23 entradas · 4 categorías · 0 logos — solo producción",
      bio: "Arquitecto de sistemas backend para entornos de alta concurrencia alimentando bancos digitales, CPaaS en tiempo real e infraestructuras financieras cloud-native. Como herramental primigenio selecciono Go. Domino el espectro absoluto del ciclo: desde el diseño estratégico hasta la observabilidad productiva. Mi foco radica en la eliminación de deuda técnica oculta para forjar backends de extrema tolerancia al desborde de carga.",
      cat1: "Infraestructura & Cloud",
      cat2: "Lenguajes & Runtimes",
      cat3: "Datos & Mensajería",
      cat4: "Observabilidad y Arquitectura",
      idLabel: "ID",
      nameLabel: "TECNOLOGÍA",
      useLabel: "ESTADO EN PRODUCCIÓN / RENDIMIENTO EN VOLUMEN",
      catLabel: "CATEGORÍA",
    },
    experience: {
      heading: "Experiencia",
      intro: "Roles de ingeniería backend en fintech, telecomunicaciones e infraestructura de plataforma. Cada entrada enlaza a los mismos sistemas referenciados en los casos de estudio.",
      exp1: {
        title: "Senior Backend Engineer / Cloud Architect",
        company: "Independiente · Upwork · Remoto",
        period: "Ene 2021 – Presente",
        metric: "−94% CI/CD · −25% costos cloud · 99.5% uptime",
        desc: "Ingeniería backend para equipos de sistemas distribuidos en múltiples clientes — microservicios Go, backends de orquestación AI/LLM, modernización CI/CD e infraestructura Kubernetes en AWS y GCP. Reduje tiempos de pipeline CI/CD de 6 horas a 20 minutos mediante análisis de grafos de dependencias y caché remoto de artefactos. Diseñé y optimicé infraestructura cloud con Terraform, reduciendo costos mediante right-sizing de cargas K8s.",
      },
      exp2: {
        title: "Backend Engineer | CPaaS y Mensajería en Tiempo Real",
        company: "IPCOM Telecomunicaciones · Remoto · Colombia",
        period: "Nov 2024 – May 2025",
        metric: "1M+ msg/día · +50% estabilidad sesiones · −40% carga BD · −35% MTTR",
        desc: "Backend de alta concurrencia para plataforma CPaaS empresarial con mensajería en tiempo real a través de RCS, WhatsApp y OTP. Construí microservicios Go con routing asíncrono NATS, caché distribuida Redis y trazabilidad OpenTelemetry. Migré infraestructura SIP a PJSIP con session bridge cero downtime. Implementé OPA Policy Generator para RBAC. Reduje MTTR en 35% mediante trazabilidad distribuida y dashboards operativos en Grafana.",
      },
      exp3: {
        title: "Backend Engineer | Fintech y Billeteras Digitales",
        company: "BYONDIT · Tigo Money (Millicom) · Remoto · Panamá",
        period: "Nov 2022 – Jun 2023",
        metric: "−30% tiempo integración",
        desc: "Construí un puente entre un sistema core bancario legacy SOAP/Oracle y APIs modernas de billetera digital para Tigo Money Guatemala. Plugins Go personalizados para KrakenD API Gateway normalizando respuestas legacy. Implementé OAuth2/OIDC con AWS Cognito, autenticación PIN multi-dispositivo con bloqueo y validación de fraudes serverless con Lambda.",
      },
      exp4: {
        title: "Software QA Tester | Aseguramiento de Calidad y Pruebas",
        company: "Elemento 43 · Internado · Cartagena, Colombia",
        period: "Jun 2020 – Nov 2020",
        metric: "−25% tasa de defectos",
        desc: "Automaticé suites de prueba end-to-end y API con Cypress, Cucumber (BDD) y Postman. Integré suites de regresión en pipelines CI/CD. Reduje la tasa de defectos en pre-producción en 25%.",
      }
    },
    certs: {
      heading: "Certificaciones",
      education: "Educación",
      edu1: {
        title: "Ingeniería de Sistemas",
        school: "Tecnológico Comfenalco · Completado académicamente",
        date: "Esperado Oct 2026",
      },
      edu2: {
        title: "Diplomado en Analítica de Datos e Información",
        school: "Tecnológico Comfenalco · En curso",
        date: "Esperado Jul 2026",
      },
      edu3: {
        title: "Tecnólogo en Desarrollo de Software",
        school: "Tecnológico Comfenalco · 104 créditos completados",
        date: "Completado 2024",
      },
      edu4: {
        title: "Tecnólogo en Programación de Software",
        school: "SENA · Completado",
        date: "Completado 2017",
      }
    },
    contact: {
      heading: "Contacto",
      intro: "Si estás escalando un backend distribuido y la infraestructura se está convirtiendo en el cuello de botella — procesamiento de pagos, pipelines de mensajería, costos cloud creciendo más rápido que el uso — esa es una buena razón para hablar.",
      step1: "Llamada de 15 min",
      desc1: "Tú describes el sistema y el problema. Yo hago las preguntas que definen el alcance y si realmente puedo ayudar.",
      step2: "Auditoría de arquitectura",
      desc2: "Reviso el estado actual — servicios, infra, CI/CD, gasto cloud — e identifico el verdadero cuello de botella, no el síntoma visible.",
      step3: "Propuesta",
      desc3: "Alcance concreto, cronograma y estructura de compromiso. Sin retainer hasta que haya acuerdo sobre la definición del problema.",
      async: "¿Prefieres async?",
      book: "Agenda llamada de 15 min",
      caltext: "¿Prefieres una sincronización rápida? Mantengo espacios abiertos para revisiones de arquitectura — sin compromiso.",
      callink: "Abrir página de agenda →",
      fallback: "Enviar un email →"
    }
  }
};

export const techIndex: TechEntry[] = [
  { id: "INF-001", name: "Kubernetes", category: "Infrastructure", catEs: "Infraestructura", descEs: "Orquestación de microservicios Go en AWS EKS y GCP GKE. Right-sizing con Terraform. 99.5% uptime logrado en consultoría Upwork.", descEn: "Orchestration of Go microservices on AWS EKS and GCP GKE. Right-sizing with Terraform. 99.5% uptime achieved on Upwork." },
  { id: "INF-002", name: "Terraform", category: "Infrastructure", catEs: "Infraestructura", descEs: "IaC para provisioning cloud multi-región. Redujo costos cloud en −25% mediante K8s workload right-sizing.", descEn: "IaC for multi-region cloud provisioning. Reduced cloud spend by −25% via K8s workload right-sizing." },
  { id: "INF-003", name: "GCP (GKE)", category: "Infrastructure", catEs: "Infraestructura", descEs: "Despliegues productivos de pipelines asíncronos y bases de datos cloud mediante terraformación.", descEn: "Production deployments of asynchronous pipelines and cloud databases through Terraform." },
  { id: "INF-004", name: "AWS (EKS)", category: "Infrastructure", catEs: "Infraestructura", descEs: "Configuración de clústeres elásticos y pasarelas IAM privadas para comunicación de alta seguridad.", descEn: "Elastic cluster configuration and private IAM gateways for highly secure microservices." },
  { id: "INF-005", name: "Docker", category: "Infrastructure", catEs: "Infraestructura", descEs: "Contenerización avanzada de servicios con compilación multitejido, optimizando capas de caché.", descEn: "Advanced containerization of core services with multi-stage builds, optimizing memory layers." },
  { id: "INF-006", name: "GitHub Actions", category: "Infrastructure", catEs: "Infraestructura", descEs: "Automatización de flujos de integración continua afectados (affected-only) y entrega distribuida.", descEn: "Monorepo continuous integration with selective affected-only builds and parallel delivery." },
  { id: "LNG-001", name: "Go", category: "Language", catEs: "Lenguaje", descEs: "Lenguaje primario. Microservicios IPCOM CPaaS, plugins KrakenD Tigo Money, CLI tools, worker pools de alta concurrencia.", descEn: "Primary language. Core IPCOM CPaaS microservices, KrakenD Tigo Money plugins, high-concurrency worker pools." },
  { id: "LNG-002", name: "Python", category: "Language", catEs: "Lenguaje", descEs: "Secundario. Scripts de analítica de datos pesados, simuladores bancarios y colas de tareas AWS Lambda.", descEn: "Secondary language. Used for heavy data analytics, core banking simulators, and AWS Lambda queues." },
  { id: "LNG-003", name: "Dart / Flutter", category: "Language", catEs: "Lenguaje", descEs: "Integración frontend. Conexión nativa de billeteras digitales con hilos reactivos a bajo nivel.", descEn: "Frontend integration. Native mobile digital wallet connections with low-level reactive streams." },
  { id: "LNG-004", name: "SQL", category: "Language", catEs: "Lenguaje", descEs: "Consultas analíticas estructuradas complejas, disparadores y optimización fina de planes de ejecución.", descEn: "Complex structured analytics queries, database triggers, and performance execution plan tuning." },
  { id: "LNG-005", name: "Bash Scripting", category: "Language", catEs: "Lenguaje", descEs: "Automatización de tareas complejas de sistema, backups y análisis local de logs en producción.", descEn: "System automation tasks, database backups, and local production log analyzer utilities." },
  { id: "DAT-001", name: "NATS", category: "Data & Messaging", catEs: "Datos & Mensajería", descEs: "Message broker para routing asíncrono en IPCOM. Elegido sobre Kafka por latencia sub-ms sin overhead de ZooKeeper. 1M+ msg/día en producción.", descEn: "Message broker for async routing in IPCOM. Sub-ms latency without ZooKeeper. 1M+ msg/day in production." },
  { id: "DAT-002", name: "Redis", category: "Data & Messaging", catEs: "Datos & Mensajería", descEs: "Caché distribuida para session state en CPaaS. Redujo carga de BD en −40% en IPCOM. PIN multi-device store en Tigo Money.", descEn: "Distributed cache for session state in CPaaS. Reduced database load by −40% in IPCOM. Multi-device PIN store." },
  { id: "DAT-003", name: "PostgreSQL", category: "Data & Messaging", catEs: "Datos & Mensajería", descEs: "Base relacional primaria. Diseño de índices avanzados, particionamiento e hilos altamente transaccionales.", descEn: "Primary relational database. Advanced index design, horizontal partitioning, and safe transactions." },
  { id: "DAT-004", name: "Kafka", category: "Data & Messaging", catEs: "Datos & Mensajería", descEs: "Streaming distribuido y arquitectura dirigida por eventos para reintentos y tolerancia a fallas.", descEn: "Distributed streaming engine and event-driven backplanes for resilient failed-delivery retries." },
  { id: "DAT-005", name: "DynamoDB", category: "Data & Messaging", catEs: "Datos & Mensajería", descEs: "Persistencia NoSQL tolerante a latencia para bloqueos instantáneos de fraude en AWS Lambda.", descEn: "NoSQL document persistence for ultra low-latency fraud lockouts on AWS Lambda serverless." },
  { id: "DAT-006", name: "KrakenD", category: "Data & Messaging", catEs: "Datos & Mensajería", descEs: "API Gateway proxy de Ultra performance. Normalización central SOAP-REST y balanceos dinámicos.", descEn: "Ultra high-performance API Gateway proxy. Native SOAP-to-REST transformations and load balancing." },
  { id: "DAT-007", name: "Oracle DB", category: "Data & Messaging", catEs: "Datos & Mensajería", descEs: "Extracción y persistencia directa de core bancario legacy, SPs optimizados y transaccionalidad pesada.", descEn: "Direct integration with core bank databases, procedural optimizing, and transactional safety." },
  { id: "OBS-001", name: "OpenTelemetry", category: "Observability & Architecture", catEs: "Observabilidad", descEs: "Trazabilidad distribuida end-to-end en IPCOM CPaaS. Redujo MTTR en −35% al correlacionar trazas cross-service en Grafana.", descEn: "Distributed end-to-end tracing in IPCOM. Reduced MTTR by −35% by correlating cross-service traces." },
  { id: "OBS-002", name: "Grafana", category: "Observability & Architecture", catEs: "Observabilidad", descEs: "Diseño de tableros de rendimiento en tiempo real, alarmado integrado para picos de latencia CPaaS.", descEn: "Custom telemetry visualization and proactive alerting for latency spikes across channels." },
  { id: "OBS-003", name: "Prometheus", category: "Observability & Architecture", catEs: "Observabilidad", descEs: "Recolección optimizada de métricas de rendimiento interno de hilos de Go y latencias HTTP.", descEn: "Scraping of custom system metrics, active Go routine count, and raw HTTP response latencies." },
  { id: "OBS-004", name: "gRPC", category: "Observability & Architecture", catEs: "Observabilidad", descEs: "Llamadas a procedimientos remotos en microservicios internos, con formato binario ultra liviano.", descEn: "Core microservice RPC communications, protocol buffers definition, and minimal payload size." },
  { id: "OBS-005", name: "Clean Architecture", category: "Observability & Architecture", catEs: "Observabilidad", descEs: "Desacoplamiento de hilos de infraestructura y negocio. Cobertura de tests unitarios robustos.", descEn: "Strict separation of domain limits and application adapters, providing high unit test coverage." }
];
