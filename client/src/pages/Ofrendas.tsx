import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Ofrendas() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [provincia, setProvincia] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [localidad, setLocalidad] = useState('');

  const handleConfirm = () => {
    if (provincia && ciudad && localidad) {
      setStep(2);
    } else {
      alert(t('ofrendas.alerta_campos'));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8 sm:pb-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm font-medium mb-4 sm:mb-6 text-gray-500">
          <Link to="/" className="text-ccb-blue hover:underline">{t('nav.inicio')}</Link>
          <span className="mx-2">/</span>
          <span>{t('ofrendas.seleccion')}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
          {step === 1 ? (
            <>
              <h2 className="text-lg sm:text-xl font-bold text-ccb-blue mb-6 sm:mb-8">{t('ofrendas.seleccion')}</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <p className="text-xs sm:text-[13px] text-gray-500 mb-1">{t('relatorio.pais')}</p>
                  <p className="flex items-center text-gray-800 font-bold text-sm sm:text-[13px]">
                    <Check className="w-4 h-4 text-green-600 mr-1 stroke-[3]" /> Perú
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] text-gray-600 font-medium mb-1">{t('ofrendas.provincia')}</label>
                  <select 
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2.5 sm:p-2 text-base md:text-sm focus:outline-none focus:border-ccb-blue bg-white"
                  >
                    <option value="">{t('ofrendas.seleccione_provincia')}</option>
                    <option value="Región Del Callao">Región Del Callao</option>
                    <option value="Lima">Lima</option>
                    <option value="Arequipa">Arequipa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] text-gray-600 font-medium mb-1">{t('relatorio.ciudad')}</label>
                  <select 
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2.5 sm:p-2 text-base md:text-sm focus:outline-none focus:border-ccb-blue bg-white"
                  >
                    <option value="">{t('ofrendas.seleccione_ciudad')}</option>
                    <option value="Callao">Callao</option>
                    <option value="Lima">Lima</option>
                    <option value="Arequipa">Arequipa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] text-gray-600 font-medium mb-1">Localidad</label>
                  <select 
                    value={localidad}
                    onChange={(e) => setLocalidad(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2.5 sm:p-2 text-base md:text-sm focus:outline-none focus:border-ccb-blue bg-white"
                  >
                    <option value="">{t('ofrendas.seleccione_localidad')}</option>
                    <option value="Cercado">Cercado</option>
                    <option value="Bellavista">Bellavista</option>
                    <option value="Miraflores">Miraflores</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-2">
                <Link 
                  to="/" 
                  className="w-full sm:w-auto text-center bg-[#6b7280] text-white px-6 py-2.5 sm:py-2 rounded-[3px] text-xs font-semibold hover:bg-gray-600 uppercase tracking-wide transition-colors"
                >
                  {t('ofrendas.volver')}
                </Link>
                <button 
                  type="button"
                  onClick={() => { setProvincia(''); setCiudad(''); setLocalidad(''); }} 
                  className="w-full sm:w-auto bg-white border border-[#004f71] text-[#004f71] px-6 py-2.5 sm:py-2 rounded-[3px] text-xs font-semibold hover:bg-blue-50 uppercase tracking-wide transition-colors cursor-pointer"
                >
                  {t('ofrendas.reiniciar')}
                </button>
                <button 
                  type="button"
                  onClick={handleConfirm}
                  className="w-full sm:w-auto bg-[#003853] text-white px-6 py-2.5 sm:py-2 rounded-[3px] text-xs font-semibold hover:bg-ccb-dark uppercase tracking-wide transition-colors cursor-pointer"
                >
                  {t('ofrendas.confirmar')}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg sm:text-xl font-bold text-ccb-blue mb-6 sm:mb-8">{t('ofrendas.datos_cuentas')}</h2>
              
              <div className="bg-gray-50 p-4 sm:p-6 rounded border border-gray-200 mb-6 sm:mb-8 text-xs sm:text-sm">
                <p className="mb-2"><span className="font-bold text-gray-700">{t('relatorio.pais')}:</span> Perú</p>
                <p className="mb-2"><span className="font-bold text-gray-700">{t('ofrendas.provincia')}:</span> {provincia}</p>
                <p className="mb-2"><span className="font-bold text-gray-700">{t('relatorio.ciudad')}:</span> {ciudad}</p>
                <p className="mb-4"><span className="font-bold text-gray-700">Localidad:</span> {localidad}</p>

                <div className="border-t border-gray-300 pt-5 sm:pt-6 mt-4 sm:mt-6">
                  <h3 className="font-bold text-base sm:text-lg text-ccb-blue mb-4">{t('ofrendas.cuentas_ofrendas')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 sm:p-5 rounded shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 shrink-0">BCP</div>
                        <p className="font-bold text-gray-800 text-sm">Banco de Crédito del Perú</p>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-[13px] mb-1">
                        {t('ofrendas.cuenta_corriente')} <span className="font-bold text-gray-900 break-all">191-1234567-0-12</span>
                      </p>
                      <p className="text-gray-600 text-xs sm:text-[13px] mb-2">
                        CCI: <span className="font-bold text-gray-900 break-all">0021911234567012</span>
                      </p>
                      <p className="text-gray-500 text-xs">{t('ofrendas.titular')} Congregación Cristiana en el Perú</p>
                    </div>
                    
                    <div className="bg-white p-4 sm:p-5 rounded shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 shrink-0">BBVA</div>
                        <p className="font-bold text-gray-800 text-sm">BBVA Continental</p>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-[13px] mb-1">
                        {t('ofrendas.cuenta_corriente')} <span className="font-bold text-gray-900 break-all">0011-0123-0100123456</span>
                      </p>
                      <p className="text-gray-600 text-xs sm:text-[13px] mb-2">
                        CCI: <span className="font-bold text-gray-900 break-all">01112300010012345612</span>
                      </p>
                      <p className="text-gray-500 text-xs">{t('ofrendas.titular')} Congregación Cristiana en el Perú</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto bg-[#003853] text-white px-8 py-2.5 sm:py-2 rounded-sm text-xs font-semibold hover:bg-ccb-dark uppercase tracking-wide cursor-pointer transition-colors"
                >
                  {t('ofrendas.volver_seleccion')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
