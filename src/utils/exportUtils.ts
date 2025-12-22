// Utility functions for exporting and importing data

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  method: string;
  document: string;
  status: 'completed' | 'pending';
  date: string;
}

export const exportToCSV = (data: Transaction[], filename: string = 'transacoes') => {
  // Define CSV headers
  const headers = [
    'Data',
    'Descrição',
    'Categoria',
    'Método',
    'Documento',
    'Valor',
    'Tipo',
    'Status'
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...data.map(transaction => [
      transaction.date,
      `"${transaction.description}"`,
      transaction.category,
      transaction.method,
      transaction.document,
      transaction.amount.toFixed(2),
      transaction.type === 'income' ? 'Receita' : 'Despesa',
      transaction.status === 'completed' ? 'Concluído' : 'Pendente'
    ].join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: any[], filename: string = 'data') => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseCSVFile = (file: File): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        // Skip header line
        const dataLines = lines.slice(1).filter(line => line.trim());
        
        const transactions: Transaction[] = dataLines.map((line, index) => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          
          return {
            id: Date.now().toString() + index,
            date: values[0] || new Date().toISOString().split('T')[0],
            description: values[1] || '',
            category: values[2] || 'Outras',
            method: values[3] || 'transferencia',
            document: values[4] || '',
            amount: parseFloat(values[5]) || 0,
            type: (values[6] === 'Receita' ? 'income' : 'expense') as 'income' | 'expense',
            status: (values[7] === 'Concluído' ? 'completed' : 'pending') as 'completed' | 'pending'
          };
        });
        
        resolve(transactions);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const parseJSONFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        resolve(Array.isArray(data) ? data : [data]);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
