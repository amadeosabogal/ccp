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
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb */}
        <div className="text-sm font-medium mb-6 text-gray-500">
          <Link to="/" className="text-ccb-blue hover:underline">{t('nav.inicio')}</Link>
          <span className="mx-2">/</span>
          <span>{t('ofrendas.seleccion')}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold text-ccb-blue mb-8">{t('ofrendas.seleccion')}</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[13px] text-gray-500 mb-1">{t('relatorio.pais')}</p>
                  <p className="flex items-center text-gray-800 font-bold text-[13px]">
                    <Check className="w-4 h-4 text-green-600 mr-1 stroke-[3]" /> Perú
                  </p>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-500 mb-1">{t('ofrendas.provincia')}</label>
                  <select 
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-ccb-blue bg-white"
                  >
                    <option value="">{t('ofrendas.seleccione_provincia')}</option>
                    <option value="Región Del Callao">Región Del Callao</option>
                    <option value="Lima">Lima</option>
                    <option value="Arequipa">Arequipa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-500 mb-1">{t('relatorio.ciudad')}</label>
                  <select 
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-ccb-blue bg-white"
                  >
                    <option value="">{t('ofrendas.seleccione_ciudad')}</option>
                    <option value="Callao">Callao</option>
                    <option value="Lima">Lima</option>
                    <option value="Arequipa">Arequipa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-500 mb-1">Localidad</label>
                  <select 
                    value={localidad}
                    onChange={(e) => setLocalidad(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-ccb-blue bg-white"
                  >
                    <option value="">{t('ofrendas.seleccione_localidad')}</option>
                    <option value="Cercado">Cercado</option>
                    <option value="Bellavista">Bellavista</option>
                    <option value="Miraflores">Miraflores</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-center space-x-2">
                <Link to="/" className="bg-[#6b7280] text-white px-5 py-2 rounded-[3px] text-xs font-semibold hover:bg-gray-600 uppercase tracking-wide">{t('ofrendas.volver')}</Link>
                <button 
                  onClick={() => { setProvincia(''); setCiudad(''); setLocalidad(''); }} 
                  className="bg-white border border-[#004f71] text-[#004f71] px-5 py-2 rounded-[3px] text-xs font-semibold hover:bg-blue-50 uppercase tracking-wide"
                >
                  {t('ofrendas.reiniciar')}
                </button>
                <button 
                  onClick={handleConfirm}
                  className="bg-[#003853] text-white px-5 py-2 rounded-[3px] text-xs font-semibold hover:bg-ccb-dark uppercase tracking-wide"
                >
                  {t('ofrendas.confirmar')}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-ccb-blue mb-8">{t('ofrendas.datos_cuentas')}</h2>
              
              <div className="bg-gray-50 p-6 rounded border border-gray-200 mb-8 text-sm">
                <p className="mb-2"><span className="font-bold text-gray-700">{t('relatorio.pais')}:</span> Perú</p>
                <p className="mb-2"><span className="font-bold text-gray-700">{t('ofrendas.provincia')}:</span> {provincia}</p>
                <p className="mb-2"><span className="font-bold text-gray-700">{t('relatorio.ciudad')}:</span> {ciudad}</p>
                <p className="mb-4"><span className="font-bold text-gray-700">Localidad:</span> {localidad}</p>

                <div className="border-t border-gray-300 pt-6 mt-6">
                  <h3 className="font-bold text-lg text-ccb-blue mb-4">{t('ofrendas.cuentas_ofrendas')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">BCP</div>
                        <p className="font-bold text-gray-800">Banco de Crédito del Perú</p>
                      </div>
                      <p className="text-gray-600 text-[13px] mb-1">{t('ofrendas.cuenta_corriente')} <span className="font-bold text-gray-900">191-1234567-0-12</span></p>
                      <p className="text-gray-600 text-[13px] mb-2">CCI: <span className="font-bold text-gray-900">0021911234567012</span></p>
                      <p className="text-gray-500 text-xs">{t('ofrendas.titular')} Congregación Cristiana en el Perú</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">BBVA</div>
                        <p className="font-bold text-gray-800">BBVA Continental</p>
                      </div>
                      <p className="text-gray-600 text-[13px] mb-1">{t('ofrendas.cuenta_corriente')} <span className="font-bold text-gray-900">0011-0123-0100123456</span></p>
                      <p className="text-gray-600 text-[13px] mb-2">CCI: <span className="font-bold text-gray-900">01112300010012345612</span></p>
                      <p className="text-gray-500 text-xs">{t('ofrendas.titular')} Congregación Cristiana en el Perú</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setStep(1)}
                  className="bg-[#003853] text-white px-8 py-2 rounded-sm text-xs font-semibold hover:bg-ccb-dark uppercase tracking-wide"
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
