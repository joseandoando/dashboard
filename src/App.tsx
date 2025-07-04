import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Globe, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'down' | 'slow';
  uptime: string;
  responseTime: string;
  requests: string;
  icon: React.ReactNode;
}

const services: ServiceStatus[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '45ms',
    requests: '2.3M',
    icon: <Server className="w-8 h-8" />
  },
  {
    id: 'database',
    name: 'Base de Datos',
    status: 'slow',
    uptime: '99.5%',
    responseTime: '120ms',
    requests: '1.8M',
    icon: <Database className="w-8 h-8" />
  },
  {
    id: 'frontend',
    name: 'Frontend Web',
    status: 'operational',
    uptime: '100%',
    responseTime: '28ms',
    requests: '5.2M',
    icon: <Globe className="w-8 h-8" />
  }
];

const getStatusConfig = (status: ServiceStatus['status']) => {
  switch (status) {
    case 'operational':
      return {
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        gradient: 'from-emerald-500 to-green-600',
        icon: <CheckCircle className="w-6 h-6" />,
        text: 'Operativo'
      };
    case 'down':
      return {
        color: 'text-red-600',
        bg: 'bg-red-50',
        gradient: 'from-red-500 to-rose-600',
        icon: <AlertCircle className="w-6 h-6" />,
        text: 'Caído'
      };
    case 'slow':
      return {
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        gradient: 'from-amber-500 to-orange-600',
        icon: <Clock className="w-6 h-6" />,
        text: 'Lento'
      };
  }
};

const ServiceCard: React.FC<{ service: ServiceStatus; index: number }> = ({ service, index }) => {
  const statusConfig = getStatusConfig(service.status);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${statusConfig.bg} ${statusConfig.color}`}>
            {service.icon}
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
            {statusConfig.icon}
            <span className="text-sm font-medium">{statusConfig.text}</span>
          </div>
        </div>

        {/* Service Name */}
        <h3 className="text-xl font-semibold text-gray-800 mb-6">{service.name}</h3>

        {/* Status Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Estado del servicio</span>
            <span className={`text-sm font-medium ${statusConfig.color}`}>
              {service.uptime} uptime
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${statusConfig.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${parseFloat(service.uptime)}%` }}
              transition={{ delay: index * 0.2, duration: 1 }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-600">Tiempo de respuesta</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{service.responseTime}</span>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-600">Peticiones</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{service.requests}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ 
  title, 
  value, 
  icon, 
  color 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Dashboard de Monitoreo
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
              TI
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Monitoreo en tiempo real del estado de servicios críticos
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Servicios Activos"
            value="3/3"
            icon={<Activity className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-emerald-500 to-green-600"
          />
          <StatCard
            title="Tiempo Promedio"
            value="64ms"
            icon={<Zap className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-blue-500 to-indigo-600"
          />
          <StatCard
            title="Usuarios Activos"
            value="1.2K"
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-purple-500 to-pink-600"
          />
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 text-gray-500"
        >
          <p className="text-sm">
            Última actualización: {new Date().toLocaleTimeString('es-ES')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;