import React, { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Contactenos() {
  const { t } = useLanguage();
  const [localidad, setLocalidad] = useState('');
  const [localidadError, setLocalidadError] = useState(false);

  const handleLocalidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalidad(e.target.value);
    if (localidadError) setLocalidadError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localidad) {
      setLocalidadError(true);
      return;
    }
    console.log("Formulario enviado");
  };

  return (
    <div className="max-w-4xl mx-auto mb-16 mt-8 p-6 bg-white border border-gray-200 rounded-sm shadow-sm">
      <h2 className="text-2xl font-bold text-ccb-blue mb-2">{t('contacto.titulo')}</h2>
      <p className="text-sm text-gray-600 mb-8">{t('contacto.duda')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Departamento */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t('contacto.departamento')} <span className="text-red-500">*</span>
          </label>
          <select 
            required
            className="w-full md:w-1/2 border border-gray-300 rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue"
          >
            <option value="">{t('contacto.selecciona_dep')}</option>
            <option value="tesoreria">{t('contacto.tesoreria')}</option>
            <option value="obra_piadosa">{t('contacto.obra_piadosa')}</option>
          </select>
        </div>

        {/* Asunto */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t('contacto.asunto')} <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            required
            className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre Completo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t('contacto.nombre')} <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue"
            />
          </div>

          {/* Celular y Exterior */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t('contacto.celular')}
            </label>
            <div className="flex items-center space-x-4">
              <input 
                type="tel" 
                className="flex-1 border border-gray-300 rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue"
              />
              <label className="flex items-center space-x-2 text-sm text-gray-700 whitespace-nowrap cursor-pointer">
                <input type="checkbox" className="form-checkbox rounded-sm text-ccb-blue" />
                <span>{t('contacto.exterior')}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* E-mail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t('contacto.email').replace('...', '')} <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              required
              placeholder={t('contacto.email')}
              className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue placeholder:text-gray-400"
            />
          </div>

          {/* Localidad - Congregación */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t('contacto.localidad_cong')} <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={localidad}
              onChange={handleLocalidadChange}
              placeholder={t('contacto.localidad_ph')}
              className={`w-full border rounded p-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 ${
                localidadError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-ccb-blue focus:ring-ccb-blue'
              }`}
            />
            {localidadError && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <TriangleAlert size={12} className="mr-1" />
                <span>{t('relatorio.seleccione')} la {t('contacto.localidad_ph').replace('...', '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t('contacto.mensaje')} <span className="text-red-500">*</span>
          </label>
          <textarea 
            required
            rows={5}
            placeholder={t('contacto.escribe_mensaje')}
            className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue placeholder:text-gray-400 resize-none"
          ></textarea>
        </div>

        {/* Anexar Archivo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t('contacto.anexar')}
          </label>
          <p className="text-xs text-gray-500 mb-2">
            ({t('contacto.limite')})
          </p>
          <input 
            type="file" 
            className="border border-gray-300 rounded p-1.5 text-sm w-full bg-white file:mr-2 file:py-1 file:px-3 file:border file:border-gray-300 file:bg-gray-50 file:rounded file:text-sm file:font-medium hover:file:bg-gray-100 file:cursor-pointer text-gray-500"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button 
            type="submit"
            className="bg-[#003853] text-white px-8 py-2 rounded-sm text-sm font-semibold hover:bg-ccb-dark uppercase tracking-wide"
          >
            {t('contacto.enviar')}
          </button>
        </div>
      </form>
    </div>
  );
}
