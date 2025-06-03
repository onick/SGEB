import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Calendar,
  User,
  FileText,
  Target,
  BarChart3,
  GitBranch,
  Zap
} from 'lucide-react';

const DevelopmentPlan = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Plan de desarrollo estructurado
  const developmentPlan = {
    projectInfo: {
      name: "SGEV2 - Sistema de Gestión de Eventos",
      version: "2.0",
      startDate: "2024-01-15",
      estimatedCompletion: "2024-04-30",
      description: "Sistema completo de gestión de eventos con interfaz de kiosco y panel administrativo"
    },
    phases: [
      {
        id: 1,
        name: "Fase 1: Configuración Base",
        description: "Configuración inicial del proyecto y estructura base",
        estimatedDays: 5,
        tasks: [
          {
            id: 1,
            title: "Configuración del entorno de desarrollo",
            description: "Instalar y configurar React, Vite, TailwindCSS",
            priority: "high",
            estimatedHours: 4,
            status: "completed",
            assignee: "Developer",
            completedDate: "2024-01-15"
          },
          {
            id: 2,
            title: "Estructura de carpetas y arquitectura",
            description: "Organizar la estructura del proyecto siguiendo mejores prácticas",
            priority: "high",
            estimatedHours: 3,
            status: "completed",
            assignee: "Developer",
            completedDate: "2024-01-15"
          },
          {
            id: 3,
            title: "Configuración de Supabase",
            description: "Configurar la base de datos y autenticación",
            priority: "high",
            estimatedHours: 6,
            status: "completed",
            assignee: "Developer",
            completedDate: "2024-01-16"
          },
          {
            id: 4,
            title: "Sistema de navegación básico",
            description: "Implementar React Router y navegación entre páginas",
            priority: "medium",
            estimatedHours: 4,
            status: "completed",
            assignee: "Developer",
            completedDate: "2024-01-16"
          }
        ]
      },
      {
        id: 2,
        name: "Fase 2: Módulo Administrativo",
        description: "Desarrollo del panel de administración completo",
        estimatedDays: 15,
        tasks: [
          {
            id: 5,
            title: "Sistema de autenticación admin",
            description: "Login seguro para administradores",
            priority: "high",
            estimatedHours: 8,
            status: "completed",
            assignee: "Developer",
            completedDate: "2024-01-18"
          },
          {
            id: 6,
            title: "Dashboard administrativo",
            description: "Panel principal con métricas y resumen",
            priority: "high",
            estimatedHours: 12,
            status: "in-progress",
            assignee: "Developer",
            progress: 75
          },
          {
            id: 7,
            title: "Gestión de eventos - CRUD completo",
            description: "Crear, leer, actualizar y eliminar eventos",
            priority: "high",
            estimatedHours: 16,
            status: "in-progress",
            assignee: "Developer",
            progress: 60
          },
          {
            id: 8,
            title: "Gestión de visitantes",
            description: "Visualizar y administrar registro de visitantes",
            priority: "medium",
            estimatedHours: 10,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 9,
            title: "Sistema de reportes",
            description: "Generar reportes de eventos y visitantes",
            priority: "medium",
            estimatedHours: 14,
            status: "pending",
            assignee: "Developer"
          }
        ]
      },
      {
        id: 3,
        name: "Fase 3: Interfaz de Kiosco",
        description: "Desarrollo de la interfaz pública para visitantes",
        estimatedDays: 10,
        tasks: [
          {
            id: 10,
            title: "Pantalla principal del kiosco",
            description: "Interfaz de bienvenida y navegación principal",
            priority: "high",
            estimatedHours: 8,
            status: "completed",
            assignee: "Developer",
            completedDate: "2024-01-20"
          },
          {
            id: 11,
            title: "Galería de eventos",
            description: "Visualización atractiva de eventos disponibles",
            priority: "high",
            estimatedHours: 12,
            status: "in-progress",
            assignee: "Developer",
            progress: 40
          },
          {
            id: 12,
            title: "Formulario de registro de visitantes",
            description: "Captura de datos de visitantes con validación",
            priority: "high",
            estimatedHours: 10,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 13,
            title: "Sistema de filtros avanzados",
            description: "Filtros por categoría, fecha, ubicación, etc.",
            priority: "medium",
            estimatedHours: 8,
            status: "pending",
            assignee: "Developer"
          }
        ]
      },
      {
        id: 4,
        name: "Fase 4: Funcionalidades Avanzadas",
        description: "Características adicionales y optimizaciones",
        estimatedDays: 12,
        tasks: [
          {
            id: 14,
            title: "Sistema de notificaciones",
            description: "Notificaciones en tiempo real para admin",
            priority: "medium",
            estimatedHours: 10,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 15,
            title: "Analytics y métricas",
            description: "Dashboard con gráficos y estadísticas",
            priority: "medium",
            estimatedHours: 14,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 16,
            title: "Optimización de rendimiento",
            description: "Lazy loading, code splitting, optimizaciones",
            priority: "low",
            estimatedHours: 8,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 17,
            title: "Responsive design completo",
            description: "Adaptación para tablets y dispositivos móviles",
            priority: "medium",
            estimatedHours: 12,
            status: "pending",
            assignee: "Developer"
          }
        ]
      },
      {
        id: 5,
        name: "Fase 5: Testing y Deployment",
        description: "Pruebas, correcciones y despliegue final",
        estimatedDays: 8,
        tasks: [
          {
            id: 18,
            title: "Testing de funcionalidades",
            description: "Pruebas exhaustivas de todas las características",
            priority: "high",
            estimatedHours: 16,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 19,
            title: "Corrección de bugs",
            description: "Resolver problemas encontrados durante testing",
            priority: "high",
            estimatedHours: 12,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 20,
            title: "Documentación completa",
            description: "Manual de usuario y documentación técnica",
            priority: "medium",
            estimatedHours: 8,
            status: "pending",
            assignee: "Developer"
          },
          {
            id: 21,
            title: "Despliegue en producción",
            description: "Configurar y desplegar en servidor de producción",
            priority: "high",
            estimatedHours: 6,
            status: "pending",
            assignee: "Developer"
          }
        ]
      }
    ]
  };

  // Cargar tareas desde localStorage o usar las del plan
  useEffect(() => {
    const savedTasks = localStorage.getItem('sgev2-development-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Extraer todas las tareas del plan
      const allTasks = developmentPlan.phases.flatMap(phase => 
        phase.tasks.map(task => ({
          ...task,
          phaseId: phase.id,
          phaseName: phase.name
        }))
      );
      setTasks(allTasks);
    }
  }, []);

  // Guardar tareas cuando cambien
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('sgev2-development-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Funciones para manejar el estado de las tareas
  const updateTaskStatus = (taskId, newStatus, progress = null) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, status: newStatus };
          
          if (newStatus === 'completed') {
            updatedTask.completedDate = new Date().toISOString().split('T')[0];
            updatedTask.progress = 100;
          } else if (newStatus === 'in-progress' && progress !== null) {
            updatedTask.progress = progress;
          }
          
          return updatedTask;
        }
        return task;
      })
    );
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // Calcular estadísticas
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  const overallProgress = Math.round((stats.completed / stats.total) * 100);

  // Funciones de utilidad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending': return <Circle className="w-5 h-5 text-gray-400" />;
      default: return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Plan de Desarrollo - {developmentPlan.projectInfo.name}
            </h1>
            <p className="text-gray-600">{developmentPlan.projectInfo.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progreso General</div>
            <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
          </div>
        </div>

        {/* Barra de progreso general */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>

        {/* Información del proyecto */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Inicio</span>
            </div>
            <div className="text-lg font-semibold">{developmentPlan.projectInfo.startDate}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Entrega Estimada</span>
            </div>
            <div className="text-lg font-semibold">{developmentPlan.projectInfo.estimatedCompletion}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <GitBranch className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Versión</span>
            </div>
            <div className="text-lg font-semibold">{developmentPlan.projectInfo.version}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <Zap className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Estado</span>
            </div>
            <div className="text-lg font-semibold text-blue-600">En Desarrollo</div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Tareas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Progreso</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
            </div>
            <Circle className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas las Tareas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'in-progress' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En Progreso
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'completed' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completadas
          </button>
        </div>
      </div>

      {/* Lista de Tareas Agrupadas por Fase */}
      <div className="space-y-6">
        {developmentPlan.phases.map(phase => {
          const phaseTasks = filteredTasks.filter(task => task.phaseId === phase.id);
          const phaseProgress = Math.round(
            (phaseTasks.filter(t => t.status === 'completed').length / phase.tasks.length) * 100
          );

          if (phaseTasks.length === 0 && filter !== 'all') return null;

          return (
            <div key={phase.id} className="bg-white rounded-lg border overflow-hidden">
              {/* Header de la Fase */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Progreso de Fase</div>
                    <div className="text-xl font-bold text-blue-600">{phaseProgress}%</div>
                  </div>
                </div>
                
                {/* Barra de progreso de la fase */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${phaseProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Tareas de la Fase */}
              <div className="divide-y divide-gray-100">
                {phaseTasks.map(task => (
                  <div key={task.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {getStatusIcon(task.status)}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900 mb-1">
                            {task.title}
                          </h4>
                          <p className="text-gray-600 mb-3">{task.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {task.assignee}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {task.estimatedHours}h estimadas
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                            </div>
                            {task.completedDate && (
                              <div className="text-green-600">
                                Completada: {task.completedDate}
                              </div>
                            )}
                          </div>

                          {/* Barra de progreso para tareas en progreso */}
                          {task.status === 'in-progress' && task.progress && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progreso</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botones de Acción */}
                      <div className="ml-4">
                        <div className="flex gap-2">
                          {task.status === 'pending' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'in-progress', 0)}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              Iniciar
                            </button>
                          )}
                          
                          {task.status === 'in-progress' && (
                            <>
                              <button
                                onClick={() => {
                                  const progress = prompt('Ingresa el progreso (0-100):', task.progress || 0);
                                  if (progress !== null && progress >= 0 && progress <= 100) {
                                    updateTaskStatus(task.id, 'in-progress', parseInt(progress));
                                  }
                                }}
                                className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                              >
                                Actualizar
                              </button>
                              <button
                                onClick={() => updateTaskStatus(task.id, 'completed')}
                                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              >
                                Completar
                              </button>
                            </>
                          )}
                          
                          {task.status === 'completed' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'in-progress', 50)}
                              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                            >
                              Reabrir
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen del Timeline */}
      <div className="mt-8 bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline del Proyecto</h3>
        <div className="space-y-4">
          {developmentPlan.phases.map((phase, index) => {
            const phaseProgress = Math.round(
              (tasks.filter(t => t.phaseId === phase.id && t.status === 'completed').length / phase.tasks.length) * 100
            );
            
            return (
              <div key={phase.id} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  phaseProgress === 100 
                    ? 'bg-green-600 text-white' 
                    : phaseProgress > 0 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{phase.name}</span>
                    <span className="text-sm text-gray-500">{phase.estimatedDays} días</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          phaseProgress === 100 ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${phaseProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{phaseProgress}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPlan; 