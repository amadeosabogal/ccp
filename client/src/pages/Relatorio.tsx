import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  initCCBSession, getPaises, getEstados, getCidades, 
  searchByName, searchByService, getLocalidadeDetalhe 
} from '../services/ccbApi';
import type { CCBDropdownItem, SearchServiceParams } from '../types/ccb';
import RelatorioResults from '../components/RelatorioResults';
import RelatorioModal from '../components/RelatorioModal';
import { RefreshCw, Search } from 'lucide-react';

export default function Relatorio() {
  const { t } = useLanguage();

  // Dropdown States
  const [paises, setPaises] = useState<CCBDropdownItem[]>([]);
  const [estados, setEstados] = useState<CCBDropdownItem[]>([]);
  const [ciudades, setCiudades] = useState<CCBDropdownItem[]>([]);

  // Selection States
  const [selectedPais, setSelectedPais] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedCiudad, setSelectedCiudad] = useState<string>('');
  
  const [searchNameQuery, setSearchNameQuery] = useState('');
  
  // Checkbox States
  const [selectedPeriodos, setSelectedPeriodos] = useState<string[]>([]);
  const [selectedDias, setSelectedDias] = useState<string[]>([]);
  const [selectedServicios, setSelectedServicios] = useState<string[]>([]);

  // Loading & Error States
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [initialError, setInitialError] = useState<string | null>(null);

  // Results & UI States
  const [resultsHtml, setResultsHtml] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearch, setLastSearch] = useState<{
    type: 'name' | 'service';
    query?: string;
    params?: Omit<SearchServiceParams, 'pagina'>;
    currentPage: number;
  } | null>(null);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHtml, setModalHtml] = useState<string>('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Helper to scroll smoothly to results on mobile
  const scrollToResults = () => {
    setTimeout(() => {
      const el = document.getElementById('relatorio-results-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Initialize and load countries
  const loadInitialData = async () => {
    setIsLoadingInitial(true);
    setInitialError(null);
    try {
      await initCCBSession();
      const data = await getPaises();
      setPaises(data.list || []);
    } catch (error) {
      console.error("Error loading countries:", error);
      setInitialError("No se pudieron cargar los países. Verifique su conexión y vuelva a intentarlo.");
    } finally {
      setIsLoadingInitial(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Load States when Country changes
  useEffect(() => {
    if (!selectedPais) {
      setEstados([]);
      setCiudades([]);
      setSelectedEstado('');
      setSelectedCiudad('');
      return;
    }
    const loadEstados = async () => {
      try {
        const data = await getEstados(selectedPais);
        setEstados(data.list || []);
        setSelectedEstado('');
        setCiudades([]);
      } catch (error) {
        console.error("Error loading states:", error);
      }
    };
    loadEstados();
  }, [selectedPais]);

  // Load Cities when State changes
  useEffect(() => {
    if (!selectedEstado) {
      setCiudades([]);
      setSelectedCiudad('');
      return;
    }
    const loadCiudades = async () => {
      try {
        const data = await getCidades(selectedEstado);
        setCiudades(data.list || []);
        setSelectedCiudad('');
      } catch (error) {
        console.error("Error loading cities:", error);
      }
    };
    loadCiudades();
  }, [selectedEstado]);

  const toggleCheckbox = (value: string, currentList: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentList.includes(value)) {
      setList(currentList.filter(item => item !== value));
    } else {
      setList([...currentList, value]);
    }
  };

  const handleSearchByName = async (pagina: number = 1) => {
    const query = pagina === 1 ? searchNameQuery.trim() : (lastSearch?.query || searchNameQuery.trim());
    if (!query || query.length < 3) {
      alert("Por favor, escriba al menos 3 caracteres para buscar.");
      return;
    }
    setIsSearching(true);
    if (pagina === 1) {
      setResultsHtml('');
    }
    try {
      const html = await searchByName(query, pagina);
      setResultsHtml(html);
      setLastSearch({
        type: 'name',
        query,
        currentPage: pagina
      });
      scrollToResults();
    } catch (error) {
      console.error("Error searching by name:", error);
      setResultsHtml('<tr><td class="text-center text-red-500 py-6">Error al realizar la búsqueda. Por favor intente nuevamente.</td></tr>');
      scrollToResults();
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchByService = async (pagina: number = 1) => {
    if (pagina === 1) {
      if (selectedPeriodos.length === 0 || selectedDias.length === 0 || selectedServicios.length === 0) {
        alert("Por favor, seleccione al menos un Período, un Día de la semana y un Tipo de Servicio.");
        return;
      }
    }

    setIsSearching(true);
    if (pagina === 1) {
      setResultsHtml('');
    }
    try {
      const baseParams = (pagina === 1 || !lastSearch?.params) ? {
        codigoPais: selectedPais,
        codigoEstado: selectedEstado,
        codigoCidade: selectedCiudad,
        tipoCulto: selectedServicios,
        diaSemana: selectedDias,
        periodo: selectedPeriodos,
      } : lastSearch.params;

      const params: SearchServiceParams = {
        ...baseParams,
        pagina
      };

      const html = await searchByService(params);
      setResultsHtml(html);
      setLastSearch({
        type: 'service',
        params: baseParams,
        currentPage: pagina
      });
      scrollToResults();
    } catch (error) {
      console.error("Error searching by service:", error);
      setResultsHtml('<tr><td class="text-center text-red-500 py-6">Error al realizar la búsqueda. Por favor intente nuevamente.</td></tr>');
      scrollToResults();
    } finally {
      setIsSearching(false);
    }
  };

  const handlePageChange = (pagina: number) => {
    if (lastSearch?.type === 'name') {
      handleSearchByName(pagina);
    } else {
      handleSearchByService(pagina);
    }
  };

  const handleRowClick = async (id: string) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    setModalHtml('');
    try {
      const html = await getLocalidadeDetalhe(id);
      setModalHtml(html);
    } catch (error) {
      console.error("Error fetching details:", error);
      setModalHtml('<p class="text-red-500 text-center py-6">Error al cargar los detalles de la localidad.</p>');
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-ccb-blue text-center mb-6 sm:mb-8">{t('relatorio.titulo')}</h1>
      
      {initialError && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span>{initialError}</span>
          <button
            onClick={loadInitialData}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer text-xs font-semibold shrink-0"
          >
            <RefreshCw size={14} className={isLoadingInitial ? 'animate-spin' : ''} />
            Reintentar
          </button>
        </div>
      )}

      {/* Box 1: Búsqueda por casa de oração */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-bold text-ccb-blue text-center mb-3 sm:mb-4">{t('relatorio.busqueda_casa')}</h2>
        <div className="bg-[#cbd2da] rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <label className="text-sm text-gray-800 font-medium mb-2 text-center sm:text-left w-full">
              {t('relatorio.escriba_nombre')}
            </label>
            <div className="w-full relative mb-4">
              <input 
                type="text" 
                value={searchNameQuery}
                onChange={(e) => setSearchNameQuery(e.target.value)}
                placeholder={t('relatorio.busque_localidad')} 
                className="w-full border border-white rounded-md p-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-ccb-blue shadow-sm bg-white"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchByName(1)}
              />
            </div>
            <button 
              onClick={() => handleSearchByName(1)}
              disabled={isSearching}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#004f71] text-white px-8 py-3 sm:py-2.5 rounded-md font-medium hover:bg-[#003853] transition-colors shadow-sm disabled:opacity-50 text-base sm:text-sm cursor-pointer"
            >
              <Search size={18} />
              <span>{isSearching ? 'Buscando...' : t('general.buscar')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Box 2: Búsqueda por servicio */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-ccb-blue text-center mb-3 sm:mb-4">{t('relatorio.busqueda_servicio')}</h2>
        <div className="bg-[#cbd2da] rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 sm:mb-8">
            
            {/* Column 1: Localización */}
            <div className="bg-white/40 p-4 rounded-md md:bg-transparent md:p-0">
              <h3 className="font-bold text-base sm:text-[15px] text-gray-800 mb-3 border-b border-gray-300 md:border-b-0 pb-1.5 md:pb-0">
                {t('relatorio.localizacion')}
              </h3>
              
              <div className="space-y-3.5">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs sm:text-[13px] text-gray-700 font-medium">País</label>
                  <select 
                    value={selectedPais} 
                    onChange={(e) => setSelectedPais(e.target.value)}
                    className="w-full border border-white rounded-md p-2.5 md:p-1.5 text-base md:text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-ccb-blue shadow-sm"
                  >
                    <option value="">Seleccione</option>
                    {paises.map(p => <option key={p.Value} value={p.Value}>{p.Text}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label className="text-xs sm:text-[13px] text-gray-700 font-medium">Estado</label>
                  <select 
                    value={selectedEstado} 
                    onChange={(e) => setSelectedEstado(e.target.value)}
                    disabled={!selectedPais}
                    className="w-full border border-white rounded-md p-2.5 md:p-1.5 text-base md:text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-ccb-blue shadow-sm disabled:opacity-60"
                  >
                    <option value="">Seleccione</option>
                    {estados.map(e => <option key={e.Value} value={e.Value}>{e.Text}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label className="text-xs sm:text-[13px] text-gray-700 font-medium">Ciudad</label>
                  <select 
                    value={selectedCiudad} 
                    onChange={(e) => setSelectedCiudad(e.target.value)}
                    disabled={!selectedEstado}
                    className="w-full border border-white rounded-md p-2.5 md:p-1.5 text-base md:text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-ccb-blue shadow-sm disabled:opacity-60"
                  >
                    <option value="">Seleccione</option>
                    {ciudades.map(c => <option key={c.Value} value={c.Value}>{c.Text}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Column 2: Período */}
            <div className="bg-white/40 p-4 rounded-md md:bg-transparent md:p-0">
              <h3 className="font-bold text-base sm:text-[15px] text-gray-800 mb-3 border-b border-gray-300 md:border-b-0 pb-1.5 md:pb-0">
                Período
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2.5 text-sm md:text-[13px] text-gray-800 cursor-pointer font-medium border-b border-[#a9b4c0] pb-2 mb-2 hover:opacity-80">
                  <input 
                    type="checkbox" 
                    checked={selectedPeriodos.length === 3}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPeriodos(['Manhã', 'Tarde', 'Noite']);
                      } else {
                        setSelectedPeriodos([]);
                      }
                    }}
                    className="rounded-sm border-white w-4 h-4 shadow-sm bg-white accent-ccb-blue cursor-pointer" 
                  />
                  <span>Todos</span>
                </label>
                {['Manhã', 'Tarde', 'Noite'].map((item) => (
                  <label key={item} className="flex items-center space-x-2.5 text-sm md:text-[13px] text-gray-700 cursor-pointer py-1 hover:opacity-80">
                    <input 
                      type="checkbox" 
                      checked={selectedPeriodos.includes(item)}
                      onChange={() => toggleCheckbox(item, selectedPeriodos, setSelectedPeriodos)}
                      className="rounded-sm border-white w-4 h-4 shadow-sm bg-white accent-ccb-blue cursor-pointer" 
                    />
                    <span>{item === 'Manhã' ? 'Mañana' : item === 'Noite' ? 'Noche' : 'Tarde'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Column 3: Días de la Semana */}
            <div className="bg-white/40 p-4 rounded-md md:bg-transparent md:p-0">
              <h3 className="font-bold text-base sm:text-[15px] text-gray-800 mb-3 border-b border-gray-300 md:border-b-0 pb-1.5 md:pb-0">
                Días de la Semana
              </h3>
              <div>
                <label className="flex items-center space-x-2.5 text-sm md:text-[13px] text-gray-800 cursor-pointer font-medium border-b border-[#a9b4c0] pb-2 mb-2 hover:opacity-80">
                  <input 
                    type="checkbox" 
                    checked={selectedDias.length === 7}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDias(['1', '2', '3', '4', '5', '6', '7']);
                      } else {
                        setSelectedDias([]);
                      }
                    }}
                    className="rounded-sm border-white w-4 h-4 shadow-sm bg-white accent-ccb-blue cursor-pointer" 
                  />
                  <span>Todos</span>
                </label>
                
                {/* 2 columns on mobile for better ergonomics, 1 column on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
                  {[
                    { value: '1', label: 'Domingo' },
                    { value: '2', label: 'Lunes' },
                    { value: '3', label: 'Martes' },
                    { value: '4', label: 'Miércoles' },
                    { value: '5', label: 'Jueves' },
                    { value: '6', label: 'Viernes' },
                    { value: '7', label: 'Sábado' }
                  ].map(item => (
                    <label key={item.value} className="flex items-center space-x-2 text-sm md:text-[13px] text-gray-700 cursor-pointer py-1 hover:opacity-80">
                      <input 
                        type="checkbox" 
                        checked={selectedDias.includes(item.value)}
                        onChange={() => toggleCheckbox(item.value, selectedDias, setSelectedDias)}
                        className="rounded-sm border-white w-4 h-4 shadow-sm bg-white accent-ccb-blue cursor-pointer" 
                      />
                      <span className="truncate">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 4: Servicios */}
            <div className="bg-white/40 p-4 rounded-md md:bg-transparent md:p-0">
              <h3 className="font-bold text-base sm:text-[15px] text-gray-800 mb-3 border-b border-gray-300 md:border-b-0 pb-1.5 md:pb-0">
                Servicios
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2.5 text-sm md:text-[13px] text-gray-800 cursor-pointer font-medium border-b border-[#a9b4c0] pb-2 mb-2 hover:opacity-80">
                  <input 
                    type="checkbox" 
                    checked={selectedServicios.length === 2}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedServicios(['Culto Oficial', 'Reunião de Jovens e Menores']);
                      } else {
                        setSelectedServicios([]);
                      }
                    }}
                    className="rounded-sm border-white w-4 h-4 shadow-sm bg-white accent-ccb-blue cursor-pointer" 
                  />
                  <span>Todos</span>
                </label>
                {[
                  { value: 'Culto Oficial', label: 'Culto Oficial' }, 
                  { value: 'Reunião de Jovens e Menores', label: 'Reunión Jóvenes/Menores' }
                ].map(item => (
                  <label key={item.value} className="flex items-center space-x-2.5 text-sm md:text-[13px] text-gray-700 cursor-pointer py-1 hover:opacity-80">
                    <input 
                      type="checkbox" 
                      checked={selectedServicios.includes(item.value)}
                      onChange={() => toggleCheckbox(item.value, selectedServicios, setSelectedServicios)}
                      className="rounded-sm border-white w-4 h-4 shadow-sm bg-white accent-ccb-blue cursor-pointer" 
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => handleSearchByService(1)}
              disabled={isSearching}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#004f71] text-white px-10 py-3 sm:py-2.5 rounded-md font-medium hover:bg-[#003853] transition-colors shadow-sm disabled:opacity-50 text-base sm:text-sm cursor-pointer"
            >
              <Search size={18} />
              <span>{isSearching ? 'Buscando...' : 'Buscar'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Anchor for pagination & results scrolling */}
      <div id="relatorio-results-anchor" className="scroll-mt-4 pt-2" />

      {/* Results Component */}
      <RelatorioResults 
        htmlContent={resultsHtml} 
        isLoading={isSearching} 
        onRowClick={handleRowClick}
        onPageChange={handlePageChange}
      />

      {/* Modal Component */}
      <RelatorioModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        htmlContent={modalHtml}
        isLoading={isModalLoading}
      />
      
    </div>
  );
}
