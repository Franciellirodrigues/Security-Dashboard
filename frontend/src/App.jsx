import React, { useEffect, useState } from 'react';
   import { Shield, ShieldAlert, ShieldCheck, ShieldAlert as AlertTriangle, RefreshCw } from 'lucide-react';

   function App() {
     const [vulnerabilities, setVulnerabilities] = useState([]);
     const [loading, setLoading] = useState(true);

     const fetchVulns = () => {
       setLoading(true);
       fetch('https://security-dashboard-vab7.onrender.com/api/vulnerabilities')
         .then(res => res.json())
         .then(data => {
           setVulnerabilities(data);
           setLoading(false);
         })
         .catch(err => console.error("Erro ao buscar dados:", err));
     };

     useEffect(() => {
       fetchVulns();
     }, []);

     // Contadores para os nossos cards de métricas
     const highCount = vulnerabilities.filter(v => v.severity === 'HIGH').length;
     const mediumCount = vulnerabilities.filter(v => v.severity === 'MEDIUM').length;

     return (
       <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
         {/* Top Navbar */}
         <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 py-4 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <Shield className="w-8 h-8 text-indigo-500 animate-pulse" />
             <h1 className="text-xl font-bold tracking-wide">DevSecOps Guard</h1>
           </div>
           <button onClick={fetchVulns} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
             <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
           </button>
         </header>

         <main className="p-8 max-w-7xl mx-auto space-y-8">
           {/* Cards de Visão Geral */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between">
               <div>
                 <p className="text-sm text-slate-400 font-medium">Críticas (HIGH)</p>
                 <p className="text-3xl font-bold text-rose-500 mt-1">{highCount}</p>
               </div>
               <ShieldAlert className="w-10 h-10 text-rose-500/20 bg-rose-500/10 p-2 rounded-lg" />
             </div>

             <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between">
               <div>
                 <p className="text-sm text-slate-400 font-medium">Médias (MEDIUM)</p>
                 <p className="text-3xl font-bold text-amber-500 mt-1">{mediumCount}</p>
               </div>
               <AlertTriangle className="w-10 h-10 text-amber-500/20 bg-amber-500/10 p-2 rounded-lg" />
             </div>

             <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between">
               <div>
                 <p className="text-sm text-slate-400 font-medium">Status Geral</p>
                 <p className={`text-xl font-bold mt-2 ${highCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                   {highCount > 0 ? 'Ação Requerida' : 'Ambiente Seguro'}
                 </p>
               </div>
               <ShieldCheck className={`w-10 h-10 p-2 rounded-lg ${highCount > 0 ? 'text-rose-500/20 bg-rose-500/10' : 'text-emerald-500/20 bg-emerald-500/10'}`} />
             </div>
           </div>

           {/* Tabela/Lista de Vulnerabilidades */}
           <div className="bg-slate-800/30 border border-slate-800 rounded-xl overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
               <h3 className="font-semibold text-slate-200">Vulnerabilidades Detectadas</h3>
             </div>
             <div className="divide-y divide-slate-800">
               {vulnerabilities.map((vuln) => (
                 <div key={vuln.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/20 transition-colors">
                   <div className="space-y-1">
                     <div className="flex items-center gap-3">
                       <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                         vuln.severity === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                         vuln.severity === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-700 text-slate-300'
                       }`}>
                         {vuln.severity}
                       </span>
                       <span className="text-sm text-slate-500 font-mono">{vuln.id}</span>
                       <h4 className="font-medium text-slate-200">{vuln.title}</h4>
                     </div>
                     <p className="text-sm text-slate-400">{vuln.description}</p>
                     <p className="text-xs text-slate-500 font-mono">Arquivo: {vuln.component}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </main>
       </div>
     );
   }

   export default App;