import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaFileUpload, FaFileDownload, FaFileCsv, FaFileCode } from 'react-icons/fa';
import { exportToCSV, exportToJSON, parseCSVFile, parseJSONFile } from '@/utils/exportUtils';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: any[];
  onImportTransactions: (transactions: any[]) => void;
}

export default function ImportExportModal({ 
  isOpen, 
  onClose, 
  transactions, 
  onImportTransactions 
}: ImportExportModalProps) {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (transactions.length === 0) {
      alert('Não há transações para exportar');
      return;
    }

    if (exportFormat === 'csv') {
      exportToCSV(transactions, 'transacoes');
    } else {
      exportToJSON(transactions, 'transacoes');
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      let importedData;

      if (file.name.endsWith('.csv')) {
        importedData = await parseCSVFile(file);
      } else if (file.name.endsWith('.json')) {
        importedData = await parseJSONFile(file);
      } else {
        throw new Error('Formato de arquivo não suportado. Use CSV ou JSON.');
      }

      onImportTransactions(importedData);
      alert(`Importação concluída! ${importedData.length} transações foram adicionadas.`);
      onClose();
    } catch (error) {
      alert('Erro ao importar arquivo: ' + (error as Error).message);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      let importedData;

      if (file.name.endsWith('.csv')) {
        importedData = await parseCSVFile(file);
      } else if (file.name.endsWith('.json')) {
        importedData = await parseJSONFile(file);
      } else {
        throw new Error('Formato de arquivo não suportado. Use CSV ou JSON.');
      }

      onImportTransactions(importedData);
      alert(`Importação concluída! ${importedData.length} transações foram adicionadas.`);
      onClose();
    } catch (error) {
      alert('Erro ao importar arquivo: ' + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Importar/Exportar</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'export'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaFileDownload className="inline mr-2" />
            Exportar
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'import'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaFileUpload className="inline mr-2" />
            Importar
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de Exportação
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="exportFormat"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
                      className="sr-only peer"
                    />
                    <div className="p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-green-500 peer-checked:bg-green-50 hover:bg-gray-50">
                      <FaFileCsv className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-center">CSV</p>
                      <p className="text-xs text-gray-500 text-center">Planilha</p>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      name="exportFormat"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
                      className="sr-only peer"
                    />
                    <div className="p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-green-500 peer-checked:bg-green-50 hover:bg-gray-50">
                      <FaFileCode className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-center">JSON</p>
                      <p className="text-xs text-gray-500 text-center">Dados estruturados</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Resumo da exportação:</strong>
                </p>
                <p className="text-sm text-gray-600">
                  • Total de transações: {transactions.length}
                </p>
                <p className="text-sm text-gray-600">
                  • Formato: {exportFormat.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  • Data: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>

              <button
                onClick={handleExport}
                disabled={transactions.length === 0}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <FaFileDownload className="mr-2" />
                Exportar {transactions.length} Transações
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arraste um arquivo ou clique para selecionar
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaFileUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Arraste um arquivo CSV ou JSON aqui
                  </p>
                  <p className="text-xs text-gray-500">
                    ou clique para selecionar um arquivo
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  Formatos suportados:
                </p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• CSV: Exportado do Excel, Google Sheets, etc.</li>
                  <li>• JSON: Arquivo de dados estruturados</li>
                </ul>
              </div>

              {isProcessing && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Processando arquivo...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
