# wrangler-playground

Cloudflare Workers と周辺リソースの扱いを把握したい。

## 各リソースとバインディング

Workers はパブリックアクセス可能。KV や D1 といった周辺リソースは不可能。多分。\
周辺リソースはプライベートネットワークにあり、Workers を通して使うと考えればいいんじゃないかな。多分。\
Workers と周辺リソースを繋ぎ込むのがバインディングという仕組み。\
バインドすると、Workers から専用のインターフェースを利用して周辺リソースへアクセスできるようになる。

ちなみに Workers と Workers の繋ぎ込みも可能なよう。一部処理をオフロードしたり出来る。

## 起動オプションとリソースの対応

### wrangler dev --remote

Cloudflare 上のプレビュー用リソースが使われる。\
プレビュー用リソースは wrangler コマンドに --preview オプションをつけて作成する。

### wrangler dev

ローカルのリソースが使われる。\
ローカルのリソースは wrangler コマンドに --local オプションをつけて作成する。

### コマンド例

```sh
# kv はworkers名？が自動で付加されるよう
pnpm wrangler kv:namespace create kv
pnpm wrangler kv:namespace create kv --preview
pnpm wrangler kv:key put "key" "value" --binding=MY_KV --preview --local

# d1 はworkers名？が付加されない
pnpm wrangler d1 create wrangler-playground-d1
pnpm wrangler d1 create wrangler-playground-d1_preview
pnpm wrangler d1 execute MY_D1 --file=./init.sql
pnpm wrangler d1 execute MY_D1 --file=./init.sql --preview
pnpm wrangler d1 execute MY_D1 --file=./init.sql --local
```

## 環境変数

公開情報と秘匿情報に分けて考えるよう。

### 公開情報

暗号化されない。\
デプロイ時に本番へ設定される。\
wrangler.toml の vars に設定する。

### 秘匿情報

暗号化される。\
デプロイ時に本番へ設定されない。\
`pnpm wrangler secret put <KEY>` で本番環境へ設定する。\
ローカルでは .dev.vars を使う
