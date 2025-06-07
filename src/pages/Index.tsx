import { useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Zap,
  Users,
  Cog,
  Server,
  DollarSign,
  BarChart3,
  Sparkles,
  Brain,
  Shield,
  MessageSquare,
  Calculator,
  FileText,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import InfiniteScroll from "@/components/InfiniteScroll";

// Animation variants for consistent story scrolling
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("dev");
  const { scrollY } = useScroll();

  // Parallax transforms for background elements
  const yBg1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yBg3 = useTransform(scrollY, [0, 1000], [0, -50]);

  const devBenefits = [
    {
      icon: Server,
      title: "Deploy sin complicaciones",
      description:
        "Tu MCP Agent en producción en minutos. Nos encargamos de la infraestructura, escalado y monitoreo 24/7.",
    },
    {
      icon: DollarSign,
      title: "Monetización automática",
      description:
        "Sistema de facturación integrado. Cobra por uso, suscripciones o modelo freemium sin código adicional.",
    },
    {
      icon: BarChart3,
      title: "Analytics incluidos",
      description:
        "Dashboard completo con métricas de uso, rendimiento y revenue. Optimiza tu agente con datos reales.",
    },
  ];

  const userBenefits = [
    {
      icon: Brain,
      title: "Inteligencia adaptativa",
      description:
        "Universal Bot analiza tu solicitud y selecciona automáticamente la mejor herramienta disponible.",
    },
    {
      icon: Sparkles,
      title: "Una conversación, infinitas herramientas",
      description:
        "Accede a cientos de agentes especializados desde una sola interfaz. Sin cambiar de app.",
    },
    {
      icon: Shield,
      title: "Siempre actualizado",
      description:
        "Nuevas herramientas se integran automáticamente. Siempre tendrás acceso a lo más avanzado.",
    },
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: "Asistente Personal Inteligente",
      description:
        "María, ejecutiva, necesita organizar su día. Universal Bot accede automáticamente a su calendario, email y tareas, sugiriendo la mejor agenda.",
      audience: "Profesionales ocupados",
    },
    {
      icon: GraduationCap,
      title: "Tutor Educativo Adaptativo",
      description:
        "Carlos, estudiante de ingeniería, pregunta sobre cálculo. El bot selecciona la herramienta matemática adecuada y adapta la explicación a su nivel.",
      audience: "Estudiantes y educadores",
    },
    {
      icon: Briefcase,
      title: "Consultor de Negocios",
      description:
        "Ana, emprendedora, necesita analizar su mercado. Universal Bot combina herramientas de investigación, análisis financiero y presentaciones automáticamente.",
      audience: "Emprendedores y PYMES",
    },
    {
      icon: Calculator,
      title: "Asistente Financiero Familiar",
      description:
        "Pedro quiere planificar las vacaciones familiares. El bot calcula presupuestos, compara opciones y sincroniza con el calendario familiar.",
      audience: "Familias y uso personal",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 overflow-x-hidden">
      {/* Hero Section with Tab Switcher */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ y: yBg1 }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl"
            style={{ y: yBg2 }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl"
            style={{ y: yBg3 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </motion.div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Tab Switcher */}
          <motion.div variants={fadeInUp}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-12"
            >
              <TabsList className="grid w-fit mx-auto grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
                <TabsTrigger
                  value="dev"
                  className="flex items-center gap-2 px-6 py-3 transition-all duration-300"
                >
                  <Cog className="w-4 h-4" />
                  Desarrolladores
                </TabsTrigger>
                <TabsTrigger
                  value="user"
                  className="flex items-center gap-2 px-6 py-3 transition-all duration-300"
                >
                  <Users className="w-4 h-4" />
                  Usuarios Finales
                </TabsTrigger>
              </TabsList>

              {/* Dev Content */}
              <TabsContent value="dev">
                <motion.div
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-medium"
                    variants={scaleIn}
                  >
                    <Zap className="w-4 h-4" />
                    Para Desarrolladores
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                    variants={fadeInUp}
                  >
                    Despliega tu
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                      {" "}
                      MCP Agent
                    </span>
                    <br />
                    sin complicaciones
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    variants={fadeInUp}
                  >
                    Universal Bot maneja toda la infraestructura, hosting y
                    facturación de tu agente MCP. Tú enfócate en crear, nosotros
                    nos encargamos del resto.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
                    variants={fadeInUp}
                  >
                    <Button
                      size="lg"
                      className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                    >
                      Empezar gratis
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Ver documentación
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>

              {/* User Content */}
              <TabsContent value="user">
                <motion.div
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100/80 rounded-full text-purple-700 text-sm font-medium"
                    variants={scaleIn}
                  >
                    <Users className="w-4 h-4" />
                    Para Usuarios Finales
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                    variants={fadeInUp}
                  >
                    Tu asistente
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
                      {" "}
                      universal
                    </span>
                    <br />
                    inteligente
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    variants={fadeInUp}
                  >
                    Universal Bot elige automáticamente la mejor herramienta
                    para cada tarea. Una sola conversación, infinitas
                    posibilidades.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
                    variants={fadeInUp}
                  >
                    <Button
                      size="lg"
                      className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                    >
                      Pruébalo gratis
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Ver casos de uso
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-sm mb-2">Descubre más</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </motion.div>
      </section>

      {/* What is Universal Bot Section */}
      <motion.section
        className="py-20 px-4 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Qué es Universal Bot?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un orquestador inteligente de herramientas MCP que conecta
              desarrolladores y usuarios con las mejores soluciones para cada
              necesidad específica.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Más que un motor de orquestación tradicional
                </h3>
                <p className="text-gray-600 text-lg">
                  Universal Bot utiliza el protocolo MCP (Model Context
                  Protocol) para crear un ecosistema donde cada herramienta
                  especializada puede ser descubierta y utilizada de manera
                  inteligente según el contexto de cada conversación.
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                <motion.div
                  className="p-4 bg-blue-50 rounded-lg transform hover:scale-105 transition-all duration-300"
                  variants={scaleIn}
                >
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Para Desarrolladores
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Deploy, hosting y monetización automática de tus agentes MCP
                  </p>
                </motion.div>
                <motion.div
                  className="p-4 bg-purple-50 rounded-lg transform hover:scale-105 transition-all duration-300"
                  variants={scaleIn}
                >
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Para Usuarios
                  </h4>
                  <p className="text-purple-700 text-sm">
                    Acceso inteligente a todas las herramientas desde una
                    conversación
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Zap className="w-12 h-12 text-white" />
                  </motion.div>
                  <p className="text-lg font-medium">Diagrama interactivo</p>
                  <p className="text-sm">Próximamente</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section with Dynamic Content */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {activeTab === "dev"
                ? "Beneficios para Desarrolladores"
                : "Beneficios para Usuarios"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeTab === "dev"
                ? "Enfócate en crear mientras nosotros manejamos toda la infraestructura y monetización"
                : "Una experiencia fluida que se adapta a tus necesidades específicas"}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {(activeTab === "dev" ? devBenefits : userBenefits).map(
              (benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                        activeTab === "dev"
                          ? "bg-gradient-to-br from-blue-500 to-purple-500"
                          : "bg-gradient-to-br from-purple-500 to-blue-500"
                      }`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {benefit.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              }
            )}
          </motion.div>

          {/* CTA Section within Benefits */}
          <motion.div className="text-center mt-16" variants={fadeInUp}>
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                activeTab === "dev"
                  ? "bg-blue-100/80 text-blue-700"
                  : "bg-purple-100/80 text-purple-700"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              {activeTab === "dev"
                ? "Empieza a monetizar hoy"
                : "Pruébalo gratis"}
            </motion.div>

            <Button
              size="lg"
              className={`px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 ${
                activeTab === "dev"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              }`}
            >
              {activeTab === "dev" ? "Crear mi MCP Agent" : "Comenzar ahora"}
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Partners/MCP Agents Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 rounded-full text-blue-700 text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              Ecosistema MCP
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Partners & MCP Agents
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Conectamos con los mejores agentes MCP especializados para que
              tengas acceso a herramientas de última generación desde una sola
              conversación.
            </p>
          </motion.div>

          {/* Infinite Scroll Container */}
          <motion.div className="relative" variants={fadeInUp}>
            {/* Gradient overlays para efecto fade */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-blue-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-purple-50 to-transparent z-10"></div>

            <InfiniteScroll />
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <p className="text-gray-500 mb-6">
              Y más integraciones llegando cada semana
            </p>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 transform hover:scale-105 transition-all duration-300"
            >
              Ver todas las integraciones
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <motion.section
        className="py-20 px-4 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 rounded-full text-blue-700 text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              Casos de uso reales
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Historias de éxito
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre cómo Universal Bot transforma la manera en que las
              personas interactúan con la tecnología en su día a día.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            {useCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:scale-105"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0"
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {useCase.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4">
                        {useCase.description}
                      </p>

                      <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full">
                        <span className="text-sm text-blue-700 font-medium">
                          {useCase.audience}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-8"
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4" />
            Únete a la revolución de la IA
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            variants={fadeInUp}
          >
            ¿Listo para experimentar el futuro?
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12"
            variants={fadeInUp}
          >
            Universal Bot está esperando para revolucionar tu manera de
            trabajar. Una conversación, infinitas posibilidades.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={fadeInUp}
          >
            <Button
              size="lg"
              className="px-10 py-5 text-lg bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() =>
                window.open(
                  "https://wa.me/1234567890?text=Hola%2C%20quiero%20probar%20Universal%20Bot",
                  "_blank"
                )
              }
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Probar ahora
            </Button>
            <p className="text-white/80 text-sm">
              Respuesta inmediata por WhatsApp
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
