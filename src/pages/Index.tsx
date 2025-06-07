
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowDown, Zap, Users, Cog } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dev");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Hero Section with Tab Switcher */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Tab Switcher */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-fit mx-auto grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
              <TabsTrigger value="dev" className="flex items-center gap-2 px-6 py-3">
                <Cog className="w-4 h-4" />
                Desarrolladores
              </TabsTrigger>
              <TabsTrigger value="user" className="flex items-center gap-2 px-6 py-3">
                <Users className="w-4 h-4" />
                Usuarios Finales
              </TabsTrigger>
            </TabsList>

            {/* Dev Content */}
            <TabsContent value="dev" className="animate-fade-in">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Para Desarrolladores
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Despliega tu
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent"> MCP Agent</span>
                  <br />
                  sin complicaciones
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Universal Bot maneja toda la infraestructura, hosting y facturación de tu agente MCP. 
                  Tú enfócate en crear, nosotros nos encargamos del resto.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                  <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Empezar gratis
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    Ver documentación
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* User Content */}
            <TabsContent value="user" className="animate-fade-in">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100/80 rounded-full text-purple-700 text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Para Usuarios Finales
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Tu asistente
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 bg-clip-text text-transparent"> universal</span>
                  <br />
                  inteligente
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Universal Bot elige automáticamente la mejor herramienta para cada tarea. 
                  Una sola conversación, infinitas posibilidades.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                  <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Pruébalo gratis
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    Ver casos de uso
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-gray-500">
            <span className="text-sm mb-2">Descubre más</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* What is Universal Bot Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Qué es Universal Bot?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un orquestador inteligente de herramientas MCP que conecta desarrolladores y usuarios 
              con las mejores soluciones para cada necesidad específica.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Más que un motor de orquestación tradicional
                </h3>
                <p className="text-gray-600 text-lg">
                  Universal Bot utiliza el protocolo MCP (Model Context Protocol) para crear 
                  un ecosistema donde cada herramienta especializada puede ser descubierta 
                  y utilizada de manera inteligente según el contexto de cada conversación.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Para Desarrolladores</h4>
                  <p className="text-blue-700 text-sm">
                    Deploy, hosting y monetización automática de tus agentes MCP
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Para Usuarios</h4>
                  <p className="text-purple-700 text-sm">
                    Acceso inteligente a todas las herramientas desde una conversación
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-lg font-medium">Diagrama interactivo</p>
                  <p className="text-sm">Próximamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Sections */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Más secciones en desarrollo...
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Beneficios específicos</h3>
              <p className="text-gray-600">Dev vs User benefits con animaciones</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Partners MCP</h3>
              <p className="text-gray-600">Grid animado de integraciones activas</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Casos de uso</h3>
              <p className="text-gray-600">Micro-historias con scrollytelling</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
