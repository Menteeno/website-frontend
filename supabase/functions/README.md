# Zibal course payments — deploy notes

## 1. Apply migration

```bash
supabase db push
# or run supabase/migrations/20260803120000_payment_orders.sql in the SQL editor
```

## 2. Set function secrets

```bash
supabase secrets set ZIBAL_MERCHANT=zibal SITE_URL=https://menteeno.ir
```

- Sandbox merchant: `zibal`
- `SITE_URL` is where users land after payment (`/panel/payment/result`)
- For local UI testing against deployed functions, set `SITE_URL` to your local origin if needed

## 3. Deploy Edge Functions

```bash
supabase functions deploy create-payment
supabase functions deploy zibal-callback
```

`zibal-callback` must allow unauthenticated requests (`verify_jwt = false` in
`supabase/functions/zibal-callback/config.toml`) because Zibal redirects the
browser without a user JWT.

## 4. Test flow

1. Sign in on `/panel`
2. Open a paid course → **Buy course**
3. Complete sandbox payment on Zibal
4. Confirm enrollment on `/panel/account` and the order on `/panel/account/payments`
