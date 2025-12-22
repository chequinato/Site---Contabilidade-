import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import FileUpload from '@/components/ui/FileUpload';
import { 
  FaFileInvoice, 
  FaCalendarAlt, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaClock,
  FaDownload,
  FaEye,
  FaCalculator,
  FaReceipt,
  FaChartLine
} from 'react-icons/fa';

// Mock data para demonstração
const mockTaxes = [
  {
    id: '1',
    name: 'Imposto de Renda Pessoa Jurídica (IRPJ)',
    deadline: '2024-01-31',
    status: 'pending',
    amount: 'R$ 12.500',
    category: 'Federal',
    description: 'Pagamento mensal do IRPJ',
  },
  {
    id: '2',
    name: 'Contribuição Social sobre Lucro Líquido (CSLL)',
    deadline: '2024-01-31',
    status: 'pending',
    amount: 'R$ 4.800',
    category: 'Federal',
    description: 'Contribuição mensal',
  },
  {
    id: '3',
    name: 'Programa de Integração Social (PIS)',
    deadline: '2024-01-25',
    status: 'urgent',
    amount: 'R$ 2.100',
    category: 'Federal',
    description: 'PIS mensal',
  },
  {
    id: '4',
    name: 'COFINS',
    deadline: '2024-01-25',
    status: 'urgent',
    amount: 'R$ 9.700',
    category: 'Federal',
    description: 'COFINS mensal',
  },
  {
    id: '5',
    name: 'ICMS',
    deadline: '2024-01-20',
    status: 'completed',
    amount: 'R$ 15.300',
    category: 'Estadual',
    description: 'ICMS mensal',
  },
  {
    id: '6',
    name: 'ISS',
    deadline: '2024-01-15',
    status: 'completed',
    amount: 'R$ 3.200',
    category: 'Municipal',
    description: 'ISS sobre serviços',
  },
];

const mockDocuments = [
  {
    id: '1',
    name: 'Guia IRPJ Janeiro 2024',
    type: 'DARF',
    uploadDate: '2024-01-10',
    status: 'processed',
    aiExtracted: true,
  },
  {
    id: '2',
    name: 'Relatório de Faturamento',
    type: 'Relatório',
    uploadDate: '2024-01-12',
    status: 'processing',
    aiExtracted: false,
  },
  {
    id: '3',
    name: 'Notas Fiscais de Entrada',
    type: 'XML',
    uploadDate: '2024-01-08',
    status: 'processed',
    aiExtracted: true,
  },
];

export default function TributacaoPage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = async (file: File) => {
    // Simulate file upload and AI processing
    console.log('Uploading file:', file.name);
    
    // Add to uploaded files list
    setUploadedFiles(prev => [...prev, file.name]);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would:
    // 1. Upload to storage (Supabase, S3, etc.)
    // 2. Send to AI API for processing
    // 3. Extract relevant data
    // 4. Update database
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <FaExclamationTriangle className="text-red-600" />;
      case 'warning':
        return <FaClock className="text-yellow-600" />;
      case 'pending':
        return <FaCalendarAlt className="text-blue-600" />;
      case 'completed':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return null;
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/client/dashboard" className="text-gray-600 hover:text-gray-900">
                ← Voltar
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tributação</h1>
                <p className="text-sm text-gray-500">Gerencie seus impostos e obrigações fiscais</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Visão Geral', icon: FaChartLine },
              { id: 'deadlines', label: 'Prazos', icon: FaCalendarAlt },
              { id: 'documents', label: 'Documentos', icon: FaFileInvoice },
              { id: 'upload', label: 'Upload IA', icon: FaCalculator },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Impostos this Month</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">R$ 47.600</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <FaFileInvoice className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Urgentes</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">2</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Concluídos</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">2</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendentes</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">4</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaClock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Taxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Impostos Recentes</h2>
              </div>
              <div className="p-6 space-y-4">
                {mockTaxes.slice(0, 5).map((tax, index) => (
                  <motion.div
                    key={tax.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(tax.status)}`}
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(tax.status)}
                      <div>
                        <p className="font-medium text-gray-900">{tax.name}</p>
                        <p className="text-sm text-gray-500">{tax.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{tax.amount}</p>
                      <p className="text-sm text-gray-500">Vence: {tax.deadline}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Deadlines Tab */}
        {activeTab === 'deadlines' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Todos os Prazos</h2>
            </div>
            <div className="p-6 space-y-4">
              {mockTaxes.map((tax, index) => (
                <motion.div
                  key={tax.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(tax.status)}`}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(tax.status)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{tax.name}</p>
                      <p className="text-sm text-gray-500">{tax.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">Categoria: {tax.category}</span>
                        <span className="text-xs text-gray-500">Vencimento: {tax.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{tax.amount}</p>
                    <div className="flex space-x-2 mt-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Documentos Fiscais</h2>
            </div>
            <div className="p-6 space-y-4">
              {mockDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FaReceipt className="text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">Tipo: {doc.type}</span>
                        <span className="text-xs text-gray-500">Upload: {doc.uploadDate}</span>
                        {doc.aiExtracted && (
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            Processado por IA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentStatusColor(doc.status)}`}>
                      {doc.status === 'processed' ? 'Processado' : doc.status === 'processing' ? 'Processando' : 'Pendente'}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload de Documentos com IA</h2>
              <p className="text-sm text-gray-600 mb-6">
                Envie seus documentos fiscais e nossa IA irá extrair automaticamente as informações relevantes.
              </p>
              
              <FileUpload
                onFileUpload={handleFileUpload}
                acceptedTypes={['.pdf', '.xlsx', '.csv', '.xml']}
                maxSize={20}
                multiple={true}
                enableAI={true}
              />
            </div>

            {/* AI Processing Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <FaCalculator className="text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Processamento Inteligente</h3>
                  <p className="text-blue-800 mt-2">
                    Nossa IA pode identificar e extrair automaticamente:
                  </p>
                  <ul className="mt-3 space-y-2 text-blue-700">
                    <li className="flex items-center">
                      <FaCheckCircle className="mr-2 text-blue-600" />
                      Valores e datas de vencimento
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="mr-2 text-blue-600" />
                      CNPJ e informações de empresas
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="mr-2 text-blue-600" />
                      Tipos de impostos e alíquotas
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="mr-2 text-blue-600" />
                      Classificação fiscal automática
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recently Uploaded */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploads Recentes</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((fileName, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{fileName}</span>
                      <span className="text-xs text-green-600">Processado</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
