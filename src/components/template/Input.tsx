import { useState } from "react"

interface InputPros {
    tipo?: 'text' | 'number'
    texto: string
    valor?: any
    somenteLeitura?: boolean
    className?: string
    onChange?: (valor: any) => void
}

export default function Input(props: InputPros) {

    return (
        <div className="flex flex-col">
            <label className="mb-3">
                {props.texto}
            </label>
            <input
                type={props?.tipo ?? "text"}
                value={props.valor}
                onChange={(e)=>{props.onChange?.(e.target.value)}}
                readOnly={props?.somenteLeitura}
                className={`
                    border border-purple-500 rounded-lg
                    px-4 py-2 dark:text-gray-800
                    bg-gray-100
                    ${props.somenteLeitura ? '' : 'focus:bg-white'}
                    focus:outline-none
                    ${props?.className}
                `}
            />
        </div>
    )
}