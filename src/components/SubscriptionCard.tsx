import type { Subscription } from '../types/Subscription';

interface Props {
  subscriptions: Subscription[];
}

// Misma moneda/locale que Card.tsx para que los precios se vean igual en toda la app
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

export default function SubscriptionCard({ subscriptions }: Props) {
  if (subscriptions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500 shadow-2xs">
        <p className="text-sm">Todavía no hay suscripciones</p>
      </div>
    );
  }

  return (
    // 1 col en móvil, 2 en tablet, 3 en desktop
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {subscriptions.map((subscription) => (
        <article
          key={subscription.id}
          className="flex w-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs"
        >
          <header className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{subscription.name}</h3>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              día {subscription.paymentDay}
            </span>
          </header>

          <p className="text-2xl font-semibold tabular-nums text-emerald-600">
            {money.format(subscription.price)}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {subscription.participants.map((person) => (
              <span
                key={person.id}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              >
                {person.name}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
