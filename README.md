# Telegram bot template (Cloudflare Workers)

## 1) Install Wrangler

```bash
npm init -y
npm i -D wrangler
```

## 2) Login to Cloudflare

```bash
npx wrangler login
```

## 3) Set bot token

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
```

## 4) Run locally

```bash
npx wrangler dev
```

## 5) Deploy

```bash
npx wrangler deploy
```

## 5.1) Daily reminder cron

The worker has a Cron Trigger configured for `30 5 * * *`, which is `08:30 MSK` every day.

Daily topic reminders are configured in `reminders/daily_topic_reminders.js`.

After deploy, copy Worker URL, for example:
`https://p2pbot.<your-subdomain>.workers.dev`

## 6) Set Telegram webhook

Replace `<TOKEN>` and `<WORKER_URL>`:

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"<WORKER_URL>"}'
```

Now when user sends `/start`, bot responds:
`Привет я бот`
