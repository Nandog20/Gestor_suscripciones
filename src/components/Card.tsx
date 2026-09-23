
interface Props{
    title: string,
    quantity: number,
    missing?: number,
    format?: 'number' | 'currency'
}

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

export default function Card({title, quantity, missing, format = 'number'} : Props) {
  // La moneda solo aplica si quantity y missing existen; si no, se muestra número normal
  const isCurrency = format === 'currency' && quantity != null && missing != undefined
  const value = (n: number) => isCurrency ? money.format(n) : String(n)
  // Cifras alineadas (tabular-nums) y color según formato: verde para dinero, gris para números
  const amountClass = `text-3xl font-semibold tabular-nums ${isCurrency ? 'text-emerald-600' : 'text-gray-900'}`

  return (
    <div className="border border-gray-200 p-4 w-full rounded-2xl flex flex-col gap-2 shadow-2xs">
        <h2 className="text-2xl font-semibold text-gray-600">{title}</h2>
        {missing == undefined ? (
          <p className={amountClass}>{value(quantity)}</p>
        ) : (
          <p className={amountClass}>
            {value(missing)}
            <span className="text-xl font-normal text-gray-400">/{value(quantity)}</span>
          </p>
        )}
    </div>
  )
}
