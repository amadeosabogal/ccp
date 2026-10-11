import { RotateCcw } from 'lucide-react';
import { useFontSize } from '../context/FontSizeContext';

interface FontSizeControlsProps {
  className?: string;
  buttonClassName?: string;
}

export default function FontSizeControls({ className = '', buttonClassName = '' }: FontSizeControlsProps) {
  const { increaseFont, decreaseFont, resetFont } = useFontSize();

  const baseBtnClass = "bg-ccb-dark hover:bg-ccb-blue transition-colors text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer select-none shadow-xs";

  return (
    <div className={`flex items-center space-x-1.5 no-font-scale ${className}`}>
      <button 
        type="button"
        onClick={decreaseFont} 
        className={`${baseBtnClass} text-xs font-bold ${buttonClassName}`} 
        title="Reducir letra"
        aria-label="Reducir tamaño de letra"
      >
        A
      </button>
      <button 
        type="button"
        onClick={increaseFont} 
        className={`${baseBtnClass} text-base font-bold ${buttonClassName}`} 
        title="Aumentar letra"
        aria-label="Aumentar tamaño de letra"
      >
        A
      </button>
      <button 
        type="button"
        onClick={resetFont} 
        className={`${baseBtnClass} ${buttonClassName}`} 
        title="Restablecer tamaño"
        aria-label="Restablecer tamaño de letra"
      >
        <RotateCcw size={15} />
      </button>
    </div>
  );
}
