import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaFile, FaTimes, FaCheck, FaSpinner, FaBrain } from 'react-icons/fa';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  multiple?: boolean;
  enableAI?: boolean;
}

export default function FileUpload({
  onFileUpload,
  acceptedTypes = ['.pdf', '.xlsx', '.csv', '.jpg', '.png'],
  maxSize = 10,
  multiple = false,
  enableAI = true,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [aiProcessing, setAiProcessing] = useState<{ [key: string]: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidType = acceptedTypes.includes(fileExtension);
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      
      if (!isValidType) {
        alert(`Tipo de arquivo não aceito: ${file.name}`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`Arquivo muito grande: ${file.name} (máximo ${maxSize}MB)`);
        return false;
      }
      
      return true;
    });

    if (!multiple) {
      setUploadedFiles(validFiles.slice(0, 1));
    } else {
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setUploading(true);
    
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const fileId = `${file.name}-${i}`;
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Upload file
      await onFileUpload(file);
      
      // AI Processing (if enabled)
      if (enableAI) {
        setAiProcessing(prev => ({ ...prev, [fileId]: true }));
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing
        setAiProcessing(prev => ({ ...prev, [fileId]: false }));
      }
    }
    
    setUploading(false);
    setUploadedFiles([]);
    setUploadProgress({});
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FaFile className="text-red-500" />;
      case 'xlsx':
      case 'csv':
        return <FaFile className="text-green-500" />;
      case 'jpg':
      case 'png':
        return <FaFile className="text-blue-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-4">
          <motion.div
            animate={{ y: isDragging ? -5 : 0 }}
            className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <FaCloudUploadAlt className="text-3xl text-gray-400" />
          </motion.div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isDragging ? 'Solte os arquivos aqui' : 'Arraste e solte os arquivos aqui'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ou{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                clique para selecionar
              </button>
            </p>
          </div>
          
          <div className="text-xs text-gray-400">
            <p>Formatos aceitos: {acceptedTypes.join(', ')}</p>
            <p>Tamanho máximo: {maxSize}MB</p>
            {enableAI && (
              <p className="text-blue-600 mt-1">
                <FaBrain className="inline mr-1" />
                IA irá processar os documentos automaticamente
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <h3 className="text-sm font-medium text-gray-700">Arquivos selecionados:</h3>
          
          {uploadedFiles.map((file, index) => {
            const fileId = `${file.name}-${index}`;
            const progress = uploadProgress[fileId] || 0;
            const isAiProcessing = aiProcessing[fileId];
            
            return (
              <motion.div
                key={fileId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {uploading && (
                    <div className="flex items-center space-x-2">
                      {progress === 100 && isAiProcessing ? (
                        <div className="flex items-center text-blue-600">
                          <FaSpinner className="animate-spin mr-1" />
                          <span className="text-xs">Processando com IA...</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green-600">
                          <FaCheck className="mr-1" />
                          <span className="text-xs">{progress}%</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!uploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                
                {/* Progress Bar */}
                {uploading && progress > 0 && progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setUploadedFiles([])}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={uploadFiles}
              disabled={uploading}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                'Enviar Arquivos'
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
