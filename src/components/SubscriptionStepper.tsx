"use client";

import { useEffect, useMemo, useState } from 'react';
import { fetchPlans, createSubscription } from '@/lib/api';
import type { Diet, Family, PlanResponse, Serving } from '@/types';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const diets: Diet[] = ['VEG', 'NON_VEG'];
const families: Family[] = ['SINGLE', 'COUPLE', 'FAMILY'];
const servings: Serving[] = ['REGULAR', 'LARGE'];
const durations = ['WEEKLY', 'MONTHLY'] as const;

function classBtn(active: boolean) {
  return `px-3 py-2 rounded border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'}`;
}

export default function SubscriptionStepper() {
  const { data: session } = useSession();
  const [diet, setDiet] = useState<Diet>('VEG');
  const [family, setFamily] = useState<Family>('SINGLE');
  const [serving, setServing] = useState<Serving>('REGULAR');
  const [duration, setDuration] = useState<'WEEKLY' | 'MONTHLY'>('WEEKLY');
  const [data, setData] = useState<PlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetchPlans({ duration, diet })
      .then((res) => { if (!ignore) setData(res); })
      .catch((e) => { if (!ignore) setError(String(e)); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [duration, diet]);

  const variant = useMemo(() => {
    const v = data?.variants?.find(v => v.family === family && v.serving === serving && v.diet === diet);
    return v || null;
  }, [data, family, serving, diet]);

  const saturdayAddon = variant?.addons?.find(a => a.addonType.key === 'saturday_delivery');
  const sweetAddon = variant?.addons?.find(a => a.addonType.key === 'sweet_dish');
  const riceAddon = variant?.addons?.find(a => a.addonType.key === 'extra_rice');
  const rotisAddon = variant?.addons?.find(a => a.addonType.key === 'extra_rotis');

  const [wantSaturday, setWantSaturday] = useState(false);
  const [sweetPerDay, setSweetPerDay] = useState(0);
  const [extraRice, setExtraRice] = useState(0);
  const [extraRotis, setExtraRotis] = useState(0);
  const [creating, setCreating] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const base = Number(variant?.basePriceCad || 0);
  const addonsTotal =
    (wantSaturday ? Number(saturdayAddon?.priceCad || 0) : 0) +
    (sweetPerDay * Number(sweetAddon?.priceCad || 0)) +
    (extraRice * Number(riceAddon?.priceCad || 0)) +
    (extraRotis * Number(rotisAddon?.priceCad || 0));
  const subtotal = base + addonsTotal;
  const [tax, setTax] = useState<{ taxRate: number; taxCad: number; totalCad: number } | null>(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api') + '/pricing/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subtotalCad: Number(subtotal.toFixed(2)), province: 'ON' })
        });
        if (!res.ok) throw new Error('Failed tax estimate');
        const data = await res.json();
        if (!ignore) setTax(data);
      } catch {
        if (!ignore) setTax(null);
      }
    }
    if (subtotal >= 0) run();
    return () => { ignore = true; };
  }, [subtotal]);

  async function onCreate() {
    if (!variant) return;
    setCreating(true);
    setCreatedId(null);
    try {
      if (!session?.user || !(session.user as any).id) {
        alert('Please sign in to continue');
        setCreating(false);
        return;
      }
      const payload = {
        userId: (session.user as any).id,
        planVariantId: variant.id,
        startDate: new Date().toISOString().slice(0, 10),
        address: { street: '123 Dundas St W', city: 'Mississauga', province: 'ON', postalCode: 'L5B 1M5' },
        addons: [
          ...(wantSaturday && saturdayAddon ? [{ addonTypeId: saturdayAddon.addonTypeId, quantity: 1 }] : []),
          ...(sweetPerDay > 0 && sweetAddon ? [{ addonTypeId: sweetAddon.addonTypeId, quantity: sweetPerDay }] : []),
          ...(extraRice > 0 && riceAddon ? [{ addonTypeId: riceAddon.addonTypeId, quantity: extraRice }] : []),
          ...(extraRotis > 0 && rotisAddon ? [{ addonTypeId: rotisAddon.addonTypeId, quantity: extraRotis }] : []),
        ],
        notes: 'Created from web stepper'
      };
      const res = await createSubscription(payload);
      setCreatedId(res.id);
    } catch (e: any) {
      alert('Failed to create subscription: ' + e?.message);
    } finally {
      setCreating(false);
    }
  }

  const CheckoutModal = useMemo(() => dynamic(() => import('./CheckoutModal'), { ssr: false }), []);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Choose your plan</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Diet</p>
            <div className="flex gap-2 flex-wrap">
              {diets.map(d => (
                <button key={d} className={classBtn(diet === d)} onClick={() => setDiet(d)}>{d === 'VEG' ? 'Vegetarian' : 'Non‑Vegetarian'}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">People</p>
            <div className="flex gap-2 flex-wrap">
              {families.map(f => (
                <button key={f} className={classBtn(family === f)} onClick={() => setFamily(f)}>{f}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Serving size</p>
            <div className="flex gap-2 flex-wrap">
              {servings.map(s => (
                <button key={s} className={classBtn(serving === s)} onClick={() => setServing(s)}>{s === 'REGULAR' ? 'Regular' : 'Large'}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Duration</p>
            <div className="flex gap-2 flex-wrap">
              {durations.map(x => (
                <button key={x} className={classBtn(duration === x)} onClick={() => setDuration(x)}>{x}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add‑ons</h2>
          {loading && <p className="text-gray-500">Loading plan details…</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && variant && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" checked={wantSaturday} onChange={(e) => setWantSaturday(e.target.checked)} />
                  <span>Saturday delivery</span>
                </label>
                <span className="text-sm">+${Number(saturdayAddon?.priceCad || 0).toFixed(2)}/week</span>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <span>Sweet dish (per delivery day)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} className="w-20 border rounded px-2 py-1" value={sweetPerDay} onChange={(e)=> setSweetPerDay(Number(e.target.value)||0)} />
                  <span className="text-sm">x ${Number(sweetAddon?.priceCad || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <span>Extra rice (per meal)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} className="w-20 border rounded px-2 py-1" value={extraRice} onChange={(e)=> setExtraRice(Number(e.target.value)||0)} />
                  <span className="text-sm">x ${Number(riceAddon?.priceCad || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <span>Extra rotis (2) per meal</span>
                </label>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} className="w-20 border rounded px-2 py-1" value={extraRotis} onChange={(e)=> setExtraRotis(Number(e.target.value)||0)} />
                  <span className="text-sm">x ${Number(rotisAddon?.priceCad || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-gray-700">Base price: <strong>${base.toFixed(2)}</strong></p>
          <p className="text-gray-700">Add‑ons: <strong>${addonsTotal.toFixed(2)}</strong></p>
          <p className="text-lg">Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
          <p className="text-gray-700">Estimated HST (ON 13%): <strong>${(tax?.taxCad ?? 0).toFixed(2)}</strong></p>
          <p className="text-lg">Estimated Total: <strong>${(tax?.totalCad ?? subtotal).toFixed(2)}</strong></p>
        </div>
        <div className="flex items-center gap-2">
          <button disabled={!variant || creating} onClick={onCreate} className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50">{creating ? 'Creating…' : 'Create Subscription (no payment)'}</button>
          <button disabled={!variant} onClick={async ()=>{
            if (!session?.user || !(session.user as any).id) { alert('Please sign in to continue'); return; }
            // request payment intent from server based on chosen plan + add-ons
            const addons = [
              ...(wantSaturday && saturdayAddon ? [{ addonTypeId: saturdayAddon.addonTypeId, quantity: 1 }] : []),
              ...(sweetPerDay > 0 && sweetAddon ? [{ addonTypeId: sweetAddon.addonTypeId, quantity: sweetPerDay }] : []),
              ...(extraRice > 0 && riceAddon ? [{ addonTypeId: riceAddon.addonTypeId, quantity: extraRice }] : []),
              ...(extraRotis > 0 && rotisAddon ? [{ addonTypeId: rotisAddon.addonTypeId, quantity: extraRotis }] : []),
            ];
            // Call web proxy to attach Authorization automatically
            const res = await fetch('/api/proxy/payments/intent', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ planVariantId: variant!.id, addons, province: 'ON' })
            });
            if (!res.ok) { alert('Failed to create payment intent'); return; }
            const data = await res.json();
            setClientSecret(data.clientSecret);
            setShowPayment(true);
          }} className="px-4 py-2 rounded bg-purple-600 text-white disabled:opacity-50">Checkout and Create</button>
          {createdId && <span className="text-green-700">Created #{createdId}</span>}
        </div>
      </div>

      <CheckoutModal
        open={showPayment}
        clientSecret={clientSecret}
        onClose={()=> setShowPayment(false)}
        payload={{
          userId: (session?.user as any)?.id,
          planVariantId: variant?.id,
          startDate: new Date().toISOString().slice(0,10),
          address: { street: '123 Dundas St W', city: 'Mississauga', province: 'ON', postalCode: 'L5B 1M5' },
          addons: [
            ...(wantSaturday && saturdayAddon ? [{ addonTypeId: saturdayAddon.addonTypeId, quantity: 1 }] : []),
            ...(sweetPerDay > 0 && sweetAddon ? [{ addonTypeId: sweetAddon.addonTypeId, quantity: sweetPerDay }] : []),
            ...(extraRice > 0 && riceAddon ? [{ addonTypeId: riceAddon.addonTypeId, quantity: extraRice }] : []),
            ...(extraRotis > 0 && rotisAddon ? [{ addonTypeId: rotisAddon.addonTypeId, quantity: extraRotis }] : []),
          ],
          notes: 'Created via checkout'
        }}
        onSuccess={(id)=> setCreatedId(id)}
      />

      <div className="bg-gray-50 rounded p-4 text-sm text-gray-700">
        <p className="font-medium mb-2">What you get</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Regular: 5 rotis or 200g rice + ~24 oz mains + raita 4 oz</li>
          <li>Large: 7 rotis or 300g rice + ~32 oz mains + raita 4 oz</li>
          <li>Raita is included in every meal</li>
          <li>Veg and Non‑Veg rotation calendars published weekly</li>
        </ul>
      </div>
    </div>
  );
}
