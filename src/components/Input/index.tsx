import type { InputHTMLAttributes } from "react"
import { forwardRef } from "react"



interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  error?: string
  variant?: "default" | "outline" | "filled"
  size?: "sm" | "md" | "lg"
}


export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, variant = 'default', size = 'md', ...props }, ref) => {
        
        const baseStyles = "w-full rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-0 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        
        const variants = {
            default: "bg-white border-2 border-gray-200 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 hover:border-gray-300",
            outline: "bg-transparent border-2 border-gray-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 hover:border-gray-400",
            filled: "bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/20 hover:bg-gray-100"
        }
        
        const sizes = {
            sm: "h-10 px-3 text-sm",
            md: "h-12 px-4 text-base",
            lg: "h-14 px-5 text-lg"
        }
        
        const inputStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
        
        return(
            <div className="w-full mb-4">
                {label && (
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                        {label}
                    </label>
                )}
                
                <div className="relative group">
                    <input
                        ref={ref}
                        className={inputStyles}
                        {...props}
                    />
                    
                    {/* Efeito de brilho sutil */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {error && (
                    <p className="mt-2 text-sm text-red-600 font-medium ml-1 animate-pulse">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

// Exportação alternativa como função normal
export function InputSimple(props: InputProps) {
    const { className = '', label, error, variant = 'default', size = 'md', ...rest } = props
    
    const baseStyles = "w-full rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-0 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
        default: "bg-white border-2 border-gray-200 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 hover:border-gray-300",
        outline: "bg-transparent border-2 border-gray-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 hover:border-gray-400",
        filled: "bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/20 hover:bg-gray-100"
    }
    
    const sizes = {
        sm: "h-10 px-3 text-sm",
        md: "h-12 px-4 text-base",
        lg: "h-14 px-5 text-lg"
    }
    
    const inputStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
    
    return(
        <div className="w-full mb-4">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    {label}
                </label>
            )}
            
            <div className="relative group">
                <input
                    className={inputStyles}
                    {...rest}
                />
                
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            {error && (
                <p className="mt-2 text-sm text-red-600 font-medium ml-1 animate-pulse">
                    {error}
                </p>
            )}
        </div>
    )
}