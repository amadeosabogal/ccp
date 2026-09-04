import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  initCCBSession, getPaises, getEstados, getCidades, 
  searchByName, searchByService, getLocalidadeDetalhe 
} from '../services/ccbApi';
import type { CCBDropdownItem, SearchServiceParams } from '../types/ccb';
import RelatorioResults from '../components/RelatorioResults';
import RelatorioModal from '../components/RelatorioModal';

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

  // Results & UI States
  const [resultsHtml, setResultsHtml] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHtml, setModalHtml] = useState<string>('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Initialize and load countries
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await initCCBSession();
        const data = await getPaises();
        setPaises(data.list || []);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    };
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

  const handleSearchByName = async () => {
    if (!searchNameQuery || searchNameQuery.length < 3) return;
    setIsSearching(true);
    setResultsHtml('');
    try {
      const html = await searchByName(searchNameQuery, 1);
      setResultsHtml(html);
    } catch (error) {
      console.error("Error searching by name:", error);
      setResultsHtml('<tr><td class="text-center text-red-500">Error al realizar la búsqueda.</td></tr>');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchByService = async () => {
    if (selectedPeriodos.length === 0 || selectedDias.length === 0 || selectedServicios.length === 0) {
      alert("Por favor, seleccione al menos un Período, un Día de la semana y un Tipo de Servicio.");
      return;
    }

    setIsSearching(true);
    setResultsHtml('');
    try {
      const params: SearchServiceParams = {
        codigoPais: selectedPais,
        codigoEstado: selectedEstado,
        codigoCidade: selectedCiudad,
        tipoCulto: selectedServicios,
        diaSemana: selectedDias,
        periodo: selectedPeriodos,
        pagina: 1
      };
      const html = await searchByService(params);
      setResultsHtml(html);
    } catch (error) {
      console.error("Error searching by service:", error);
      setResultsHtml('<tr><td class="text-center text-red-500">Error al realizar la búsqueda.</td></tr>');
    } finally {
      setIsSearching(false);
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
      setModalHtml('<p class="text-red-500">Error al cargar los detalles.</p>');
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-ccb-blue text-center mb-8">{t('relatorio.titulo')}</h1>
      
      {/* Box 1: Búsqueda por casa de oração */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-ccb-blue text-center mb-4">{t('relatorio.busqueda_casa')}</h2>
        <div className="bg-[#cbd2da] rounded-md p-8 shadow-sm">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <label className="text-sm text-gray-700 font-medium mb-2">{t('relatorio.escriba_nombre')}</label>
            <input 
              type="text" 
              value={searchNameQuery}
              onChange={(e) => setSearchNameQuery(e.target.value)}
              placeholder={t('relatorio.busque_localidad')} 
              className="w-full border border-white rounded p-2 text-sm focus:outline-none mb-6 shadow-sm bg-white"
              onKeyDown={(e) => e.key === 'Enter' && handleSearchByName()}
            />
            <button 
              onClick={handleSearchByName}
              disabled={isSearching}
              className="bg-[#004f71] text-white px-10 py-2 rounded font-medium hover:bg-[#003853] transition-colors shadow-sm disabled:opacity-50"
            >
              {isSearching ? 'Buscando...' : t('general.buscar')}
            </button>
          </div>
        </div>
      </div>

      {/* Box 2: Búsqueda por servicio */}
      <div>
        <h2 className="text-xl font-bold text-ccb-blue text-center mb-4">{t('relatorio.busqueda_servicio')}</h2>
        <div className="bg-[#cbd2da] rounded-md p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            {/* Column 1: Localización */}
            <div>
              <h3 className="font-bold text-[15px] text-gray-800 mb-4">{t('relatorio.localizacion')}</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[13px] text-gray-700">País</label>
                  <select 
                    value={selectedPais} 
                    onChange={(e) => setSelectedPais(e.target.value)}
                    className="border border-white rounded p-1.5 text-[13px] bg-white focus:outline-none shadow-sm"
                  >
                    <option value="">Seleccione</option>
                    {paises.map(p => <option key={p.Value} value={p.Value}>{p.Text}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label className="text-[13px] text-gray-700">Estado</label>
                  <select 
                    value={selectedEstado} 
                    onChange={(e) => setSelectedEstado(e.target.value)}
                    disabled={!selectedPais}
                    className="border border-white rounded p-1.5 text-[13px] bg-white focus:outline-none shadow-sm disabled:opacity-60"
                  >
                    <option value="">Seleccione</option>
                    {estados.map(e => <option key={e.Value} value={e.Value}>{e.Text}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label className="text-[13px] text-gray-700">Ciudad</label>
                  <select 
                    value={selectedCiudad} 
                    onChange={(e) => setSelectedCiudad(e.target.value)}
                    disabled={!selectedEstado}
                    className="border border-white rounded p-1.5 text-[13px] bg-white focus:outline-none shadow-sm disabled:opacity-60"
                  >
                    <option value="">Seleccione</option>
                    {ciudades.map(c => <option key={c.Value} value={c.Value}>{c.Text}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Column 2: Período */}
            <div>
              <h3 className="font-bold text-[15px] text-gray-800 mb-4">Período</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2.5 text-[13px] text-gray-700 cursor-pointer font-medium border-b border-[#a9b4c0] pb-2 mb-2">
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
                    className="rounded-sm border-white w-3.5 h-3.5 shadow-sm bg-white" 
                  />
                  <span>Todos</span>
                </label>
                {['Manhã', 'Tarde', 'Noite'].map((item) => (
                  <label key={item} className="flex items-center space-x-2.5 text-[13px] text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedPeriodos.includes(item)}
                      onChange={() => toggleCheckbox(item, selectedPeriodos, setSelectedPeriodos)}
                      className="rounded-sm border-white w-3.5 h-3.5 shadow-sm bg-white" 
                    />
                    <span>{item === 'Manhã' ? 'Mañana' : item === 'Noite' ? 'Noche' : 'Tarde'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Column 3: Días de la Semana */}
            <div>
              <h3 className="font-bold text-[15px] text-gray-800 mb-4">Días de la Semana</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2.5 text-[13px] text-gray-700 cursor-pointer font-medium border-b border-[#a9b4c0] pb-2 mb-2">
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
                    className="rounded-sm border-white w-3.5 h-3.5 shadow-sm bg-white" 
                  />
                  <span>Todos</span>
                </label>
                {[
                  { value: '1', label: 'Domingo' },
                  { value: '2', label: 'Lunes' },
                  { value: '3', label: 'Martes' },
                  { value: '4', label: 'Miércoles' },
                  { value: '5', label: 'Jueves' },
                  { value: '6', label: 'Viernes' },
                  { value: '7', label: 'Sábado' }
                ].map(item => (
                  <label key={item.value} className="flex items-center space-x-2.5 text-[13px] text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedDias.includes(item.value)}
                      onChange={() => toggleCheckbox(item.value, selectedDias, setSelectedDias)}
                      className="rounded-sm border-white w-3.5 h-3.5 shadow-sm bg-white" 
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Column 4: Servicios */}
            <div>
              <h3 className="font-bold text-[15px] text-gray-800 mb-4">Servicios</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2.5 text-[13px] text-gray-700 cursor-pointer font-medium border-b border-[#a9b4c0] pb-2 mb-2">
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
                    className="rounded-sm border-white w-3.5 h-3.5 shadow-sm bg-white" 
                  />
                  <span>Todos</span>
                </label>
                {[
                  { value: 'Culto Oficial', label: 'Culto Oficial' }, 
                  { value: 'Reunião de Jovens e Menores', label: 'Reunión de Jóvenes y Menores' }
                ].map(item => (
                  <label key={item.value} className="flex items-center space-x-2.5 text-[13px] text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedServicios.includes(item.value)}
                      onChange={() => toggleCheckbox(item.value, selectedServicios, setSelectedServicios)}
                      className="rounded-sm border-white w-3.5 h-3.5 shadow-sm bg-white" 
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleSearchByService}
              disabled={isSearching}
              className="bg-[#004f71] text-white px-10 py-2 rounded font-medium hover:bg-[#003853] transition-colors shadow-sm disabled:opacity-50"
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Results Component */}
      <RelatorioResults 
        htmlContent={resultsHtml} 
        isLoading={isSearching} 
        onRowClick={handleRowClick} 
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
